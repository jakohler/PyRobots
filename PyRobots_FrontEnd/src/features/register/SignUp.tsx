import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

import { signUpApi } from "./SignUpApi";
import { isValidEmail, isValidPassword, isValidUserName } from "./SignUpUtils";
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

export default function SignUp(): JSX.Element {
  const [errEmail, setErrEmail] = useState(true);
  const [errUser, setErrUser] = useState(true);
  const [errPass, setErrPass] = useState(true);
  const [errPassConfirm, setErrPassConfirm] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fun: Function
  ) => {
    return event.target.value !== "" && fun(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
      Los datos del formulario nunca devuelven null por lo tanto no hace falta chequearlo, si devuelven cadena " " pero esto lo revisa el isValid.. de cualquier manera
    */
    const data = new FormData(event.currentTarget);
    if (
      isValidUserName(data.get("username")?.toString()!) &&
      isValidPassword(data.get("password")?.toString()!) &&
      isValidEmail(data.get("email")?.toString()!)
    ) {
      if (data.get("confirmPassword") === data.get("password")) {
        signUpApi(data, navigate);
      } else {
        swal.fire({
          title: "Error",
          text: "Las contraseñas deben coincidir",
          icon: "error",
          confirmButtonColor: pageColor,
        });
      }
    }
  };

  return (
    <div>
      {localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("access_token") ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
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
              Registrarse
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-userName"
                    name="username"
                    required
                    fullWidth
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => setErrUser(handleChange(event, isValidUserName))}
                    data-testid="user"
                    id="userName"
                    label="Usuario"
                    error={!errUser}
                    autoFocus
                    helperText={
                      !errUser
                        ? "Tamaño válido mínimo 6 y máximo 12 caracteres."
                        : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => setErrEmail(handleChange(event, isValidEmail))}
                    id="email"
                    label="Direccion De Email"
                    name="email"
                    autoComplete="email"
                    data-testid="email"
                    error={!errEmail}
                    helperText={
                      !errEmail
                        ? "Email Invalido formato something@example.com"
                        : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => setErrPass(handleChange(event, isValidPassword))}
                    data-testid="pass"
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="nueva-password"
                    error={!errPass}
                    helperText={
                      !errPass
                        ? "Contraseña Invalida, Verifique si la password tiene al menos 8 caracteres," +
                          "una mayúscula, una minúscula, y un número. Puede agregar un símbolo. Tamaño máximo 16 caracteres."
                        : " "
                    }
                  />
                  <TextField
                    required
                    fullWidth
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) =>
                      setErrPassConfirm(handleChange(event, isValidPassword))
                    }
                    data-testid="passConfirm"
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    type="password"
                    id="confirmPassword"
                    autoComplete="nueva-confirm-password"
                    error={!errPassConfirm}
                    helperText={
                      !errPassConfirm
                        ? "Contraseña Invalida, Verifique si la password tiene al menos 8 caracteres," +
                          "una mayúscula, una minúscula, y un número. Puede agregar un símbolo. Tamaño máximo 16 caracteres."
                        : " "
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                role="button"
                fullWidth
                variant="contained"
                sx={{
                  ...Button_sx,
                  mt: 3,
                  mb: 2,
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" role="link">
                    Ya tienes cuenta? Inicie sesión
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      )}
    </div>
  );
}
