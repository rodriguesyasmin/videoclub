import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Star from "../Rating/Rating";
import { AppContext } from "../App/App";
import Modal from "react-modal";
import "./Film.css";
import SoumettreCommentaire from "../Note/Note";
Modal.setAppElement("#root");

function Film() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [moyenneRating, setMoyenneRating] = useState("Pas encore noté");
  const [isEditing, setIsEditing] = useState(false);
  const [editedFilm, setEditedFilm] = useState({
    titre: "",
    realisation: "",
    annee: "",
    description: "",
  });

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
        setEditedFilm({
          titre: data.titre,
          realisation: data.realisation,
          annee: data.annee,
          description: data.description,
        });
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
    if (window.confirm("Voulez-vous vraiment supprimer ce film ?")) {
      const token = localStorage.getItem("api-token");
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedFilm((prevData) => ({ ...prevData, [name]: value }));
  };

  async function EditFilm(e) {
    e.preventDefault();
    const token = localStorage.getItem("api-token");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedFilm),
    };

    try {
      const response = await fetch(urlFilm, options);
      if (!response.ok) {
        throw new Error(`Error ${response.statusText}`);
      }
      const updatedFilm = await response.json();
      setFilm(updatedFilm);
      setIsEditing(false);
      navigate(`/films/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

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
                {isLogged && (
                  <button onClick={deleteFilm} className="delete-button">
                    Supprimer le film
                  </button>
                )}
                {isLogged && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-button"
                  >
                    Modifier le film
                  </button>
                )}
                <Modal
                  isOpen={isEditing}
                  onRequestClose={() => setIsEditing(false)}
                  contentLabel="Modifier film"
                >
                  <div className="edit-form">
                    <img
                      className="film-img"
                      src={`/img/${film.titreVignette}`}
                      alt={film.titre}
                    />
                    <form onSubmit={EditFilm}>
                      <label>
                        Titre:
                        <input
                          type="text"
                          name="titre"
                          value={editedFilm.titre}
                          onChange={handleEditChange}
                        />
                      </label>
                      <label>
                        Réalisateur:
                        <input
                          type="text"
                          name="realisation"
                          value={editedFilm.realisation}
                          onChange={handleEditChange}
                        />
                      </label>
                      <label>
                        Année:
                        <input
                          type="text"
                          name="annee"
                          value={editedFilm.annee}
                          onChange={handleEditChange}
                        />
                      </label>
                      <label>
                        Description:
                        <textarea
                          name="description"
                          value={editedFilm.description}
                          onChange={handleEditChange}
                        />
                      </label>
                      <button type="submit">Mettre à jour</button>
                      <button type="button" onClick={() => setIsEditing(false)}>
                        Annuler
                      </button>
                    </form>
                  </div>
                </Modal>
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
