import React from "react";
import "./Filtre.css";

function Filtre({ setUrlFiltre, urlListFilms }) {
  const filtres = [
    {
      ordre: "realisation",
      direction: "asc",
      filtre: "Réalisation alphabétique (A-Z)",
    },
    { ordre: "titre", direction: "asc", filtre: "Titre alphabétique (A-Z)" },
    { ordre: "annee", direction: "desc", filtre: "Par année (du plus récent)" },
    { ordre: "annee", direction: "asc", filtre: "Par année (du plus ancien)" },
  ];

  function aplicarFiltro(ordre, direction) {
    setUrlFiltre(`${urlListFilms}?ordre=${ordre}&direction=${direction}`);
  }

  return (
    <div className="wrapper">
      <div className="Filtre">
      <ul>
        {filtres.map((filtre, index) => (
          <li
            key={index}
            onClick={() => aplicarFiltro(filtre.ordre, filtre.direction)}
          >
            {filtre.filtre}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Filtre;
