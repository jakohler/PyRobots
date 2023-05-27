import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { isValidPassword } from "../register/SignUpUtils";

export const SendCode = () => {
  const [errPass, setErrPass] = useState(true);
  const [errPassConfirm, setErrPassConfirm] = useState(true);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fun: Function
  ) => {
    return event.target.value !== "" && fun(event.target.value);
  };

  return (
    <Container>
      <TextField
        required
        fullWidth
        onChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
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
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setErrPassConfirm(handleChange(event, isValidPassword))}
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
      <TextField
        margin="normal"
        data-testid="code"
        required
        fullWidth
        id="code"
        label="Código"
        name="code"
        autoComplete="off"
        autoFocus
      />
      <Button
        data-testid="submit"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#43B647",
          "&:hover": {
            backgroundColor: "#43B647",
            boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
          },
        }}
      >
        Cambiar Contraseña
      </Button>
    </Container>
  );
};
