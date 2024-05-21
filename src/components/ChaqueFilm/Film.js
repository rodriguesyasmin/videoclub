import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Star from "../Rating/Rating";
import App, { AppContext } from "../App/App";

function Film() {
  const context = useContext(AppContext);
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
  async function submitComment(e) {
    e.preventDefault();
    const commentaire = e.target.elements.commentaire.value;

    const comment = {
      commentaire: commentaire,
      auteur: context.usager,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    };

    const putCommentaire = await fetch(urlFilm, options);
    const getFilm = await fetch(urlFilm);

    const [putResponse, getResponse] = await Promise.all([
      putCommentaire,
      getFilm,
    ]);
    const [putData, getData] = await Promise.all([
      putResponse.json(),
      getResponse.json(),
    ]);

    const updatedCommentaire = getData.commentaire;
    setFilm((prevData) => ({ ...prevData, commentaire: updatedCommentaire }));
    console.log(updatedCommentaire);
  }

  async function soumettreCommentaire(e) {
    e.preventDefault();
    let aCommentaires = film.commentaire || [];
    if (!film.commentaire) {
      aCommentaires = [
        {
          commentaire: "je suis un commentaire que vous aurez a dynamiser",
          auteur: context.usager,
        },
      ];
    } else {
      aCommentaires = film.commentaire;
      aCommentaires.push({
        commentaire: "jblablabla",
        auteur: context.usager,
      });
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaire: aCommentaires }),
    };

    let putCommantaire = await fetch(urlFilm, oOptions);
    let getFilm = await fetch(urlFilm);

    Promise.all([putCommantaire, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        console.log(data);
        setFilm((prevData) => ({ ...prevData, commentaire: data.commentaire }));
      });
  }

  let blockAjoutCommentaire;
  if (context.estLog) {
    blockAjoutCommentaire = (
      <form onSubmit={soumettreCommentaire}>
        <textarea
          name="commentaire"
          placeholder="Ajouter un commentaire"
        ></textarea>
        <button>Soumettre</button>
      </form>
    );
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
          {blockAjoutCommentaire}
        </>
      )}
    </div>
  );
}

export default Film;
