import { BrowserRouter } from "react-router-dom";
import NewGame from "../features/newGame/NewGame";
import { render, screen } from "@testing-library/react";

describe("Componente NewGame", () => {
  test("El textfield Nombre esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const nombre = screen.getByTestId("game-name");
    expect(nombre).toBeInTheDocument();
  });

  test("El textfield Cantidad de juegos esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const juegos = screen.getByTestId("games-amount");
    expect(juegos).toBeInTheDocument();
  });

  test("El textfield Cantidad de rondas esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const rounds = screen.getByTestId("rounds-amount");
    expect(rounds).toBeInTheDocument();
  });

  test("El textfield Máximo de jugadores esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const max_players = screen.getByTestId("max-players");
    expect(max_players).toBeInTheDocument();
  });

  test("El textfield Mínimo de jugadores esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const min_players = screen.getByTestId("min-players");
    expect(min_players).toBeInTheDocument();
  });

  test("El textfield Password esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const password = screen.getByTestId("password");
    expect(password).toBeInTheDocument();
  });

  test("El textfield Submit esta en el componente", () => {
    render(
      <BrowserRouter>
        <NewGame />
      </BrowserRouter>
    );
    const submit = screen.getByTestId("submit");
    expect(submit).toBeInTheDocument();
  });
});
