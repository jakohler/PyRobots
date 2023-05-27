import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { useState } from "react";
import { isValidPassword } from "../register/SignUpUtils";
import swal from "sweetalert2";
import changePasswordApi from "./changePasswordApi";
import { passwordInfo } from "./passwordHelpers";
import { useNavigate } from "react-router-dom";
import NavBar from "../directories/NavBar";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          margin: "0 auto",
        },
      },
    },
  },
});

export const FormChangePassword = () => {
  const [errPass, setErrPass] = useState<boolean>(true);
  const [errNewPass, setErrNewPass] = useState<boolean>(true);
  const [errConfPass, setErrConfPass] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwords = new FormData(event.currentTarget);
    if (isValidPassword(passwords.get("new_password")?.toString()!)) {
      if (passwords.get("new_password") === passwords.get("confirmPassword")) {
        passwords.delete("confirmPassword");
        const passwordObject = Object.fromEntries(
          passwords.entries()
        ) as passwordInfo;
        changePasswordApi(passwordObject, navigate);
      } else {
        swal.fire({
          title: "Error",
          text: "Las contraseñas deben coincidir",
          icon: "error",
          confirmButtonColor: "#43B647",
        });
      }
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    return event.target.value !== "" && isValidPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ width: "25%" }}
      mb={10}
    >
      <Stack spacing={1}>
        <Avatar>
          <PasswordIcon data-testid="icon-pass"/>
        </Avatar>
        <Typography variant="h5" sx={{ padding: "10px" }}>
          Cambiar contraseña
        </Typography>
        <TextField
          name="old_password"
          label="Contraseña actual"
          type="password"
          data-testid="actual-pass"
          required
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setErrPass(handleChange(event))}
          error={!errPass}
          helperText={
            !errPass
              ? "Recuerde que la contraseña debe tener al menos 8 caracteres y a lo sumo 16 " +
                "una mayúscula, una minúscula, y un número. Podría contener un símbolo."
              : " "
          }
        />
        <TextField
          name="new_password"
          label="Nueva contraseña"
          required
          type="password"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setErrNewPass(handleChange(event))}
          error={!errNewPass}
          helperText={
            !errNewPass
              ? "Contraseña Invalida, Verifique si la password tiene al menos 8 caracteres," +
                "una mayúscula, una minúscula, y un número. Puede agregar un símbolo. Tamaño máximo 16 caracteres."
              : " "
          }
        />
        <TextField
          name="confirmPassword"
          label="Confirmar nueva contraseña"
          required
          type="password"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setErrConfPass(handleChange(event))}
          error={!errConfPass}
          helperText={
            !errConfPass
              ? "Contraseña Invalida, Verifique si la password tiene al menos 8 caracteres," +
                "una mayúscula, una minúscula, y un número. Puede agregar un símbolo. Tamaño máximo 16 caracteres."
              : " "
          }
        />
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Stack>
    </Box>
  );
};

const ChangePassword = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <FormChangePassword />
      </Box>
    </ThemeProvider>
  );
};

export default ChangePassword;
