import { io } from "socket.io-client";

const client = io("http://localhost:3000");

client.on("connect", () => {
  console.log("I have connected");

  client.emit("message", { content: "My name is Chris" });
});
