import "./TuileFilm.css";

function TuileFilm(props) {
  console.log(props.data);
  if (!props.data) {
    return <div>Dados do filme indisponíveis</div>;
  }

  return (
    <article>
      <h2>{props.data.titre}</h2>
      <img
        src={`img/${props.data.titreVignette}`}
        alt={`${props.data.titre}`}
      />
      <p>{props.data.realisation}</p>
      <p>{props.data.annee}</p>
    </article>
  );
}

export default TuileFilm;
