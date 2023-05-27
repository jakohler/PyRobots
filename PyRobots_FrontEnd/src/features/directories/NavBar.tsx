import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInfo } from "../profile/profileHelper";
import { callApiFetchInfo } from "../profile/profileApi";
import { Avatar, CircularProgress, Grid, Menu, MenuItem } from "@mui/material";
import { pageColor } from "../Style";

export default function NavBar(): JSX.Element {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [info, setInfo] = useState<userInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const access_token = localStorage.getItem("access_token")?.toString();
  const settings = ["Perfil", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const navigate = useNavigate();
  const createRobot = () => {
    navigate("/createRobot", { replace: true });
  };
  const executeSimulation = () => {
    navigate("/Simulation", { replace: true });
  };
  const listMatches = () => {
    navigate("/listMatches", { replace: true });
  };
  const createMatch = () => {
    navigate("/newGame", { replace: true });
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  const historyResults = () => {
    navigate("/results", { replace: true });
  };
  const profile = () => {
    navigate("/profile", {  replace: true });
  };
  const robotLibrary = () => {
    navigate("/robotLibrary", { replace:  true  });
  };

  const handleCloseUserMenu = (event : React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (event.currentTarget.innerText === "Perfil") {
      profile();
    } else if (event.currentTarget.innerText === "Logout") {
      logOut();
    };
    setAnchorElUser(null)
  };

  useEffect(() => {
    callApiFetchInfo(access_token, setInfo, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
       
        position="relative"
       
        data-testid="AppBar"
       
        sx={{  backgroundColor:  pageColor  }}
      
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            textAlign="left"
          >
            PyRobots
          </Typography>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => createRobot()}
            data-testid="crearRobot"
          >
            Crear Robot
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => executeSimulation()}
            data-testid="ejecutarSim"
          >
            Simulación
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => createMatch()}
            data-testid="crearPartida"
          >
            Crear Partida
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => listMatches()}
            data-testid="listarPartidas"
          >
            Listar Partidas
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => historyResults()}
          >
            Historial de partidas
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => robotLibrary()}
          >
            Biblioteca de Robots
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={handleOpenUserMenu}
            data-testid="logOut"
          >
            <Avatar
              sx={{ width: "50px", height: "50px", margin: "0" }}
              src={`data:image/${info!.avatar_name.split(".")[1]};base64,${
                info!.avatar_img.split("'")[1].split("'")[0]
              }`}
            />
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={e => handleCloseUserMenu(e)}>
                    {setting}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
