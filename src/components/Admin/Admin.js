import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useState } from "react";

function Admin() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const ListeGenres = [
    { id: "genre-action", name: "Action" },
    { id: "genre-comedie", name: "Comédie" },
    { id: "genre-drame", name: "Drame" },
    { id: "genre-fantastique", name: "Fantastique" },
    { id: "genre-horreur", name: "Horreur" },
    { id: "genre-romance", name: "Romance" },
    { id: "genre-sci-fi", name: "Science-Fiction" },
    { id: "genre-thriller", name: "Thriller" },
  ];

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = {
      titre: form.titre.value,
      genres: genres,
      description: form.description.value,
      annee: form.annee.value,
      realisation: form.realisation.value,
      titreVignette: form.titreVignette.value,
    };
    const token = `Bearer ${localStorage.getItem("api-token")}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };
    const reponse = await fetch("http://localhost:5501/api/films", options);
    const json = await reponse.json();
    console.log(json);
    if (reponse.status === 200) {
      navigate("/films");
    } else {
    }
  }
  function onChange(e) {
    const boite = e.currentTarget;
    const value = boite.value;
    if (boite.checked && !genres.includes(value)) {
      setGenres([...genres, value]);
    } else {
      let nouveauArray = genres.filter((element) => {
        return element !== value;
      });
      setGenres(nouveauArray);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="titre">Titre</label>
        <input id="titre" name="titre" type="text" />
      </div>

      <div>
        <label>Genres</label>
        {ListeGenres.map((genre) => (
          <div key={genre.id}>
            <input
              type="checkbox"
              id={genre.id}
              name="genres"
              value={genre.name}
              onChange={onChange}
            />
            <label htmlFor={genre.id}>{genre.name}</label>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" type="text" />
      </div>

      <div>
        <label htmlFor="annee">Année</label>
        <input id="annee" name="annee" type="text" />
      </div>

      <div>
        <label htmlFor="realisation">Réalisation</label>
        <input id="realisation" name="realisation" type="text" />
      </div>

      <div>
        <label htmlFor="titreVignette">Image</label>
        <input id="titreVignette" name="titreVignette" type="file" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Admin;
