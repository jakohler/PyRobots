import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ButtonChangeAvatar, ProfileInfo } from "../features/profile/profile";

describe("Componente información perfil ", () => {
  test("El botón para enviar el formulario se renderiza correctamente", () => {
    render(
      <BrowserRouter>
        <ButtonChangeAvatar />
      </BrowserRouter>
    );
    const buttonChange = screen.getByTestId("input-file");
    expect(buttonChange).toBeInTheDocument();
  });
  test("El componente de Avatar se renderiza correctamente", () => {
    render(
      <BrowserRouter>
        <ProfileInfo name="" email="" avatar_img="b'" avatar_name="hola.png" />
      </BrowserRouter>
    );
    const avatar = screen.getByRole("img", {name: "User Avatar"});
    expect(avatar).toBeInTheDocument(); 
  });
  test("El saludo aparece correctamente", () => {
    render(
      <BrowserRouter>
        <ProfileInfo name="" email="" avatar_img="b'" avatar_name="hola.png" />
      </BrowserRouter>
    );
    const greeting = screen.getByRole("heading", {name: "Hola !"});
    expect(greeting).toBeInTheDocument(); 
  });
  test("El separador de información sobre el usuario se renderizan de forma correcta", () => {
    render(
      <BrowserRouter>
        <ProfileInfo name="" email="" avatar_img="b'" avatar_name="hola.png" />
      </BrowserRouter>
    );
    const info = screen.getByRole("heading", {name: "INFORMACIÓN DE CUENTA"});
    expect(info).toBeInTheDocument(); 
  });
  test("El separador de información sobre el usuario se renderizan de forma correcta", () => {
    render(
      <BrowserRouter>
        <ProfileInfo name="" email="" avatar_img="b'" avatar_name="hola.png" />
      </BrowserRouter>
    );
    const options = screen.getByRole("heading", {name: "OPCIONES DE CONFIGURACIÓN"});
    expect(options).toBeInTheDocument(); 
  });
});
