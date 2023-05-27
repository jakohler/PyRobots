import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export const SendEmail = () => {
  return (
    <Container>
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
        Enviar Código
      </Button>
    </Container>
  );
};
