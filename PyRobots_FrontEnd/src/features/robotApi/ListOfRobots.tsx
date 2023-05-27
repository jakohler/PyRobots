import Grid from "@mui/material/Grid";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useEffect, useState } from "react";

import { callApiListRobot } from "../robotApi/ListRobotApi";
import { Robot } from "../joinGame/JoinGame";

export function ListOfRobots(props: SelectProps<string>): JSX.Element {
  const [arrRobot, setArrRobot] = useState<Robot[]>([]);
  const [robotIndex, setRobotIndex] = useState("");

  useEffect(() => {
    callApiListRobot(setArrRobot);
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    setRobotIndex(e.target.value as string);
  };

  return (
    <Grid>
      <div>
        <h5>Elegir Robot</h5>
        <Select
          sx={{ width: "100%" }}
          value={robotIndex}
          onChange={handleChange}
          {...props}
        >
          <MenuItem value="" />
          {arrRobot.map((elem: Robot, key) => {
            return (
              <MenuItem key={key} value={elem.id}>
                {elem.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </Grid>
  );
}
