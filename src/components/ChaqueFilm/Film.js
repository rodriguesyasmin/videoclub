import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Star from "../Rating/Rating";

function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const urlFilm = `https://four1f-tp1-rodriguesyasmin.onrender.com/api/films/${id}`;

  useEffect(() => {
    fetch(urlFilm)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  async function submitRating() {
    let ratings;
    if (!film.notes) {
      ratings = [userRating];
    } else {
      ratings = [...film.notes, userRating];
    }
    const options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: ratings }),
    };

    let putNote = await fetch(urlFilm, options),
      getFilm = await fetch(urlFilm);
    Promise.all([putNote, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        setFilm((prevData) => ({ ...prevData, notes: data.notes }));
        console.log(data.notes);
      });
  }

  
  return (
    <div>
      <h1>{film ? film.titre : "Donnés pas trouvés"}</h1>
      {film && (
        <>
          <img src={`/img/${film.titreVignette}`} alt={film.titre} />
          <p>Réalisateur: {film.realisateur}</p>
          <p>Année: {film.annee}</p>
          <p>Description: {film.description}</p>
          <p>Notes: {film.notes ? film.notes.join(", ") : "Pas encore noté"}</p>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                filled={value <= userRating}
                onClick={() => setUserRating(value)}
              />
            ))}
          </div>
          <button onClick={submitRating}>Noter</button>
        </>
      )}
    </div>
  );
}

export default Film;
