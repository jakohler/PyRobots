import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { FormChangePassword } from "../features/profile/changePassword"

describe("Componente cambiar contraseña ", () => {
  test("El botón para enviar el formulario se renderiza correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole("button", {name: "Enviar"})
    expect(submitButton).toBeInTheDocument();
  });
  test("El título del formulario se muestra correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );

    const textChangePass = screen.getByRole("heading", {name: "Cambiar contraseña"})
    expect(textChangePass).toBeInTheDocument();
  });
  test("El campo de input para ingresar la contraseña actual se muestra correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );

    const inputActualPass = screen.getByLabelText(/^Contraseña actual/i)
    expect(inputActualPass).toBeInTheDocument();
  });
  test("El campo de input para ingresar la nueva contraseña se muestra correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );

    const inputNewPass = screen.getByLabelText(/^Nueva contraseña/i)
    expect(inputNewPass).toBeInTheDocument();
  });
  test("El campo de input para ingresar la confirmación de la nueva contraseña se muestra correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );

    const inputConfNewPass = screen.getByLabelText(/^Confirmar nueva contraseña/i)
    expect(inputConfNewPass).toBeInTheDocument();
  });
  test("El ícono de password se muestra correctamente", () => {
    render(
      <BrowserRouter>
        <FormChangePassword />
      </BrowserRouter>
    );

    const iconPass = screen.getByTestId("icon-pass")
    expect(iconPass).toBeInTheDocument();
  });
});
