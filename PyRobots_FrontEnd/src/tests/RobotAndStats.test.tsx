import { render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import RobotLibrary from "../features/listRobotsAndStats/RobotLibrary";
import AxiosMockAdapter from "axios-mock-adapter"
import { RobotsAndStats } from "../features/listRobotsAndStats/RobotsAndStats";

const mock = new AxiosMockAdapter(axios);

describe("Testear componente RobotLibrary", () => {
  afterEach(() => {
    mock.reset();
  });
  test("Testear axios get", async () => {
    mock.onGet("http://127.0.0.1:8000/robot/statistics").reply(200, {
      robot_id: 1,
      robot_name: "robot",
      gamePlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "img",
    });

    const spy = jest.spyOn(axios, "get");
    await axios
      .get("http://127.0.0.1:8000/robot/statistics", {})
      .then((response) => {
        console.log(response.data);
      });

    expect(spy).toHaveBeenCalled();
  });

  test("Testear que no tienes robots", () => {
    render(
      <BrowserRouter>
        <RobotLibrary />
      </BrowserRouter>
    );
    const noRobots = screen.getByTestId("notCreated");
    expect(noRobots).toBeInTheDocument();
  });
});

describe("Testear componente RobotsAndStats", () => {
  test("Se renderiza la card", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });
  test("Se renderiza el avatar del robot", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
  });
  test("Se renderiza el nombre del robot", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const nombre = screen.getByText(/Robot: robot/i);
    expect(nombre).toBeInTheDocument();
  });
  test("Se renderiza las partidas jugadas del robot", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const gamesPlayed = screen.getByText(/Partidas Totales: 3/i);
    expect(gamesPlayed).toBeInTheDocument();
  });
  test("Se renderiza las victorias del robot", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const victories = screen.getByText(/Partidas Ganadas: 1/i);
    expect(victories).toBeInTheDocument();
  });
  test("Se renderiza las partidas perdidas del robot", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const losses = screen.getByText(/Partidas Perdidas: 1/i);
    expect(losses).toBeInTheDocument();
  });
  test("Se renderiza las partidas empatadas", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const tied = screen.getByText(/Partidas Empatadas: 1/i);
    expect(tied).toBeInTheDocument();
  });

  test("Se renderiza el win ratio", () => {
    const props = {
      robot_id: 1,
      robot_name: "robot",
      gamesPlayed: 3,
      wins: 1,
      tied: 1,
      losses: 1,
      avatar_name: "robot.jpg",
      avatar_img: "b'img'",
    };
    render(
      <BrowserRouter>
        <RobotsAndStats robot={props} />
      </BrowserRouter>
    );
    const winRatio = screen.getByText(
      /Porcentaje Victorias: 33.333333333333336/i
    );
    expect(winRatio).toBeInTheDocument();
  });
});
