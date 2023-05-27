import { render, screen } from "@testing-library/react";
import { RobotInfo, renderFrame } from "../features/board/board";
import {
  gameToBoard_coordinates,
  boardConfig,
  gameCoords,
  boardCoords,
  animationInfo,
  simulationResult_to_animationInfo,
} from "../features/board/boardHelper";
import { simulationResult } from "../features/board/SimulationAPI";
import { toMatchCloseTo } from "jest-matcher-deep-close-to";

expect.extend({ toMatchCloseTo });

describe("Componente Board", () => {
  const simulation: simulationResult = {
    board_size: 1000,
    missile_velocity: 10,
    robots: [
      {
        name: "fork bomb",
        rounds: [
          { coords: { x: 0, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 20 }, direction: 20, speed: 10, damage: 0 },
          {
            coords: { x: 30, y: 20 },
            direction: 20,
            speed: 10,
            damage: 0,
            missile: {
              direction: 20,
              distance: 100,
            },
          },
          { coords: { x: 30, y: 30 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 40, y: 30 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 40, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 60 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 70, y: 60 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 70, y: 70 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 80, y: 70 }, direction: 20, speed: 10, damage: 0 },
        ],
      },
      {
        name: "teipysgrif",
        rounds: [
          {
            coords: { x: 465.465, y: 63.156 },
            direction: 20.654,
            speed: 3.1416,
            damage: 0,
          },
          {
            coords: { x: 2.156, y: 589.6 },
            direction: 256.32,
            speed: 96.235,
            damage: 0.5,
          },
        ],
      },
    ],
  };

  const animation: animationInfo =
    simulationResult_to_animationInfo(simulation);

  test("Campos de texto de `renderFrame` en el frame 0", () => {
    render(
      renderFrame(animation, 0, { restart: () => null, pause: () => null })
    );
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
    expect(board).toHaveTextContent("• fork bomb");
    expect(board).toHaveTextContent("• teipysgrif");
    expect(board).toHaveTextContent("Vida: 100%");
    expect(board).toHaveTextContent("Reiniciar");
    expect(board).toHaveTextContent("Pausar");
  });

  test("Campos de texto de `renderFrame` en el frame 1", () => {
    render(
      renderFrame(animation, 1, { restart: () => null, pause: () => null })
    );
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
    expect(board).toHaveTextContent("• fork bomb");
    expect(board).toHaveTextContent("• teipysgrif");
    expect(board).toHaveTextContent("Vida: 100%");
    expect(board).toHaveTextContent("Vida: 50%");
    expect(board).toHaveTextContent("Reiniciar");
    expect(board).toHaveTextContent("Pausar");
  });

  test("Campos de texto de `renderFrame` en el frame 10", () => {
    render(
      renderFrame(animation, 10, { restart: () => null, pause: () => null })
    );
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
    expect(board).toHaveTextContent("• fork bomb");
    expect(board).toHaveTextContent("• teipysgrif");
    expect(board).toHaveTextContent("Vida: 100%");
    expect(board).toHaveTextContent("Vida: 0%");
    expect(board).toHaveTextContent("Reiniciar");
    expect(board).toHaveTextContent("Pausar");
  });

  test("Campos de texto de `renderFrame` en mas frames que los que dura ", () => {
    render(
      renderFrame(animation, 100000000, {
        restart: () => null,
        pause: () => null,
      })
    );
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
    expect(board).toHaveTextContent("• fork bomb");
    expect(board).toHaveTextContent("• teipysgrif");
    expect(board).toHaveTextContent("Vida: 100%");
    expect(board).toHaveTextContent("Vida: 0%");
    expect(board).toHaveTextContent("El ganador es:");
    expect(board).toHaveTextContent("Reiniciar");
    expect(board).toHaveTextContent("Pausar");
  });

  test("Componente `RobotInfo`", () => {
    render(<RobotInfo name="Robot de prueba" color="Red" life={1} />);
    const board: HTMLElement = screen.getByTestId("RobotInfo Robot de prueba");
    expect(board).toHaveTextContent("• Robot de prueba");
    expect(board).toHaveTextContent("Vida: 100%");
  });
});

