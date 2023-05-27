import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { pageColor } from "../Style";
import { Robot } from "./RobotsStatsApi";

type StatsProps = {
  robot: Robot;
};
export const RobotsAndStats = ({ robot }: StatsProps): JSX.Element => {
  return (
    <Card
      variant="outlined"
      data-testid="card"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        boxShadow: 6,
        border: `2px solid ${pageColor}`,
        "&:hover": { boxShadow: "0rem 0.5rem 1rem" },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Avatar
            alt="Robot"
            data-testid="avatar"
            src={`data:image/${robot.avatar_name.split(".")[1]};base64,${
              robot.avatar_img.split("'")[1].split("'")[0]
            }`}
            sx={{
              height: "150px",
              width: "150px",
              border: "1px solid lightgray",
            }}
          />
        </Box>
        <Typography>
          <strong>Robot: {robot.robot_name}</strong>
        </Typography>
        <Typography>
          <strong>Partidas Ganadas: {robot.wins}</strong>
        </Typography>
        <Typography>
          <strong>Partidas Perdidas: {robot.losses}</strong>
        </Typography>
        <Typography>
          <strong>Partidas Empatadas: {robot.tied}</strong>
        </Typography>
        <Typography>
          <strong>
            Partidas Totales: {robot.losses + robot.wins + robot.tied}
          </strong>
        </Typography>
        <Typography>
          <strong>
            Porcentaje Victorias: {isNaN((robot.wins * 100) / robot.gamesPlayed) ? 0 : (robot.wins * 100) / robot.gamesPlayed}%
          </strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
