import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Filtre from "../Filtre/Filtre";
import TuileFilm from "../TuileFilm/TuileFilm";
import "./Films.css";

function Films() {
  const urlListFilms = "https://four1f-tp1-rodriguesyasmin.onrender.com/api/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListFilms);
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

  const tuilesFilm = listeFilms.map((film, index) => (
    <Link to={`/films/${film.id}`} className="film" key={index}>
      <TuileFilm data={film} id={index} />
    </Link>
  ));

  const transition = { duration: 1.5, ease: "easeInOut" };
  const animationBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  return (
    <main className="wrapper">
      <Filtre setUrlFiltre={setUrlFiltre} urlListFilms={urlListFilms} />
      <h2>Films</h2>
      {estCharge ? (
        <motion.div
          className="films-wrapper" 
          key="liste-film"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationBasVersHaut}
        >
          <div className="films-grid">
            {tuilesFilm}
          </div>
        </motion.div>
      ) : (
        "Chargement..."
      )}
    </main>
  );
}

export default Films;
