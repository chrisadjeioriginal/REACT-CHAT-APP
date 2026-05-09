import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";

async function checkIfUserExists(username) {
  try {
    let AllUsersData = await fs.readFile("../database.txt", "utf-8");

    AllUsersData = AllUsersData.split("\n");

    console.log("these are all the users", AllUsersData);

    for (const userData of AllUsersData) {
      const user = userData.split(" ")[0];

      if (user.toLowerCase().trim() === username.toLowerCase().trim()) {
        console.log(`yes the friend with username :${username} exists`);
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

const sessions = {};

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
  cors({
    origin: [
      "https://playmaker-sushi-divinely.ngrok-free.dev",
      "http://localhost:5173",
      "https://react-chat-f52wlaojx-chris-adjei-s-projects.vercel.app",
    ],
    credentials: true,
  }),
); // when using ngrok, use this

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

const io = new Server(server, {
  cors: {
    origin: [
      "https://playmaker-sushi-divinely.ngrok-free.dev",
      "http://localhost:5173",
      "https://react-chat-f52wlaojx-chris-adjei-s-projects.vercel.app",
    ],
    credentials: true,
  },
});

io.on("connection", (client) => {
  client.on("join-room", (data) => {
    client.join(`${data.username}`);
    // console.log(`client has been added to room ${data.username}`);
  });

  client.on("message", async (msg) => {
    // const myCookie = client.request.headers.cookie.split("=")[1];

    // msg.sender = sessions[myCookie];
    try {
      //   console.log(`${msg.sender} sent a message to ${msg.recipient}`);
      const path = "../messages.txt";
      await fs.appendFile(path, JSON.stringify(msg) + "\n");

      io.to(msg.sender).emit("message", msg);
      io.to(msg.recipient).emit("message", msg);
    } catch (error) {
      console.log("MESSAGE COULD NOT BE SAVED");
    }
  });
});

app.get("/api/Online", (req, res) => {
  if (!sessions[req.cookies.Id]) {
    res.json({ success: false, message: "User needs to log in!" });
  } else {
    res.json({
      success: true,
      message: "User logged in successfully!",
      userId: sessions[req.cookies.Id], //SEND THE USERNAME SO THAT IT CAN BE DISLAYED
    });
  }
});

app.post("/api/Login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const path = "../database.txt";

    const result = await fs.readFile(path, "utf-8");

    if (!result) {
      res.json({ success: false, message: "User does not exist" });
    } else {
      const allUsers = result.split("\n");

      for (const user of allUsers) {
        const u = user.split(" ");
        if (
          u[0].toLocaleLowerCase() == username.toLocaleLowerCase().trim() &&
          u[1] == password
        ) {
          const uniqueId = randomUUID();

          sessions[uniqueId] = username;
          res.cookie("Id", uniqueId, {
            httpOnly: true,

            maxAge: 1000000,
            secure: false,
            sameSite: "lax",
          });

          return res.json({
            success: true,
            message: "Login successful",
            userId: username,
          });
        }
      }

      return res.json({ success: false, message: "Login failed" });
    }
  } catch (error) {
    return res.status(500).send("SERVER ERROR!!");
  }
});

app.post("/api/Register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const path = "../database.txt";

  try {
    const result = await fs.readFile(path, "utf-8");

    if (!result) {
      try {
        const new_directory = `../conversations/${username}`;
        await fs.mkdir(new_directory);
        await fs.writeFile(
          `../conversations/${username}/conversations.txt`,
          "",
        );
        await fs.writeFile(
          `../conversations/${username}/LastInteraction.txt`,
          "",
        );

        await fs.writeFile(path, username + " " + password);
        return res.json({ success: true, message: "Registration successful" });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: "Unable to register user" });
      }
    } else {
      console.log("CHECKING THIS NEIGHBOURHOOD OUT ");
      const allUsers = result.split("\n");

      for (const user of allUsers) {
        const u = user.split(" ");

        if (u[0].toLowerCase() === username.toLowerCase().trim()) {
          return res.json({ message: "USER ALREADY EXISTS" });
        }
      }

      try {
        await fs.mkdir(`../conversations/${username}`);
        await fs.writeFile(
          `../conversations/${username}/conversations.txt`,
          "",
        );
        await fs.writeFile(
          `../conversations/${username}/LastInteraction.txt`,
          "",
        );
        await fs.appendFile(path, "\n" + username + " " + password);
        return res.json({ success: true, message: "Registration successful" });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: "Unable to register user" });
      }
    }
  } catch (error) {
    return res.status(500).send("SERVER ERROR!!");
  }
});

async function IsFriend(friendName, myName) {
  const path = `../conversations/${myName}/conversations.txt`;

  if (friendName === myName) {
    console.log("cannot befriend yourself");
    return "IS SELF";
  }

  try {
    let myConvos = await fs.readFile(path, "utf-8");

    myConvos = myConvos.split("\n").filter((line) => line.trim() !== "");

    // console.log("these are my convos", myConvos);

    for (const convo of myConvos) {
      const conv = JSON.parse(convo);

      if (conv.friend === friendName) {
        return true;
      }
    }
    console.log("CHECKIN OUT THE AREa");
    return false;
  } catch (err) {
    console.log("REAL ERROR:", err);
    return true;
  }
}

app.post("/api/Users", async (req, res) => {
  //   console.log("someone came here");

  //   console.log(`user is looking for friend with name ${username}`);

  try {
    const friendName = req.body.friendName;
    const myName = req.body.myName;
    // console.log("my name is ", myName);

    const path = `../conversations/${myName}/conversations.txt`;
    const userIsMyFriend = await IsFriend(friendName, myName);

    // console.log(
    //   `the check for if they person was my friend returned ${userIsMyFriend}`,
    // );

    const userExists = await checkIfUserExists(friendName);

    // console.log(`the check for if they person exists returned ${userExists}`);

    if (userExists === true && userIsMyFriend === false) {
      const newEntry = {
        participants: [myName, friendName].sort(),
        convoId: req.body.convoId ? req.body.convoId : randomUUID(),
        friend: friendName,
      };

      await fs.appendFile(path, JSON.stringify(newEntry) + "\n");

      return res.json({
        success: true,
        friendName: friendName,
        message: "new friend added",
        convoId: newEntry.convoId,
      });
    } else {
      return res.json({ success: false, message: "user not found!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while checking for user" });
  }
});

app.post("/api/Friends", async (req, res) => {
  const myName = req.body.myName;

  const path = `../conversations/${myName}/conversations.txt`;
  let myFriends = await fs.readFile(path, "utf-8");

  myFriends = myFriends.split("\n").filter((line) => line.trim() !== "");

  myFriends = myFriends
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));

  return res.json({ friendsInfo: myFriends });
});

app.get("/api/Messages", async (req, res) => {
  let allMessages = await fs.readFile("../messages.txt", "utf-8");

  allMessages = allMessages.split("\n").filter((line) => line.trim() !== "");

  allMessages = allMessages
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));

  return res.json({ allMessages: allMessages });
});

server.listen(3000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
