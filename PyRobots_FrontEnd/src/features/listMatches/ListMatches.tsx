import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { CssBaseline, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import swal from "sweetalert2";

import NavBar from "../directories/NavBar";
import { Lobby } from "../joinGame/Lobby";
import { joinGame, PlayerJoinMatch, Robot } from "../joinGame/JoinGame";
import { JoinGameApi } from "../joinGame/JoinGameApi";
import { Match } from "./ListMatchesApi";
import { MatchesDataGrid } from "./MatchesDataGrid";
import { ModalList } from "./ModalList";
import { ListMatch, callApiListMatch } from "./ListMatchesApi";
import { callApiListRobot } from "../robotApi/ListRobotApi";
import { pageColor } from "../Style";

import "../directories/Home.css";

export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  const [open, setOpen] = useState(false);
  const [showLobby, setShowLobby] = useState(false);
  const [actualMatch, setActualMatch] = useState<Match | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [robotIndex, setRobotIndex] = useState("");
  const [arrRobot, setArrRobot] = useState<Robot[]>([]);
  const [row, setRow] = useState<any>({});
  const [error, setError] = useState("");
  const handleSubmitJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (row.status !== "joined") {
      if (robotIndex !== "") {
        if (arrRobot[+robotIndex]) {
          const player: PlayerJoinMatch = {
            game_id: row.id,
            robot: arrRobot[+robotIndex].id,
            password: data.get("password")?.toString()!,
          };
          setError(
            await JoinGameApi(
              player,
              localStorage.getItem("access_token")?.toString()!,
              handleClose
            )
          );
        }
      } else {
        handleClose();
        swal.fire(
          "Error",
          "Debe elegir un robot o crear uno si no lo tiene",
          "warning"
        );
      }
    }
  };

  useEffect(() => {
    if (error === "Not Error") {
      handleClose();
      setError("");
      joinGame(
        row,
        setActualMatch,
        setIsCreator,
        setMatches,
        localStorage.getItem("username")?.toString()!,
        setShowLobby,
        matches
      );
    }
  }, [error, showLobby, matches, row, arrRobot, robotIndex]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setRobotIndex(e.target.value as string);
  };

  useEffect(() => {
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmitMatches = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
  };

  return (
    <div>
      <NavBar />
      <div className="bg-image">
        <Container component="main">
          <CssBaseline />
          <Box
            component="form"
            data-testid="formList"
            onSubmit={handleSubmitMatches}
            noValidate
            id="my-form"
          />
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 20,
          }}
        >
          {matches.length > 0 && !showLobby ? (
            <Box
              sx={{
                height: "60vh",
                width: 1250,
                maxWidth: "90vw",
                bgcolor: "background.paper",
                borderRadius: "10px",
                border: "solid 2px",
                borderColor: pageColor,
                "& .columnClass": {
                  backgroundColor: pageColor,
                },
                "& .joined": {
                  backgroundColor: "#9BD87A",
                },
                "& .notJoined": {
                  backgroundColor: "white",
                },
                "& .full": {
                  backgroundColor: "#EF4040",
                },
              }}
            >
              <MatchesDataGrid
                matches={matches}
                setRow={setRow}
                arrRobot={arrRobot}
                robotIndex={robotIndex}
                setActualMatch={setActualMatch}
                setIsCreator={setIsCreator}
                setMatches={setMatches}
                setShowLobby={setShowLobby}
                handleOpen={handleOpen}
              />
              <Container>
                <ModalList
                  open={open}
                  handleSubmitJoin={handleSubmitJoin}
                  robotIndex={robotIndex}
                  handleChange={handleChange}
                  handleClose={handleClose}
                  arrRobot={arrRobot}
                />
              </Container>
            </Box>
          ) : showLobby && actualMatch ? (
            <Lobby
              myKey={0}
              setShowLobby={setShowLobby}
              roomId={actualMatch?._id.toString()}
              isCreator={isCreator}
              setMatches={setMatches}
              roomUrl={actualMatch?._websocketurl}
            />
          ) : (
            <div />
          )}
        </Container>
      </div>
    </div>
  );
}
