import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import { connect } from "http2";
import { json } from "stream/consumers";

async function checkIfUserExists(username) {
  try {
    let AllUsersData = await fs.readFile("../database.txt", "utf-8");

    AllUsersData = AllUsersData.split("\n");

    for (const user of AllUsersData) {
      const uniueUser = user.split(" ")[0];

      if (uniueUser.toLowerCase() === username.toLowerCase().trim()) {
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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (client) => {
  client.on("join-room", (data) => {
    client.join(`${data.username}`);
    // console.log(`client has been added to room ${data.username}`);
  });

  client.on("message", (msg) => {
    const myCookie = client.request.headers.cookie.split("=")[1];

    msg.sender = sessions[myCookie];

    io.emit("message", msg);
  });
});

app.get("/Online", (req, res) => {
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

app.post("/Login", async (req, res) => {
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
            secure: true,
            maxAge: 1000000,
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

app.post("/Register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const path = "../database.txt";

    const result = await fs.readFile(path, "utf-8");

    if (!result) {
      try {
        await fs.writeFile(path, username + " " + password);
        res.json({ success: true });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, message: "Unable to register user" });
      }
    } else {
      const allUsers = result.split("\n");

      for (const user of allUsers) {
        const u = user.split(" ");

        if (u[0].toLowerCase() === username.toLowerCase().trim()) {
          return res.json({ message: "USER ALREADY EXISTS" });
        }
      }

      try {
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

async function IsFriend(username, myName) {
  const path = "../conversations.txt";

  if (username === myName) {
    console.log("cannot befriend yourself");
    return true;
  }

  try {
    let myConvos = await fs.readFile(path, "utf-8");

    myConvos = myConvos.split("\n").filter((line) => line.trim() !== "");

    // console.log("these are my convos", myConvos);

    for (const convo of myConvos) {
      const conv = JSON.parse(convo);

      if (
        conv.participants.includes(username) &&
        conv.participants.includes(myName)
      ) {
        return true;
      }
    }

    const newEntry = {
      participants: [myName, username].sort(),
      convoId: randomUUID(),
      friend: username,
    };

    await fs.appendFile(path, JSON.stringify(newEntry) + "\n");

    return false;
  } catch (err) {
    console.log("REAL ERROR:", err);
    return true;
  }
}

app.post("/Users", async (req, res) => {
  //   console.log("someone came here");
  const username = req.body.username;
  //   console.log(`user is looking for friend with name ${username}`);

  try {
    const myName = sessions[req.cookies.Id];
    // console.log("my name is ", myName);
    const result = await IsFriend(username, myName);
    if ((await checkIfUserExists(username)) && result === false) {
      //   console.log("found them!!!");
      return res.json({
        success: true,
        username: username,
        message: "new friend added",
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

app.get("/Friends", async (req, res) => {
  let myFriends = await fs.readFile("../conversations.txt", "utf-8");

  myFriends = myFriends.split("\n").filter((line) => line.trim() !== "");
  //   console.log("my friends data ", myFriends);

  myFriends = myFriends
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));

  return res.json({ friendsInfo: myFriends });
});

server.listen(3000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
