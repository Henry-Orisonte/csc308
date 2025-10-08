// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          setCharacters((currentCharacters) =>
            currentCharacters.filter((character) => character.id !== id)
          );
        } else if (response.status === 404) {
          console.log("User ID was not found");
        }
      })
      .catch((error) => console.error(error));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((response) => {
    if (response.status === 201) {
      return response.json(); // <- get the user with the new ID
    } else {
      throw new Error("Failed to create user");
    }
  });
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters((currentCharacters) => [...currentCharacters, newUser]))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
