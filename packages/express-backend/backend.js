// backend.js
import express, { request } from "express";
import cors from "cors";
import User from "./user.js";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function CreateUserID() {
  return Math.random().toString(36).substring(2, 8);
}

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices
    .findUserById(id)

    .then((user) => {
      if (!user) return res.status(404).send({ error: "Resource not found." });
      res.send(user);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((newUser) => res.status(201).send(newUser));
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  userServices
    .deleteUserById(userId)
    .then((deleteUser) => {
      if (!deleteUser) return res.status(404).send({ error: "User not found" });
      res.status(204).send();
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});
