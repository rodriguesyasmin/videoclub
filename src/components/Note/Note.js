import React, { useState, useContext } from "react";
import { AppContext } from "../App/App";

function SoumettreCommentaire({ filmId, commentaires, onCommentSubmitted }) {
  const context = useContext(AppContext);
  const [commentaireInput, setCommentaire] = useState("");

  const urlFilm = `https://four1f-tp1-rodriguesyasmin.onrender.com/api/films/${filmId}`;

  async function soumettreCommentaire(e) {
    e.preventDefault();
    let aCommentaires = commentaires || [];
    if (!commentaires) {
      aCommentaires = [
        {
          commentaire: commentaireInput,
          auteur: context.usager,
        },
      ];
    } else {
      aCommentaires = [
        ...commentaires,
        {
          commentaire: commentaireInput,
          auteur: context.usager,
        },
      ];
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaire: aCommentaires }),
    };

    let putCommentaire = await fetch(urlFilm, oOptions);
    let getFilm = await fetch(urlFilm);

    Promise.all([putCommentaire, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        console.log(data);
        onCommentSubmitted(data.commentaire);
        setCommentaire("");
      });
  }

  return (
    <form onSubmit={soumettreCommentaire}>
      <textarea
        name="commentaire"
        placeholder="Ajouter un commentaire"
        value={commentaireInput}
        onChange={(e) => setCommentaire(e.target.value)}
      ></textarea>
      <button>Soumettre</button>
    </form>
  );
}

export default SoumettreCommentaire;
