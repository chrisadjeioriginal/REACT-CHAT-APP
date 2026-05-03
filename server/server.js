import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";

async function checkIfUserExists(username) {
  const AllUsersData = await fs.readFile("../database.txt", "utf-8");

  AllUsersData = AllUsersData.split("\n");

  for (const user of AllUsersData) {
    const uniueUser = user.split(" ")[0];

    if (uniueUser === username.toLowerCase().trim()) {
      return true;
    }
  }
  return false;
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
  //   console.log(`client with id ${client.id} has connected`);

  // Remember to authenticate users before adding them to a room
  client.on("join-room", (data) => {
    client.join(`${data.username}`);
    console.log(`client has been added to room ${data.username}`);
  });

  //   client.on("message", (msg) => {
  //     console.log(`client sent the message: ${msg}`);
  //     client.emit("message", msg);
  //   });

  //   client.on("visit-branch", (data) => {
  //     if (checkIfUserExists(data.username)) {
  //       client.join(data.username);
  //     } else {
  //       console.log("user does not exist");
  //     }
  //   });

  client.on("message", (data) => {
    io.to(data.username).emit("message", data);
  });
});

app.get("/Online", (req, res) => {
  if (!sessions[req.cookies.Id]) {
    res.json({ success: false, message: "User needs to log in!" });
  } else {
    // console.log("successful authentication");
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
            maxAge: 100000,
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
  //   console.log("someone visited");
  const username = req.body.username;
  const password = req.body.password;

  //   console.log(`username is ${username}`);

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

server.listen(3000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
