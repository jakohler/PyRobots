import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import PassRecover from "../features/passwordRecovery/PassRecover";
import { SendCode } from "../features/passwordRecovery/SendCode";
import { SendEmail } from "../features/passwordRecovery/SendEmail";

describe("Test al componente PassRecover", () => {
  test("Se renderiza el texto Recuperar Contraseña", () => {
    render(
      <BrowserRouter>
        <PassRecover />
      </BrowserRouter>
    );
    const pass = screen.getByText(/Recuperar Contraseña/i);
    expect(pass).toBeInTheDocument();
  });

  test("Existe un componente form", () => {
    render(
      <BrowserRouter>
        <PassRecover />
      </BrowserRouter>
    );
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  test("Se renderiza el link al register", () => {
    render(
      <BrowserRouter>
        <PassRecover />
      </BrowserRouter>
    );
    const reg = screen.getByTestId("goToRegister");
    expect(reg).toBeInTheDocument();
  });

  test("Se renderiza el link al login", () => {
    render(
      <BrowserRouter>
        <PassRecover />
      </BrowserRouter>
    );
    const log = screen.getByTestId("goToLogin");
    expect(log).toBeInTheDocument();
  });
});

describe("Test al componente SendCode", () => {
  test("Se renderiza el textfield contraseña", () => {
    render(
      <BrowserRouter>
        <SendCode />
      </BrowserRouter>
    );
    const pass = screen.getByTestId("pass");
    expect(pass).toBeInTheDocument();
  });

  test("Se renderiza el textfield confirmar contraseña", () => {
    render(
      <BrowserRouter>
        <SendCode />
      </BrowserRouter>
    );
    const pass = screen.getByTestId("passConfirm");
    expect(pass).toBeInTheDocument();
  });

  test("Se renderiza el textfield código", () => {
    render(
      <BrowserRouter>
        <SendCode />
      </BrowserRouter>
    );
    const code = screen.getByTestId("code");
    expect(code).toBeInTheDocument();
  });

  test("Se renderiza el button submit", () => {
    render(
      <BrowserRouter>
        <SendCode />
      </BrowserRouter>
    );
    const submit = screen.getByTestId("submit");
    expect(submit).toBeInTheDocument();
  });

  describe("Test al componente SendEmail", () => {
    test("Se renderiza el textfield username", () => {
      render(
        <BrowserRouter>
          <SendEmail />
        </BrowserRouter>
      );
      const user = screen.getByTestId("user");
      expect(user).toBeInTheDocument();
    });

    test("Se renderiza el button submit", () => {
      render(
        <BrowserRouter>
          <SendEmail />
        </BrowserRouter>
      );
      const submit = screen.getByTestId("submit");
      expect(submit).toBeInTheDocument();
    });
  });
});
