import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRobot from "../features/newrobot/CreateRobot";
import { isValidRobotName } from "../features/newrobot/CreateRobotUtils";

beforeEach(() => {
  render(
    <BrowserRouter>
      <CreateRobot />
    </BrowserRouter>
  );
});

describe("Funciones dentro del componente", () => {
  describe("isValidRobotName", () => {
    test("Debe devolver verdadero con un nombre con formato correcto", () => {
      const result = isValidRobotName("NombreRobot");
      expect(typeof result).toBeTruthy();
    });
    test("Debe devolver falso, dado un nombre de robot muy largo", () => {
      const result = isValidRobotName("NombredelRobot12");
      expect(result).toBeFalsy();
    });
    test("Debe devolver falso, dado un nombre de robot muy corto", () => {
      const result = isValidRobotName("no");
      expect(result).toBeFalsy();
    });
    test("Debe devolver falso, dado un nombre de robot vacío", () => {
      const result = isValidRobotName("");
      expect(result).toBeFalsy();
    });
  });
});

describe("Compontente formulario de robot", () => {
  test("El contenedor del avatar está en el componente", () => {
    const avatarDiv = screen.getByTestId("avatarView");
    expect(avatarDiv).toBeInTheDocument();
  });
  test("La imagen de avatar para el robot está en el componente", () => {
    const avatarImg = screen.getByTestId("avatarImage");
    expect(avatarImg).toBeInTheDocument();
  });
  test("El botón para subir una foto está dentro de la componente", () => {
    const inputForAvatar = screen.getByTestId("robotAvatar");
    expect(inputForAvatar).toBeInTheDocument();
  });
  test("El imput para ingresar el nombre del robot está en el componente", () => {
    const inputForRobotName = screen.getByTestId("robotName");
    expect(inputForRobotName).toBeInTheDocument();
  });
  test("Se especifica al usuario el tipo de archivo de código aceptado", () => {
    const typeOfCode = screen.getByLabelText(/.py/i);
    expect(typeOfCode).toBeInTheDocument();
  });
  test("El imput para ingresar el código del robot está en la componente", () => {
    const imputForCode = screen.getByTestId("robotCode");
    expect(imputForCode).toBeInTheDocument();
  });
  test("El boton subir el robot está en el componente", () => {
    const submit = screen.getByTestId("submit-robot");
    expect(submit).toBeInTheDocument();
  });
});
