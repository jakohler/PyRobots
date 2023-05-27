import { render, screen } from "@testing-library/react";
import { BrowserRouter, Navigate } from "react-router-dom";
import swal from "sweetalert2";

import {
  ErrorPage,
  InvalidArgumentsPage,
  SuccessPage,
} from "../features/register/emailValidation";
import { pageColor } from "../features/Style";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
}));

describe("Email validation", () => {
  test("SuccessPage", () => {
    render(<SuccessPage res="Success" />, { wrapper: BrowserRouter });
    expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
    expect(swal.fire).toHaveBeenCalledWith({
      title: "Success",
      icon: "success",
      confirmButtonColor: pageColor,
    });
  });

  test("ErrorPage", () => {
    render(<ErrorPage res="My massage" />, { wrapper: BrowserRouter });
    expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
    expect(swal.fire).toHaveBeenCalledWith({
      title: "Error",
      text: "My massage",
      icon: "error",
      confirmButtonColor: pageColor,
    });
  });

  test("InvalidArgumentsPage", () => {
    render(<InvalidArgumentsPage />, { wrapper: BrowserRouter });
    expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
    expect(swal.fire).toHaveBeenCalledWith({
      title: "Error",
      text: "Argumentos inválidos",
      icon: "error",
      confirmButtonColor: pageColor,
    });
  });
});
