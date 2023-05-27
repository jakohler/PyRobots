import { Button, Grid } from "@mui/material";
import { Circle, Group, Layer, Line, Rect, Stage } from "react-konva";

import { Animate, ControlProps } from "./Animation";
import {
  animationInfo,
  boardConfig,
  gameCoords,
  gameToBoard_coordinates,
  missileInFrameConfig,
  robotInFrameConfig,
  robotInAnimationInfo,
  robotInSideTextConfig,
  simulationResult_to_animationInfo,
  robotNameInfo,
} from "./boardHelper";
import { simulationResult } from "./SimulationAPI";
import { Button_sx } from "../Style";

function BackGround(board: boardConfig): JSX.Element {
  return (
    <Rect
      x={board.x0}
      y={board.y0}
      width={board.size_in_screen}
      height={board.size_in_screen}
      fill="#FDFD96"
      shadowBlur={10}
    />
  );
}

function Robot({
  board,
  robotConfig,
}: {
  board: boardConfig;
  robotConfig: robotInFrameConfig;
}): JSX.Element {
  const robot_board: gameCoords = gameToBoard_coordinates(
    board,
    robotConfig.coords
  );

  return (
    <Circle
      key={"Robot in board" + robotConfig.name}
      x={robot_board.x}
      y={robot_board.y}
      radius={board.robotsSize / 2}
      fill={robotConfig.color}
      stroke="black"
      strokeWidth={1}
    />
  );
}

function Robots({
  board,
  robots,
}: {
  board: boardConfig;
  robots: robotInFrameConfig[];
}): JSX.Element {
  return (
    <Group>
      {robots.map((robot: robotInFrameConfig, key: number) => (
        <Group key={key}>
          <Robot board={board} robotConfig={robot} />
        </Group>
      ))}
    </Group>
  );
}

/* Draws a missile as a strait line */
function Missile({
  board,
  missileConfig,
}: {
  board: boardConfig;
  missileConfig: missileInFrameConfig;
}): JSX.Element {
  const missile_board: gameCoords = gameToBoard_coordinates(
    board,
    missileConfig.coords
  );

  const x_component_direction: number = Math.cos(
    (missileConfig.direction * Math.PI) / 180
  );
  const y_component_direction: number = Math.sin(
    (missileConfig.direction * Math.PI) / 180
  );

  const missile_size: number = (board.robotsSize * 3) / 4;

  return (
    <Line
      points={[
        missile_board.x - (missile_size / 2) * x_component_direction,
        missile_board.y - (missile_size / 2) * y_component_direction,
        missile_board.x + (missile_size / 2) * x_component_direction,
        missile_board.y + (missile_size / 2) * y_component_direction,
      ]}
      stroke={missileConfig.color}
      strokeWidth={missile_size / 2}
      lineCap="round"
    />
  );
}

function Missiles({
  board,
  missiles,
}: {
  board: boardConfig;
  missiles: missileInFrameConfig[];
}): JSX.Element {
  return (
    <Group>
      {missiles.map((missile: missileInFrameConfig, key: number) => (
        <Group key={key}>
          <Missile board={board} missileConfig={missile} />
        </Group>
      ))}
    </Group>
  );
}

function MainBoard({
  board_size,
  robots,
  missiles,
}: {
  board_size: number;
  robots: robotInFrameConfig[];
  missiles: missileInFrameConfig[];
}): JSX.Element {
  const robot_size_relative: number = 0.02;
  const window_min_size: number = Math.min(
    window.innerWidth,
    window.innerHeight
  );
  const margin_percentage: number = 0;
  const margin: number = window_min_size * margin_percentage;

  const board: boardConfig = {
    board_size: board_size,
    x0: window_min_size * margin_percentage,
    y0: window_min_size * margin_percentage,
    size_in_screen: window_min_size - 2 * margin,
    robotsSize: robot_size_relative * window_min_size,
  };

  return (
    <Stage width={window_min_size} height={window_min_size}>
      <Layer>
        <BackGround {...board} />
        <Robots board={board} robots={robots} />
        <Missiles board={board} missiles={missiles} />
      </Layer>
    </Stage>
  );
}

