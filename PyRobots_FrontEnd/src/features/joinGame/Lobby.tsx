import { Button, Container, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { callApiLaunchApi } from "./LaunchGameApi";
import { leaveMatchApi } from "./LeaveGameApi";
import { callApiListMatch } from "../listMatches/ListMatchesApi";
import { Button_sx, pageColor } from "../Style";

export type PlayerLobby = {
  player: string;
  robot: string;
  avatar_robot_image: string;
  avatar_robot_name: string;
  avatar_user_image: string;
  avatar_user_name: string;
};
export type ListPlayerLobby = PlayerLobby[];
type PropsLobby = {
  myKey: number;
  setShowLobby: Function;
  isCreator: boolean;
  roomId: string;
  roomUrl: string;
  setMatches: Function;
};

type PropsButtons = {
  setMatches: Function;
  setShowLobby: Function;
  roomId: string;
  isCreator: boolean;
  socket: WebSocket | null;
  disableAbandone: boolean;
};

const Buttons = ({
  setMatches,
  setShowLobby,
  roomId,
  isCreator,
  socket,
  disableAbandone,
}: PropsButtons) => {
  const abandoneGame = () => {
    if (!disableAbandone) {
      Swal.fire({
        title: "Estás seguro de querer abandonar la partida?",
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
        icon: "warning",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */

        if (result.isConfirmed) {
          leaveMatchApi(
            roomId,
            localStorage.getItem("access_token")?.toString()!
          );
          setTimeout(() => {
            callApiListMatch({}, setMatches);
            setShowLobby(false);
            if (socket) {
              socket.close();
            }
          }, 1000);
        }
      });
    } else {
      Swal.fire("Cuidado", "No se puede abandonar", "warning");
    }
  };

  const launchGame = () => {
    callApiLaunchApi(roomId);
  };

  return (
    <Stack direction="row" sx={{ mt: 3 }}>
      <Grid item xs={4}>
        <Button
          onClick={(event) => {
            setTimeout(() => {
              callApiListMatch({}, setMatches);
              setShowLobby(false);
              if (socket) {
                socket.close();
              }
            }, 1000);
          }}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#ECE04A",
            "&:hover": {
              backgroundColor: "#ECE04A",
              boxShadow: "0rem 0.1rem 0.5rem #EEE56D",
            },
          }}
        >
          Ir a listar partidas
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => launchGame()}
          variant="contained"
          sx={{
            ...Button_sx,
            mt: 3,
            mb: 2,
          }}
          disabled={!isCreator}
        >
          Iniciar Partida
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#C72603",
            "&:hover": {
              backgroundColor: "#C72603",
              boxShadow: "0rem 0.1rem 0.5rem #E23D19",
            },
          }}
          disabled={isCreator}
          onClick={() => abandoneGame()}
        >
          Abandonar Partida
        </Button>
      </Grid>
    </Stack>
  );
};

export const Lobby = ({
  myKey,
  setShowLobby,
  isCreator,
  roomId,
  roomUrl,
  setMatches,
}: PropsLobby) => {
  const [playersSocket, setPlayersSocket] = useState<ListPlayerLobby>([]);
  const [serverMessage, setServerMessage] = useState("");
  const [disableAbandone, setDisableAbandone] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000${roomUrl}`);
    ws.current = socket;
    socket.onopen = () => {
      console.log("ws open");
      socket.onmessage = async (event) => {
        const json = JSON.parse(event.data);
        console.log(json);
        if (json.status === 0 || json.status === 1 || json.status === 4) {
          setPlayersSocket(json.players);
          setServerMessage(json.message);
        } else if (json.status === 2 || json.status === 3) {
          setDisableAbandone(true);
          setServerMessage(json.message);
        }
      };
    };
    socket.onclose = () => console.log("ws closed");
    return () => socket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  return (
    <Grid
      key={myKey}
      container
      sx={{
        width: "50vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `2px groove ${pageColor}`,
        borderRadius: "10px",
      }}
    >
      <Grid>
        <Container>
          <Stack spacing={3}>
            {playersSocket.map(
              (player: PlayerLobby, key: number): JSX.Element => {
                return (
                  <Stack
                    direction="row"
                    key={key}
                    sx={{
                      width: "40vw",
                      mt: 5,
                      borderStyle: "double",
                      borderRadius: "10px",
                      borderColor: pageColor,
                    }}
                  >
                    <Grid item xs={3}>
                      <Avatar
                        alt="Player"
                        src={`data:image/${
                          player.avatar_user_name.split(".")[1]
                        };base64,${
                          player.avatar_user_image.split("'")[1].split("'")[0]
                        }`}
                        sx={{
                          height: "100px",
                          width: "100px",
                          border: "10px solid transparent",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6" sx={{ mt: 4 }}>
                        {" "}
                        {player.player}{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar
                        alt="Robot"
                        src={`data:image/${
                          player.avatar_robot_name.split(".")[1]
                        };base64,${
                          player.avatar_robot_image.split("'")[1].split("'")[0]
                        }`}
                        sx={{ height: "100px", width: "100px", ml: 3 }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6" sx={{ mt: 4, ml: 3 }}>
                        {player.robot}{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Stack>
                );
              }
            )}
          </Stack>
          <h4>{serverMessage}</h4>
        </Container>
      </Grid>
      <Buttons
        setMatches={setMatches}
        setShowLobby={setShowLobby}
        roomId={roomId}
        isCreator={isCreator}
        socket={ws.current}
        disableAbandone={disableAbandone}
      ></Buttons>
    </Grid>
  );
};
