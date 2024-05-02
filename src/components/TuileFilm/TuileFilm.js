import "./TuileFilm.css";

function TuileFilm(props) {
  //console.log(props.data);

  return (
    <article>
      <h2>{props.data.titre}</h2>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p>
    </article>
  );
}

export default TuileFilm;
