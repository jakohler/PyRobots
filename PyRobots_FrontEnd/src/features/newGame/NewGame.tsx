import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import swal from "sweetalert2";

import NavBar from "../directories/NavBar";
import { Robot } from "../joinGame/JoinGame";
import { createMatchApi, newGameInfo } from "./NewGameApi";
import { ListOfRobots } from "../robotApi/ListOfRobots";
import { callApiListRobot } from "../robotApi/ListRobotApi";
import { Button_sx } from "../Style";

import "../directories/Home.css";

function onSubmit_newGame(
  event: React.FormEvent<HTMLFormElement>,
  arrRobot: Robot[]
): void {
  event.preventDefault();
  const data: FormData = new FormData(event.currentTarget);

  // pattern guarantees that all formats are correct

  const newGameInfo: newGameInfo = {
    name: data.get("game-name") as string,
    password: data.get("password") as string,
  };

  const rounds = data.get("rounds-amount");
  if (typeof rounds === "string") {
    newGameInfo.rounds = parseInt(rounds);
  }

  const games = data.get("games-amount");
  if (typeof games === "string") {
    newGameInfo.games = parseInt(games);
  }

  const max_players = data.get("max-players");
  if (typeof max_players === "string") {
    newGameInfo.max_players = parseInt(max_players);
  }

  const min_players = data.get("min-players");
  if (typeof min_players === "string") {
    newGameInfo.min_players = parseInt(min_players);
  }
  const robotId = data.get("select-robot");
  if (typeof robotId === "string") {
    if (robotId) {
      newGameInfo.robot = parseInt(robotId);
    }
  }

  if (newGameInfo.name.length > newGameInfo.name.trim().length) {
    alert("No se puede incluir espacios en blanco");
  } else {
    if (newGameInfo.min_players! > newGameInfo.max_players!) {
      alert("El mínimo de jugadores no puede ser mayor a la máxima");
    } else if (newGameInfo.robot && arrRobot.length > 0) {
      const access_token: string | null = localStorage.getItem("access_token");
      createMatchApi(newGameInfo, access_token);
    } else {
      swal.fire(
        "Cuidado",
        "Tienes que tener robots creados para poder crear una partida",
        "warning"
      );
    }
  }
}

// Regex of input validation (in string because `pattern` requires a string)
export const game_name_regex: string = "^.{3,12}$";
export const games_amount_regex: string = "^([1-9][0-9]?|1[0-9]{2}|200)$";
export const rounds_amount_regex: string = "^([1-9][0-9]{0,3}|10000)$";
export const max_players_regex: string = "^[2-4]$";
export const min_players_regex: string = "^[2-4]$";
export const password_regex: string = "^.{8,16}$";

function GameForm(): JSX.Element {
  const [arrRobot, setArrRobot] = useState<Robot[]>([]);
  useEffect(() => {
    callApiListRobot(setArrRobot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box
        component="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          onSubmit_newGame(e, arrRobot)
        }
      >
        <Grid>
          <TextField
            required
            multiline
            name="game-name"
            label="Nombre"
            variant="standard"
            helperText="Entre 3 y 12 caracteres"
            data-testid="game-name"
            type="text"
            inputProps={{
              minLength: 3,
              maxLength: 12,
              pattern: game_name_regex,
            }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            name="games-amount"
            label="Cantidad de juegos"
            variant="standard"
            helperText="Entre 1 y 200"
            defaultValue="200"
            type="text"
            data-testid="games-amount"
            inputProps={{ maxLength: 3, pattern: games_amount_regex }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            name="rounds-amount"
            label="Cantidad de rondas"
            variant="standard"
            helperText="Entre 1 y 10000"
            defaultValue="10000"
            data-testid="rounds-amount"
            type="text"
            inputProps={{ maxLength: 5, pattern: rounds_amount_regex }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            name="max-players"
            label="Máximo de jugadores"
            variant="standard"
            helperText="Entre 2 y 4"
            defaultValue="4"
            data-testid="max-players"
            type="text"
            inputProps={{ maxLength: 1, pattern: max_players_regex }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            name="min-players"
            label="Mínimo de jugadores"
            variant="standard"
            helperText="Entre 2 y 4"
            defaultValue="2"
            data-testid="min-players"
            type="text"
            inputProps={{ maxLength: 1, pattern: min_players_regex }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Grid>
          <TextField
            name="password"
            label="Contraseña"
            variant="standard"
            helperText="Entre 8 y 16 caracteres"
            type="text"
            data-testid="password"
            inputProps={{
              minLength: 8,
              maxLength: 16,
              pattern: password_regex,
            }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <ListOfRobots name="select-robot" label="Robots" />
        <Button
          type="submit"
          role="button"
          variant="contained"
          data-testid="submit"
          sx={{
            ...Button_sx,
            mt: 3,
            mb: 2,
          }}
        >
          Crear Partida
        </Button>
      </Box>
    </Container>
  );
}

function NewGame(): JSX.Element {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="bg-image"></div>
      <div className="form">
        <h1>Crear partida</h1>
        <GameForm />
      </div>
    </div>
  );
}

export default NewGame;
