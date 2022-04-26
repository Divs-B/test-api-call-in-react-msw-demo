import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://ghibliapi.herokuapp.com/films")
      .then((response) => {
        const { data } = response;
        setFilms(data);
      })
      .catch((error) => {
        if (JSON.stringify(error.message).includes("500")) {
          error = "Oops… something went wrong, try again 🤕";
        } else if (JSON.stringify(error.message).includes("418")) {
          error = "418:I'm a tea pot 🫖, silly";
        }
        setError(error);
      });
  }, []);

  return (
    <div data-testid="App" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <p data-testid="filmErrorId">{JSON.stringify(error)}</p>}
        {films &&
          films.map((film) => (
            <p data-testid="filmDataId">{JSON.stringify(film.title)}</p>
          ))}
      </header>
    </div>
  );
}

export default App;
