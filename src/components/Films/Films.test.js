import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Films from "./Films";
import { act } from "react";
import TuileFilm from "../TuileFilm/TuileFilm";

describe("Composant Films", () => {
  // Objet fictif
  const mockFilm = {
    titre: "Alien - Le 8Ã¨me passager",
    genres: ["Horreur", "Science-fiction"],
    description:
      "Un vaisseau spatial perÃ§oit une transmission non-identifiée comme un signal de détresse...",
    titreVignette: "alienle8emepassager.jpg",
    realisation: "Ridley Scott",
    annee: 1979,
    notes: [3, 4, 5, 2, 1],
    commentaires: [
      { commentaire: "Commentaire 1", auteur: "admin" },
      { commentaire: "Commentaire 2", auteur: "admin" },
    ],
  };

  test("Vérifie la présence du titre", () => {
    render(<Films />);
    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    const regTitre = new RegExp("Films", "i");
    const queryTitre = screen.getByText(regTitre);
    expect(queryTitre).toBeTruthy();
    expect(queryTitre).toBeVisible(); //voir si le titre est visible
  });

  test("Vérifie le click sur le titre", () => {
    render(<Films />);
  });

  test("Vérifie la tuile d'un film", () => {
    render(<TuileFilm data={mockFilm} id="1" />);
    const elFilmTuile = screen.getByTestId("tuile-film-1");
    expect(elFilmTuile).toContainHTML("img");
    expect(elFilmTuile).toContainHTML("h2");

    const elImg = elFilmTuile.querySelector("img");
    expect(elImg).toHaveAttribute("src", `img/${mockFilm.titreVignette}`);
  });

  test("Vérifie si les clés sont présentes dans la réponse", async () => {
    const reponse = await fetch(
      "https://four1f-tp1-rodriguesyasmin.onrender.com/api/films"
    );
    const data = await reponse.json();

    await waitFor(() => {
      data.forEach((film) => {
        expect(film).toHaveProperty("titre");
        expect(film).toHaveProperty("genres");
        expect(film).toHaveProperty("description");
        expect(film).toHaveProperty("titreVignette");
        expect(film).toHaveProperty("realisation");
        expect(film).toHaveProperty("annee");
      });
    });
  });
});
