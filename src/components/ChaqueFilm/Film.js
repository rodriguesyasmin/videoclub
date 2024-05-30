import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Star from "../Rating/Rating";
import App, { AppContext } from "../App/App";
import "./Film.css";
import SoumettreCommentaire from "../Note/Note";
function Film() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [commentaireInput, setCommentaire] = useState("");

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
  const handleCommentSubmitted = (nouveaucommentaires) => {
    setFilm((prevData) => ({ ...prevData, commentaire: nouveaucommentaires }));
  };

  return (
    <div>
      <h1>{film ? film.titre : "Données pas trouvées"}</h1>
      {film && (
        <>
          <img src={`/img/${film.titreVignette}`} alt={film.titre} />
          <p>Réalisateur: {film.realisateur}</p>
          <p>Année: {film.annee}</p>
          <p>Description: {film.description}</p>
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
          <p>Notes: {film.notes ? film.notes.join(", ") : "Pas encore noté"}</p>
          {film.commentaire && film.commentaire.length > 0 ? (
            <ul>
              {film.commentaire.map((comment, index) => (
                <li key={index}>{comment.commentaire}</li>
              ))}
            </ul>
          ) : (
            "Pas encore des commentaires"
          )}

          {context.isLogged && (
            <SoumettreCommentaire
              filmId={id}
              commentaires={film.commentaire}
              onCommentSubmitted={handleCommentSubmitted}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Film;
