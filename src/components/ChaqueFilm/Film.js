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
  async function soumettreNote() {
    let aNotes;
    if (!film.notes) {
      aNotes = [1];
    } else {
      aNotes = film.notes;
      aNotes.push(1);
    }
    const oOptions = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: aNotes }),
    };

    let putNote = await fetch(urlFilm, oOptions),
      getFilm = await fetch(urlFilm);
    Promise.all([putNote, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        setfilm((prevData) => ({ ...prevData, notes: data.notes }));
        console.log(data.notes);
      });
  }
  return (
    <div>
      <h1>{film.titre}</h1>
      <img src={`/img/${film.titreVignette}`} alt={film.titre} />
      <p>Réealisateur: {film.realisateur}</p>
      <p>Année: {film.annee}</p>
      <p>Description: {film.description}</p>
      <p>Notes: {film.notes}</p>
      <button onClick={soumettreNote}>Note</button>
    </div>
  );
}
export default Film;
