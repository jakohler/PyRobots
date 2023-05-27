import { robotInSimulationResult, simulationResult } from "./SimulationAPI";

// types
export type boardConfig = {
  board_size: number;
  x0: number;
  y0: number;
  size_in_screen: number;
  robotsSize: number;
};
export type gameCoords = { x: number; y: number };
export type boardCoords = { x: number; y: number };

export type robotConfig = { name: string; color: string };
export type robotInSideTextConfig = robotConfig & { life: number };
export type robotInFrameConfig = robotConfig & { coords: gameCoords };
export type missileInFrameConfig = {
  coords: gameCoords;
  direction: number;
  color: string;
};
export type robotInAnimationInfo = robotInSimulationResult & {
  color: string;
  winner: boolean;
};
export type animationInfo = {
  board_size: number;
  rounds_amount: number;
  robots: Array<robotInAnimationInfo>;
  missiles: Array<Array<missileInFrameConfig>>;
};

export type robotNameInfo = {
  name: string;
  color: string;
};

// functions
export function gameToBoard_coordinates(
  board: boardConfig,
  gameCoords: gameCoords
): boardCoords {
  return {
    x: board.x0 + (gameCoords.x * board.size_in_screen) / board.board_size,
    y: board.y0 + (gameCoords.y * board.size_in_screen) / board.board_size,
  };
}

export function simulationResult_to_animationInfo(
  simulationResult: simulationResult
): animationInfo {
  const rounds_amount: number = Math.max(
    ...simulationResult.robots.map(
      (robot: robotInSimulationResult) => robot.rounds.length
    )
  );

  const robots: Array<robotInAnimationInfo> = simulationResult.robots.map(
    (robot: robotInSimulationResult, key: number) => {
      return {
        ...robot,
        color: ["red", "blue", "green", "lightskyblue"][key], // There are no more than four robots in a game, so key < 4
        winner: robot.rounds.length === rounds_amount && !robot.cause_of_death,
      };
    }
  );

  const missiles: Array<Array<missileInFrameConfig>> = [];
  {
    // Calculate missiles positions in each round
    const missile_velocity = simulationResult.missile_velocity;

    type missilesInSimulation = missileInFrameConfig & {
      distance_left: number;
    };

    let actual_missiles: Array<missilesInSimulation> = [];

    for (let i = 0; i < rounds_amount; i++) {
      // Update `actual_missiles` positions
      actual_missiles.forEach((missile: missilesInSimulation) => {
        missile.distance_left -= missile_velocity;
        missile.coords = {
          x:
            missile.coords.x +
            Math.cos((missile.direction * Math.PI) / 180) * missile_velocity,
          y:
            missile.coords.y +
            Math.sin((missile.direction * Math.PI) / 180) * missile_velocity,
        };
      });

      // Remove from `actual_missiles` missiles that have reached their destination
      actual_missiles = actual_missiles.filter(
        (missile: missilesInSimulation) => {
          return missile.distance_left > 0;
        }
      );

      // Add new missiles to `actual_missiles`
      actual_missiles.push(
        ...robots.flatMap((robot: robotInAnimationInfo) => {
          const missile = robot.rounds[i]?.missile;

          return missile
            ? [
                {
                  coords: robot.rounds[i].coords,
                  direction: missile.direction,
                  distance_left: missile.distance,
                  color: robot.color,
                },
              ]
            : [];
        })
      );

      // Add `actual_missiles` to `missiles`
      missiles.push(
        actual_missiles.map((missile: missilesInSimulation) => {
          return {
            coords: missile.coords,
            direction: missile.direction,
            color: missile.color,
          };
        })
      );
    }
  }

  return {
    board_size: simulationResult.board_size,
    rounds_amount: rounds_amount,
    robots: robots,
    missiles: missiles,
  };
}
