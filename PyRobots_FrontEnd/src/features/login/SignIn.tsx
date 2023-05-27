import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";

import axios, { setToken } from "../../api/axios";
import { Button_sx, pageColor } from "../Style";

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        pyrobots.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post("token", data, {});
      const username = data.get("username");
      const password = data.get("password");
      const access_token = response?.data?.access_token;
      setToken(access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("isLoggedIn", "true");
      if (username) {
        localStorage.setItem("username", username?.toString().toLowerCase());
      }
      if (password) {
        localStorage.setItem("password", password?.toString());
      }

      navigate("/", { replace: true });
    } catch (err: any) {
      swal.fire({
        title: "Error",
        text: err.response.data.detail,
        icon: "error",
        confirmButtonColor: pageColor,
      });
    }
  };

  return (
    <div>
      {localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("access_token") ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  data-testid="user"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoComplete="off"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  data-testid="pass"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                />
                <Button
                  data-testid="submit"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    ...Button_sx,
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Iniciar Sesión
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/recoverPassword"
                      variant="body2"
                      data-testid="goToChangePassword"
                    >
                      ¿Olvido la contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/register"
                      variant="body2"
                      data-testid="goToRegister"
                    >
                      {"¿No tienes cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}
