import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarContainer,
  GridRowParams,
  gridClasses,
} from "@mui/x-data-grid";

import { joinGame, Robot } from "../joinGame/JoinGame";
import { ListMatch, Match } from "./ListMatchesApi";
import { Button_sx } from "../Style";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hide: true,
    filterable: false,
  },
  {
    field: "_name",
    headerName: "Nombre",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_rounds",
    headerName: "Rondas",
    headerClassName: "columnClass",
    type: "number",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_games",
    headerName: "Juegos",
    headerClassName: "columnClass",
    type: "number",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_current_players",
    headerName: "Jugadores",
    headerClassName: "columnClass",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_max_players",
    headerName: "Maximos Jugadores",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_min_players",
    headerName: "Minimos Jugadores",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_creator",
    headerName: "Creador",
    headerClassName: "columnClass",
    width: 150,
    editable: false,
    hideable: false,
  },
  {
    field: "_joined",
    headerName: "Joined",
    headerClassName: "columnClass",
    width: 150,
    editable: false,
    hide: true,
    filterable: false,
  },
  {
    field: "_private",
    headerName: "Privado",
    headerClassName: "columnClass",
    width: 100,
    editable: false,
    hideable: false,
  },
];

export const CustomToolBar = (): JSX.Element => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <Button
        type="submit"
        fullWidth
        form="my-form"
        variant="contained"
        data-testid="submit"
        sx={{
          ...Button_sx,
          maxWidth: 100,
          mt: 2,
          mb: 2,
          ml: 2,
        }}
      >
        Refresh
      </Button>
    </GridToolbarContainer>
  );
};

type DataGridProps = {
  matches: ListMatch;
  setRow: (row: GridRowParams<any>) => void;
  handleOpen: () => void;
  arrRobot: Robot[];
  robotIndex: string;
  setActualMatch: React.Dispatch<React.SetStateAction<Match | null>>;
  setIsCreator: React.Dispatch<React.SetStateAction<boolean>>;
  setMatches: React.Dispatch<React.SetStateAction<ListMatch>>;
  setShowLobby: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MatchesDataGrid = ({
  matches,
  setRow,
  arrRobot,
  robotIndex,
  setActualMatch,
  setIsCreator,
  setMatches,
  setShowLobby,
  handleOpen,
}: DataGridProps) => {
  return (
    <DataGrid
      sx={{
        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
          outline: "none",
        },
        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
          {
            outline: "none",
          },
        border: "none",
      }}
      rows={matches
        .filter((elem, index) => elem._gameStatus === 0)
        .map((elem, index) => ({
          id: elem._id,
          _name: elem._name,
          _rounds: elem._rounds,
          _games: elem._games,
          _max_players: elem._max_players,
          _min_players: elem._min_players,
          _creator: elem._creator,
          _current_players: elem._current_players,
          _private: elem._private,
          _status: elem._status,
        }))}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableColumnSelector
      experimentalFeatures={{ newEditingApi: true }}
      getRowClassName={(params) => `${params.row._status}`}
      components={{ Toolbar: CustomToolBar }}
      onRowClick={(row: GridRowParams<any>) => {
        setRow(row);
        if (row.row._status === "joined") {
          joinGame(
            row,
            setActualMatch,
            setIsCreator,
            setMatches,
            localStorage.getItem("username")?.toString()!,
            setShowLobby,
            matches
          );
        } else {
          handleOpen();
        }
      }}
    />
  );
};