export function RobotName({ name, color }: robotNameInfo): JSX.Element {
  return (
    <div key={"RobotName" + color}>
      <strong>
        <span style={{ color: color }}>{"• "}</span>
        {name}
      </strong>
    </div>
  );
}

export function RobotInfo(robot: robotInSideTextConfig): JSX.Element {
  return (
    <div
      data-testid={"RobotInfo " + robot.name}
      key={"RobotInfo" + robot.color}
    >
      <h3 style={{ fontWeight: "normal" }}>
        <RobotName name={robot.name} color={robot.color} />
      </h3>
      <p>{`Vida: ${Math.round(robot.life * 100)}%`}</p>
    </div>
  );
}

function SideText({
  robots,
}: {
  robots: robotInSideTextConfig[];
}): JSX.Element {
  return (
    <div>
      <h1>Simulación</h1>
      {robots.map(RobotInfo)}
    </div>
  );
}

function ShowWinners({
  winners,
}: {
  winners: Array<robotNameInfo>;
}): JSX.Element {
  return (
    <div style={{ paddingTop: 10 }}>
      {winners.length === 0 ? (
        <div>No hay ganadores</div>
      ) : winners.length === 1 ? (
        <div>
          El ganador es:
          {RobotName(winners[0])}
        </div>
      ) : (
        <div>
          Empate entre los robots:
          {winners.map(RobotName)}
        </div>
      )}
    </div>
  );
}

function controls(control: ControlProps): JSX.Element {
  return (
    <div>
      <Button sx={Button_sx} onClick={control.restart}>
        Reiniciar
      </Button>
      <Button sx={{ ...Button_sx, ml: 1 }} onClick={control.pause}>
        Pausar
      </Button>
    </div>
  );
}

export function renderFrame(
  animation: animationInfo,
  frame: number,
  control: ControlProps
): JSX.Element {
  const after_end: boolean = frame >= animation.rounds_amount;

  const robotsInGame: robotInFrameConfig[] = animation.robots.flatMap(
    (robot: robotInAnimationInfo) => {
      const robot_frame: number | null =
        after_end && robot.winner
          ? animation.rounds_amount - 1
          : frame < robot.rounds.length
          ? frame
          : null;
      return robot_frame === null
        ? []
        : [
            {
              name: robot.name,
              color: robot.color,
              coords: robot.rounds[robot_frame].coords,
            },
          ];
    }
  );

  const robotsInSideText: robotInSideTextConfig[] = animation.robots.map(
    (robot: robotInAnimationInfo) => {
      const robot_frame: number | null =
        after_end && robot.winner
          ? animation.rounds_amount - 1
          : frame < robot.rounds.length
          ? frame
          : null;
      return {
        name: robot.name,
        color: robot.color,
        life: 1 - (robot.rounds[robot_frame!]?.damage ?? 1),
      };
    }
  );

  const winners: Array<robotNameInfo> = animation.robots.flatMap(
    (robot: robotInAnimationInfo) => {
      return robot.winner ? [{ name: robot.name, color: robot.color }] : [];
    }
  );

  return (
    <Grid
      container
      data-testid="Board"
      sx={{ paddingTop: 1, position: "absolute" }}
    >
      <Grid item xs="auto">
        <MainBoard
          board_size={animation.board_size}
          robots={robotsInGame}
          missiles={animation.missiles[frame] ?? []}
        />
      </Grid>
      <Grid item xs="auto" style={{ textAlign: "left", paddingLeft: 5 }}>
        <div>
          <SideText robots={robotsInSideText} />
          {after_end ? ShowWinners({ winners: winners }) : <div />}
        </div>
        <div style={{ position: "absolute", bottom: 0, paddingBottom: "5px" }}>
          {controls(control)}
        </div>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
}

export function Board({
  simulation,
}: {
  simulation: simulationResult;
}): JSX.Element {
  const animation: animationInfo =
    simulationResult_to_animationInfo(simulation);

  return (
    <div data-testid="Board">
      {Animate(
        animation.rounds_amount,
        50,
        5,
        (frame: number, control: ControlProps) =>
          renderFrame(animation, frame, control)
      )}
    </div>
  );
}

export default Board;
