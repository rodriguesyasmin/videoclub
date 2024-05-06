import "./TuileFilm.css";

function TuileFilm(props) {
  console.log(props.data);
  if (!props.data) {
    return <div>Dados do filme indisponíveis</div>;
  }

  return (
    <article>
      <h2>{props.data.titre}</h2>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p>
      <p>{props.data.id}</p>
    </article>
  );
}

export default TuileFilm;
