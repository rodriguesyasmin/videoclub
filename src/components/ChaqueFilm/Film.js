import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Film() {
  const { id } = useParams();
  const [film, setfilm] = useState(null);
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
        setfilm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!film) {
    return <div>donnés pas trouvés</div>;
  }

  return (
    <div>
      <h1>{film.titre}</h1>
      <img src={`/img/${film.titreVignette}`} alt={film.titre} />
      <p>Réealisateur: {film.realisateur}</p>
      <p>Année: {film.annee}</p>
      <p>Description: {film.description}</p>
    </div>
  );
}

export default Film;
