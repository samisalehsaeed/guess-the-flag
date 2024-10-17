import { useEffect, useState } from "react";
import "../css/Home.css";

export default function RandomCountryFlag() {
  const [flag, setFlag] = useState(null);
  const [country, setCountry] = useState("");
  const [points, setPoints] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchNewCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const randomCountry = data[Math.floor(Math.random() * data.length)];
        setFlag(randomCountry.flags.svg);
        setCountry(randomCountry.name.common);
      });
  };

  useEffect(() => {
    fetchNewCountry();
  }, []);

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === country.toLowerCase()) {
      setFeedback("Correct!");
      setPoints(points + 1);
    } else {
      setFeedback(`Unlucky, The correct answer was ${country}.`);
    }
    setGuess("");
    fetchNewCountry();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  return (
    <>
      <div className="flag">
        {flag ? (
          <img className="shuffle" src={flag} alt="Country Flag" width="300" />
        ) : (
          <p>Loading...</p>
        )}
        <br />
        <input
          className="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Guess the country!"
        />
        <h1 className="feedback">{feedback}</h1>
        <h1 className="points">Points: {points}</h1>
      </div>
    </>
  );
}
