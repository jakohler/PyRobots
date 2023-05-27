import { render, screen } from "@testing-library/react";

import { SimulationForm } from "../features/board/NewSimulation";

describe("Componente NewSimulation", () => {
  test("Campos de texto de `SimulationForm`", () => {
    render(SimulationForm(() => null));

    const newSimulationForm: HTMLElement = screen.getByTestId("newSimulation");
    expect(newSimulationForm).toBeInTheDocument();
    expect(newSimulationForm).toHaveTextContent("Nueva simulación");
    expect(newSimulationForm).toHaveTextContent("Cantidad de rondas *");
    expect(newSimulationForm).toHaveTextContent("Entre 1 y 10000");
    expect(newSimulationForm).toHaveTextContent("Elegir Robot");
  });
});
