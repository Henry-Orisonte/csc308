// backend.js
import express, { request } from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function CreateUserID() {
  return Math.random().toString(36).substring(2, 8);
}

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const DeleteUser = (userId) => {
  const userPosition = users["users_list"].findIndex((user) => user.id === userId);
  if (userPosition !== -1) {
    users["users_list"].splice(userPosition, 1); 
    return true;
  }
  return false;

}

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = DeleteUser(userId);
   if (deleted) {
    res.status(204).send(); 
  } else {
    res.status(404).send({ error: "User not found" }); 
  }

});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = CreateUserID()
  addUser(userToAdd);
  
  res.status(201).send(userToAdd);
});



const findUserByNameandJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    let result = findUserByNameandJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    // No filters send -> return every user
    res.send(users);
  }
});
