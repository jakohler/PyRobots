import SignIn from "../features/login/SignIn";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Componente SignIn", () => {
  test("El textfield username esta en el componente", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const user = screen.getByTestId("user");
    expect(user).toBeInTheDocument();
  });

  test("El textfield password esta en el componente", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const pass = screen.getByTestId("pass");
    expect(pass).toBeInTheDocument();
  });

  test("El link para ir al registro esta en el componente", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const link = screen.getByTestId("goToRegister");
    expect(link).toBeInTheDocument();
  });

  test("El link para ir a cambiar la contraseña esta en el componente", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const link = screen.getByTestId("goToChangePassword");
    expect(link).toBeInTheDocument();
  });
});
