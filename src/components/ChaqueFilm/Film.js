import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Star from "../Rating/Rating";
import { AppContext } from "../App/App";
import "./Film.css";
import SoumettreCommentaire from "../Note/Note";

function Film() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [moyenneRating, setMoyenneRating] = useState("Pas encore noté");

  const { isLogged } = useContext(AppContext);
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
  }, [id, urlFilm]);

  async function submitRating(newRating) {
    const updatedNotes = film.notes ? [...film.notes, newRating] : [newRating];

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: updatedNotes }),
    };

    try {
      await fetch(urlFilm, options);
      const response = await fetch(urlFilm);
      const updatedFilm = await response.json();

      setFilm(updatedFilm);

      if (updatedFilm.notes && updatedFilm.notes.length > 0) {
        const totalNotes = updatedFilm.notes.reduce(
          (total, note) => total + note,
          0
        );
        const moyenne = totalNotes / updatedFilm.notes.length;
        setMoyenneRating(moyenne);
      } else {
        setMoyenneRating("Pas encore noté");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFilm() {
    if (window.confirm("Voulez-vous  supprimer ce film ?")) {
      const token = localStorage.getItem("api-film-token");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(urlFilm, options);
        if (!response.ok) {
          throw new Error(`Error ${response.statusText}`);
        }
        navigate("/films");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleCommentSubmitted = (nouveauCommentaires) => {
    setFilm((prevData) => ({ ...prevData, commentaire: nouveauCommentaires }));
  };

  return (
    <div className="wrapper">
      <div className="film-container">
        {film ? (
          <>
            <div className="img-notes">
              <img
                className="film-img"
                src={`/img/${film.titreVignette}`}
                alt={film.titre}
              />
              <div className="rating-and-comment-container">
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      filled={value <= userRating}
                      onClick={() => {
                        setUserRating(value);
                        submitRating(value);
                      }}
                      className="star"
                    />
                  ))}

                  <p>
                    (Moyenne:{" "}
                    {typeof moyenneRating === "number"
                      ? moyenneRating.toFixed(1)
                      : moyenneRating}
                    )
                  </p>
                </div>
                <p>Total de votes: {film.notes ? film.notes.length : 0}</p>
                {isLogged && (
                  <div className="submit-comment">
                    <SoumettreCommentaire
                      filmId={id}
                      commentaires={film.commentaire}
                      onCommentSubmitted={handleCommentSubmitted}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="film-details">
              <div className="film-header">
                <h1>{film.titre}</h1>
              </div>
              <p>
                <strong>Réalisateur: </strong>
                {film.realisation}
              </p>
              <p>
                <strong>Année: </strong>
                {film.annee}
              </p>
              <p>
                <strong>Description: </strong>
                {film.description}
              </p>

              <div className="film-comments">
                {isLogged && (
                  <button onClick={deleteFilm} className="delete-button">
                    Supprimer film
                  </button>
                )}
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
                  <p>
                    Pas encore des commentaires, veuillez se connecter pour
                    faire un commentaire{" "}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="film-header">
            <h1>Données pas trouvées</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Film;
