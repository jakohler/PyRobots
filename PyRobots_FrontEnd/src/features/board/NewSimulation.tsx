import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import Board from "./board";
import {
  newSimulationAPI,
  newSimulationInfo,
  simulationResult,
} from "./SimulationAPI";
import NavBar from "../directories/NavBar";
import { ListOfRobots } from "../robotApi/ListOfRobots";
import { Button_sx } from "../Style";

function onSubmit_newSimulation(
  setSimulationResult: React.Dispatch<
    React.SetStateAction<simulationResult | null>
  >,
  event: React.FormEvent<HTMLFormElement>
): void {
  event.preventDefault();
  const data: FormData = new FormData(event.currentTarget);

  // pattern guarantees that all formats are correct

  const newSimulationInfo: newSimulationInfo = {
    rounds: { rounds: 10000 },
    robots: [],
  };

  const rounds = data.get("rounds-amount");
  if (typeof rounds === "string") {
    newSimulationInfo.rounds = { rounds: parseInt(rounds) };
  }

  const robotId_1 = data.get("select-robot-1");
  if (typeof robotId_1 === "string" && robotId_1 !== "") {
    newSimulationInfo.robots.push({ id: parseInt(robotId_1) });
  }

  const robotId_2 = data.get("select-robot-2");
  if (typeof robotId_2 === "string" && robotId_2 !== "") {
    newSimulationInfo.robots.push({ id: parseInt(robotId_2) });
  }

  const robotId_3 = data.get("select-robot-3");
  if (typeof robotId_3 === "string" && robotId_3 !== "") {
    newSimulationInfo.robots.push({ id: parseInt(robotId_3) });
  }

  const robotId_4 = data.get("select-robot-4");
  if (typeof robotId_4 === "string" && robotId_4 !== "") {
    newSimulationInfo.robots.push({ id: parseInt(robotId_4) });
  }

  const access_token: string | null = localStorage.getItem("access_token");
  const simulationResult: Promise<simulationResult> = newSimulationAPI(
    newSimulationInfo,
    access_token
  );

  simulationResult.then((result) => {
    setSimulationResult(result);
  });
}

// Regex of input validation (in string because `pattern` requires a string)
export const rounds_amount_regex: string = "^([1-9][0-9]{0,3}|10000)$";

export function SimulationForm(
  setSimulationResult: React.Dispatch<
    React.SetStateAction<simulationResult | null>
  >
): JSX.Element {
  return (
    <Container data-testid="newSimulation">
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          onSubmit_newSimulation(setSimulationResult, event);
        }}
      >
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
        <ListOfRobots name="select-robot-1" label="Robot 1" />
        <ListOfRobots name="select-robot-2" label="Robot 2" />
        <ListOfRobots name="select-robot-3" label="Robot 3" />
        <ListOfRobots name="select-robot-4" label="Robot 4" />
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
          Nueva simulación
        </Button>
      </Box>
    </Container>
  );
}

function NewSimulation(): JSX.Element {
  const [simulationResult, setSimulationResult] =
    useState<simulationResult | null>(null);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {simulationResult === null ? (
        <div className="bg-image">
          <div className="form">
            <h1>Nueva simulación</h1>
            {SimulationForm(setSimulationResult)}
          </div>
        </div>
      ) : (
        <Board simulation={simulationResult} />
      )}
    </div>
  );
}

export default NewSimulation;
