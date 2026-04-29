import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

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
      console.log("this is everyone");
      console.log(allUsers);
      for (const user of allUsers) {
        const u = user.split(" ");
        if (
          u[0].toLocaleLowerCase() == username.toLocaleLowerCase().trim() &&
          u[1] == password
        ) {
          return res.json({ success: true, message: "Login successful" });
        }
      }

      return res.json({ success: false, message: "Login failed" });
    }
  } catch (error) {
    return res.status(500).send("SERVER ERROR!!");
  }
});

app.post("/Register", async (req, res) => {
  console.log("someone visited");
  const username = req.body.username;
  const password = req.body.password;

  console.log(`username is ${username}`);

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
      console.log("this is everyone");
      console.log(allUsers);
      for (const user of allUsers) {
        const u = user.split(" ");
        if (u[0].toLocaleLowerCase() == username.toLocaleLowerCase().trim()) {
          return res.send("USER ALREADY EXISTS");
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

app.listen(3000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
