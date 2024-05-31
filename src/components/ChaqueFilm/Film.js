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
  const [MoyenneRating, setMoyenneRating] = useState("Pas encore noté");

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
        if (data.notes && data.notes.length > 0) {
          const totalNotes = data.notes.reduce(
            (total, note) => total + note,
            0
          );
          const moyenne = totalNotes / data.notes.length;
          setMoyenneRating(moyenne);
        }
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
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([putNoteResponse, getFilmResponse]) => {
        setFilm((prevData) => ({ ...prevData, notes: getFilmResponse.notes }));
        if (getFilmResponse.notes && getFilmResponse.notes.length > 0) {
          const totalNotes = getFilmResponse.notes.reduce(
            (total, note) => total + note,
            0
          );
          const average = totalNotes / getFilmResponse.notes.length;
          setMoyenneRating(average);
        } else {
          setMoyenneRating("Pas encore noté");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCommentSubmitted = (nouveaucommentaires) => {
    setFilm((prevData) => ({ ...prevData, commentaire: nouveaucommentaires }));
  };

  return (
    <div className="film-container">
      <div className="film-header">
        <h1>{film ? film.titre : "Données pas trouvées"}</h1>
      </div>
      {film && (
        <>
          <img
            className="film-img"
            src={`/img/${film.titreVignette}`}
            alt={film.titre}
          />
          <div className="film-details">
            <p>Réalisateur: {film.realisation}</p>
            <p>Année: {film.annee}</p>
            <p>Description: {film.description}</p>
          </div>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                filled={value <= userRating}
                onClick={() => setUserRating(value)}
                className="star"
              />
            ))}
            <p>
              (Moyenne:{" "}
              {typeof MoyenneRating === "number"
                ? MoyenneRating.toFixed(1)
                : MoyenneRating}
              )
            </p>
          </div>
          <button className="submit-rating-button" onClick={submitRating}>
            Noter
          </button>
          <div className="film-notes"></div>
          <div className="film-comments">
            <h2>Commentaires:</h2>
            {film.commentaire &&
            Array.isArray(film.commentaire) &&
            film.commentaire.length > 0 ? (
              <ul className="comment-list">
                {film.commentaire.map((comment, index) => (
                  <li key={index}>{comment.commentaire}</li>
                ))}
              </ul>
            ) : (
              <p>Pas encore des commentaires</p>
            )}
          </div>

          {context.isLogged && (
            <div className="submit-comment">
              <SoumettreCommentaire
                filmId={id}
                commentaires={film.commentaire}
                onCommentSubmitted={handleCommentSubmitted}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Film;
