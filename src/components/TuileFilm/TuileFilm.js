import "./TuileFilm.css";

function TuileFilm(props) {
  return (
    <div className="card" data-testid={`tuile-film-${props.id}`}>
      <h2>{props.data.titre}</h2>
      <img
        src={`/img/${props.data.titreVignette}`}
        alt={`${props.data.titre}`}
      />
      <div className="info">
        <h3>{props.data.realisation}</h3>
        <p>{props.data.annee}</p>
      </div>
    </div>
  );
}

export default TuileFilm;
