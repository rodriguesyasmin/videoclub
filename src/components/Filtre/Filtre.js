import "./Filtre.css";

function Filtre({ setUrlFiltre, urlListFilms }) {
  /**
   * function qui sert a dynamiser l'url pour filtrer
   * @param {*} ordre
   * @param {*} direction
   */
  function filtres(ordre, direction = "asc") {
    setUrlFiltre(`${urlListFilms}?ordre=${ordre}&direction=${direction}`);
  }

  return (
    <div>
      <ul>
        <li onClick={() => filtres("realisation", "asc")}>
          Réalisation alphabétique (A-Z)
        </li>
        <li onClick={() => filtres("titre", "asc")}>
          Titre alphabétique (A-Z)
        </li>
        <li onClick={() => filtres("annee", "desc")}>
          Par année (du plus récent)
        </li>
        <li onClick={() => filtres("annee", "asc")}>
          Par année (du plus ancien)
        </li>
      </ul>
    </div>
  );
}

export default Filtre;