describe("Funciones dentro del componente `Board`", () => {
  describe("Función `gameToBoard_coordinates`", () => {
    const game_board_coords: {
      board: boardConfig;
      gameCoords: gameCoords;
      boardCoords: boardCoords;
    }[] = [
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 0, y: 0 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 1000, y: 1000 },
        boardCoords: { x: 1000, y: 1000 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: -500, y: 500 },
        boardCoords: { x: -500, y: 500 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 500, y: -500 },
        boardCoords: { x: 500, y: -500 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: -1000, y: -500 },
        boardCoords: { x: -1000, y: -500 },
      },

      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 0, y: 0 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 1000, y: 500 },
        boardCoords: { x: 500, y: 250 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: -500, y: 250 },
        boardCoords: { x: -250, y: 125 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 250, y: -125 },
        boardCoords: { x: 125, y: -62.5 },
      },
      {
        board: {
          board_size: 1000,
          x0: 0,
          y0: 0,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: -1000, y: -250 },
        boardCoords: { x: -500, y: -125 },
      },

      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 200, y: 300 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 1000, y: 1000 },
        boardCoords: { x: 1200, y: 1300 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: -500, y: 500 },
        boardCoords: { x: -300, y: 800 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: 500, y: -500 },
        boardCoords: { x: 700, y: -200 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 1000,
          robotsSize: 0,
        },
        gameCoords: { x: -1000, y: -500 },
        boardCoords: { x: -800, y: -200 },
      },

      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 200, y: 300 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 1000, y: 500 },
        boardCoords: { x: 700, y: 550 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: -500, y: 250 },
        boardCoords: { x: -50, y: 425 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: 250, y: -125 },
        boardCoords: { x: 325, y: 237.5 },
      },
      {
        board: {
          board_size: 1000,
          x0: 200,
          y0: 300,
          size_in_screen: 500,
          robotsSize: 0,
        },
        gameCoords: { x: -1000, y: -250 },
        boardCoords: { x: -300, y: 175 },
      },
    ];

    test("Valores de retorno", () => {
      const result: { expected: boardCoords; got: boardCoords }[] =
        game_board_coords.map(({ board, gameCoords, boardCoords }) => {
          return {
            expected: boardCoords,
            got: gameToBoard_coordinates(board, gameCoords),
          };
        });

      result.forEach(({ expected, got }) => {
        expect(got).toEqual(expected);
      });
    });
  });

  describe("Función `simulationResult_to_animationInfo`", () => {
    const input_expectedOutputs: Array<{
      input: simulationResult;
      expectedOutput: animationInfo;
    }> = [
      {
        // Test 1
        input: {
          board_size: 1000,
          missile_velocity: 10,
          robots: [
            {
              name: "robot1",
              rounds: [
                {
                  coords: { x: 0, y: 0 },
                  direction: 30,
                  speed: 2,
                  damage: 0,
                },
              ],
            },
          ],
        },
        expectedOutput: {
          board_size: 1000,
          rounds_amount: 1,
          robots: [
            {
              name: "robot1",
              rounds: [
                {
                  coords: { x: 0, y: 0 },
                  direction: 30,
                  speed: 2,
                  damage: 0,
                },
              ],
              color: "red",
              winner: true,
            },
          ],
          missiles: [[]],
        },
      },
      {
        // Test 2
        input: {
          board_size: 1000,
          missile_velocity: 2.5,
          robots: [
            {
              name: "ρομπότ",
              rounds: [
                {
                  coords: { x: 563.48, y: 915.153 },
                  direction: 265.564,
                  speed: 26.156,
                  damage: 0,
                },
              ],
            },
            {
              name: "хай живе україна",
              rounds: [
                {
                  coords: { x: 0, y: 0 },
                  direction: 315,
                  speed: 1.41421356237,
                  damage: 0,
                },
                {
                  coords: { x: 10, y: 10 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                  missile: { direction: 0, distance: 7.5 },
                },
                {
                  coords: { x: 20, y: 20 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
                {
                  coords: { x: 40, y: 40 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
                {
                  coords: { x: 50, y: 50 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
              ],
            },
          ],
        },
        expectedOutput: {
          board_size: 1000,
          rounds_amount: 5,
          robots: [
            {
              name: "ρομπότ",
              rounds: [
                {
                  coords: { x: 563.48, y: 915.153 },
                  direction: 265.564,
                  speed: 26.156,
                  damage: 0,
                },
              ],
              color: "red",
              winner: false,
            },
            {
              name: "хай живе україна",
              rounds: [
                {
                  coords: { x: 0, y: 0 },
                  direction: 315,
                  speed: 1.41421356237,
                  damage: 0,
                },
                {
                  coords: { x: 10, y: 10 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                  missile: { direction: 0, distance: 7.5 },
                },
                {
                  coords: { x: 20, y: 20 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
                {
                  coords: { x: 40, y: 40 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
                {
                  coords: { x: 50, y: 50 },
                  direction: 315,
                  speed: 14.1421356237,
                  damage: 0,
                },
              ],
              color: "blue",
              winner: true,
            },
          ],
          missiles: [
            [],
            [{ coords: { x: 10, y: 10 }, direction: 0, color: "blue" }],
            [{ coords: { x: 10 + 2.5, y: 10 }, direction: 0, color: "blue" }],
            [{ coords: { x: 10 + 5, y: 10 }, direction: 0, color: "blue" }],
            [],
          ],
        },
      },
      {
        // Test 3
        input: {
          board_size: 800,
          missile_velocity: 4,
          robots: [
            {
              name: "Curry",
              rounds: [
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                  missile: { direction: 45, distance: 16.0001 },
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                  missile: { direction: 210, distance: 15.9999 },
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
              ],
            },
          ],
        },
        expectedOutput: {
          board_size: 800,
          rounds_amount: 6,
          robots: [
            {
              name: "Curry",
              color: "red",
              rounds: [
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                  missile: { direction: 45, distance: 16.0001 },
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                  missile: { direction: 210, distance: 15.9999 },
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
                {
                  coords: { x: 302.2584, y: 302.2584 },
                  direction: 0,
                  speed: 0,
                  damage: 0,
                },
              ],
              winner: true,
            },
          ],
          missiles: [
            [
              {
                coords: { x: 302.2584, y: 302.2584 },
                direction: 45,
                color: "red",
              },
            ],
            [
              {
                coords: {
                  x: 302.2584 + 4 * Math.cos(Math.PI / 4),
                  y: 302.2584 + 4 * Math.sin(Math.PI / 4),
                },
                direction: 45,
                color: "red",
              },
              {
                coords: { x: 302.2584, y: 302.2584 },
                direction: 210,
                color: "red",
              },
            ],
            [
              {
                coords: {
                  x: 302.2584 + 2 * 4 * Math.cos(Math.PI / 4),
                  y: 302.2584 + 2 * 4 * Math.sin(Math.PI / 4),
                },
                direction: 45,
                color: "red",
              },
              {
                coords: {
                  x: 302.2584 - 4 * Math.cos(Math.PI / 6),
                  y: 302.2584 - 4 * Math.sin(Math.PI / 6),
                },
                direction: 210,
                color: "red",
              },
            ],
            [
              {
                coords: {
                  x: 302.2584 + 3 * 4 * Math.cos(Math.PI / 4),
                  y: 302.2584 + 3 * 4 * Math.sin(Math.PI / 4),
                },
                direction: 45,
                color: "red",
              },
              {
                coords: {
                  x: 302.2584 - 2 * 4 * Math.cos(Math.PI / 6),
                  y: 302.2584 - 2 * 4 * Math.sin(Math.PI / 6),
                },
                direction: 210,
                color: "red",
              },
            ],
            [
              {
                coords: {
                  x: 302.2584 + 4 * 4 * Math.cos(Math.PI / 4),
                  y: 302.2584 + 4 * 4 * Math.sin(Math.PI / 4),
                },
                direction: 45,
                color: "red",
              },
              {
                coords: {
                  x: 302.2584 - 3 * 4 * Math.cos(Math.PI / 6),
                  y: 302.2584 - 3 * 4 * Math.sin(Math.PI / 6),
                },
                direction: 210,
                color: "red",
              },
            ],
            [],
          ],
        },
      },
    ];

    test("Valores de retorno", () => {
      const result: { expected: animationInfo; got: animationInfo }[] =
        input_expectedOutputs.map(({ input, expectedOutput }) => {
          return {
            expected: expectedOutput,
            got: simulationResult_to_animationInfo(input),
          };
        });

      result.forEach(({ expected, got }) => {
        expect(got).toMatchCloseTo(expected, 6);
      });
    });
  });
});
