import "./TuileFilm.css";

function TuileFilm(props) {
  return (
    <article data-testid={`tuile-film-${props.id}`}>
      <h2>{props.data.titre}</h2>
      <img
        src={`/img/${props.data.titreVignette}`}
        alt={`${props.data.titre}`}
      />
      <p>{props.data.realisation}</p>
      <p>{props.data.annee}</p>
    </article>
  );
}

export default TuileFilm;
