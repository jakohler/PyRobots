import ListMatches from "../features/listMatches/ListMatches";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Test al componente ListMatches", () => {
  test("Existe un componente form", () => {
    render(
      <BrowserRouter>
        <ListMatches />
      </BrowserRouter>
    );
    const form = screen.getByTestId("formList");
    expect(form).toBeInTheDocument();
  });
});
