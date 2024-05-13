import "./Films.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Films() {
  const urlListFilms =
    "https://four1f-tp1-rodriguesyasmin.onrender.com/api/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListFilms);
  // const [etat, setEtat] = useState(true);
  // const [etat2, setEtat2] = useState(false);
  const [listeFilms, setListeFilms] = useState([]);

  useEffect(() => {
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeFilms(data);
      });
  }, [urlFiltre]);
  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link to={`/films/${film.id}`} className="film" key={index}>
        <TuileFilm data={film} />
      </Link>
    );
  });
  /**
   *
   */
  function filtres(e) {
    console.log("dans fonction filtres");
    setUrlFiltre(`${urlListFilms}?ordre=annee&direction=asc&limit=5`);
  }
  return (
    <main>
      <ul>
        <li
          onClick={(e) => {
            filtres(e);
          }}
        >
          Réealisateur alphabétique (A-Z)
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {/* <button onClick={() => setEtat(!etat)}>Change état</button>
      <button onClick={() => setEtat2(!etat2)}>Change état</button> */}
      <h2>Films</h2>
      {tuilesFilm}
    </main>
  );
}

export default Films;
