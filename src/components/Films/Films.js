import "./Films.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Films() {
  const urlListFilms =
    "https://four1f-tp1-rodriguesyasmin.onrender.com/api/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListFilms);
  // const [etat, setEtat] = useState(true);
  // const [etat2, setEtat2] = useState(false);
  const [listeFilms, setListeFilms] = useState([]);
  const [estCharge, setEstCharge] = useState(false);

  useEffect(() => {
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeFilms(data);
        setEstCharge(true);
      });
  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link to={`/films/${film.id}`} className="film" key={index}>
        <TuileFilm data={film} id={index} />
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
  const transition = { duration: 1.5, ease: "easeInOut" };
  const animationBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };
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
      <h2>Films</h2>
      {estCharge ? (
        <motion.div
          key="liste-film"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationBasVersHaut}
        >
          {tuilesFilm}
        </motion.div>
      ) : (
        ""
      )}
    </main>
  );
}

export default Films;
