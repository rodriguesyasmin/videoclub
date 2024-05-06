import "./Films.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Films() {
  const urlListFilms =
    "https://four1f-tp1-rodriguesyasmin.onrender.com/api/films";
  // const [etat, setEtat] = useState(true);
  // const [etat2, setEtat2] = useState(false);
  const [listeFilms, setListeFilms] = useState([]);
  useEffect(() => {
    // console.log("rendu");
    fetch(urlListFilms)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeFilms(data);
      });
  }, []);

  const tuilesFilm = listeFilms.map((film, index) => (
    <Link to={`/film/${film.id}`} className="film" key={index}>
      <TuileFilm data={film} />
    </Link>
  ));
  return (
    <main>
      {/* <button onClick={() => setEtat(!etat)}>Change état</button>
      <button onClick={() => setEtat2(!etat2)}>Change état</button> */}
      <h2>Films</h2>
      <div>{tuilesFilm}</div>
    </main>
  );
}

export default Films;
