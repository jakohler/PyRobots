import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React from "react";
import { useState, useEffect } from "react";
import swal from "sweetalert2";
import axios from "../../api/axios";
import NavBar from "../directories/NavBar";
import {
  modalState,
  indexAndCurrentResult,
  gameResults,
  player,
  resultForCards,
  searchName,
} from "./resultsHelpers";
import { pageColor } from "../Style";

const ModalState = React.createContext<modalState>({
  modal: false,
  setModal: () => {},
});

const Stats = ({ currentResult, idStats }: indexAndCurrentResult) => {
  const { modal } = React.useContext(ModalState);
  const { setModal } = React.useContext(ModalState);
  const result = currentResult[idStats];

  const infoGame =
    currentResult.length > 0 ? (
      <div>
        <Typography variant="h5">Configuración de partida </Typography>
        <Stack divider={<Divider />}>
          <Typography>
            <strong>Nombre de la partida:</strong> {result.name}
          </Typography>
          <Typography>
            <strong>Jugadores:</strong> {result.players.length}
          </Typography>
          <Typography>
            <strong>Cantidad de juegos:</strong> {result.games}
          </Typography>
          <Typography>
            <strong>Cantidad de rondas:</strong> {result.rounds}
          </Typography>
          <Typography>
            <strong>Privada:</strong> {result.is_private.toString()}
          </Typography>
        </Stack>
      </div>
    ) : (
      <div> </div>
    );

  const winner =
    currentResult.length > 0 ? (
      result.winners.length > 1 ? (
        <div> </div>
      ) : (
        <div>
          <Typography variant="h5">Ganador </Typography>
          <Stack divider={<Divider />}>
            <Typography>
              <strong>Nombre del robot:</strong> {result.winners[0].robot}
            </Typography>
            <Typography>
              <strong>Usuario:</strong> {result.winners[0].player}
            </Typography>
          </Stack>
        </div>
      )
    ) : (
      <div> </div>
    );

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Modal open={modal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {infoGame}
          {winner}
          <Button
            variant="outlined"
            onClick={() => setModal(false)}
            color="error"
            sx={{ width: "100%", color: "#BF0F0F", mt: "10px" }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export const ResultCard = ({
  result,
  resultOfGame,
  index,
  setIdStats,
}: resultForCards) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModal(true);
    const id = event.currentTarget.id;
    if (typeof id === "string") {
      setIdStats(parseInt(id));
    }
  };

  const backgroundColor =
    resultOfGame === "GANASTE"
      ? "rgb(46, 165, 46, 0.1)"
      : resultOfGame === "PERDISTE"
      ? "rgba(100,0,0,0.05)"
      : "rgba(243, 255, 53, 0.15)";
  const shadowColor =
    resultOfGame === "GANASTE"
      ? "#93D696"
      : resultOfGame === "PERDISTE"
      ? "#D38787"
      : "#EAD99D";
  const borderColor =
    resultOfGame === "GANASTE"
      ? "#2EA52E"
      : resultOfGame === "PERDISTE"
      ? "#BF0F0F"
      : "#C4CE00";

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: backgroundColor,
        boxShadow: 6,
        border: "2px solid " + borderColor,
        "&:hover": { boxShadow: "0rem 0.5rem 1rem " + shadowColor },
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: borderColor }}>
          {resultOfGame}
        </Typography>
        <Typography>
          <strong>Robot usado:</strong>{" "}
          {result.players.find((element: player) => searchName(element))!.robot}
        </Typography>
        <Typography>
          <strong>Nombre de partida:</strong> {result.name}
        </Typography>
        <Typography>
          <strong>Fecha de creación:</strong> {result.creation_date}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            id={index.toString()}
            sx={{
              width: "100%",
              backgroundColor: borderColor,
              "&:hover": { backgroundColor: borderColor },
            }}
          >
            Estadísticas
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const HistoryResults = () => {
  const [modal, setModal] = useState<boolean>(false);

  const [results, setResults] = useState<Array<gameResults>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage] = useState<number>(25);
  const [idStats, setIdStats] = useState<number>(0);
  const access_token = localStorage.getItem("access_token")?.toString();

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      await axios
        .get("game/results", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(function (error) {
          swal.fire({
            title: "Error",
            text: error.response.data.detail,
            icon: "error",
            confirmButtonColor: pageColor,
          });
          if (error.response.status === 401) {
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get current results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResult = results.slice(indexOfFirstResult, indexOfLastResult);
  return loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <div>
      <NavBar />
      <ModalState.Provider value={{ modal, setModal }}>
        {currentResult.length > 0 ? (
          <div>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              {currentResult.map((result: gameResults, index: number) => (
                <Grid key={index}>
                  {result.winners.length > 1 &&
                  result.winners.find((element: player) =>
                    searchName(element)
                  ) ? (
                    <ResultCard
                      resultOfGame="EMPATASTE"
                      index={index}
                      setIdStats={setIdStats}
                      result={result}
                    />
                  ) : result.winners.length === 1 &&
                    result.winners.find((element: player) =>
                      searchName(element)
                    ) ? (
                    <ResultCard
                      resultOfGame="GANASTE"
                      index={index}
                      setIdStats={setIdStats}
                      result={result}
                    />
                  ) : (
                    <ResultCard
                      resultOfGame="PERDISTE"
                      index={index}
                      setIdStats={setIdStats}
                      result={result}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              variant="outlined"
              onChange={handleChange}
              count={Math.ceil(results.length / resultsPerPage)}
            />
          </div>
        ) : (
          <Typography variant="h5" sx={{ mt: "15px" }}>
            No has jugado partidas aún.
          </Typography>
        )}
        <Stats idStats={idStats} currentResult={currentResult} />
      </ModalState.Provider>
    </div>
  );
};

export default HistoryResults;
