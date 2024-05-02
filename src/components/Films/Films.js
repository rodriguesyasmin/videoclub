import "./Films.css";
import TuileFilm from "../TuileFilm/TuileFilm";

function Films() {
  return (
    <main>
      <h2>Films</h2>
      <div>
        <TuileFilm
          data={{ titre: "Film 1", realisateur: "Yasmin", annee: "1999" }}
        />
        <TuileFilm
          data={{ titre: "Film 2", realisateur: "YRodrigues", annee: "2000" }}
        />
      </div>
    </main>
  );
}

export default Films;
