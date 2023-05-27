import {
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import { Robot } from "../joinGame/JoinGame";
import { Button_sx, pageColor } from "../Style";

type ModalProps = {
  open: boolean;
  handleSubmitJoin: React.FormEventHandler<HTMLFormElement> | undefined;
  robotIndex: string;
  handleChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
  handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  arrRobot: Robot[];
};

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white !important",
  border: `2px solid ${pageColor}`,
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalList = ({
  open,
  handleSubmitJoin,
  robotIndex,
  handleChange,
  handleClose,
  arrRobot,
}: ModalProps) => {
  return (
    <Modal data-testid="modal" hideBackdrop open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmitJoin}
        noValidate
        sx={{ ...modalStyle, width: 400 }}
      >
        <TextField
          margin="normal"
          data-testid="passJoin"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="off"
          sx={{ width: 350 }}
        ></TextField>
        <Container sx={{ textAlign: "center" }}>
          <h3> Elija el robot que quiera usar </h3>
        </Container>
        <Select
          data-testid="selectJoin"
          value={robotIndex}
          label="Robots"
          sx={{ width: 350 }}
          onChange={handleChange}
        >
          <MenuItem value="" />
          {arrRobot.map((elem: Robot, key) => {
            return (
              <MenuItem key={key} value={`${key}`}>
                {elem.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          fullWidth
          variant="contained"
          sx={{
            ...Button_sx,
            mt: 3,
            mb: 2,
            width: 350,
          }}
          onClick={handleClose}
        >
          {" "}
          Cancelar
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            ...Button_sx,
            mt: 3,
            mb: 2,
            width: 350,
          }}
        >
          Unirse
        </Button>
      </Box>
    </Modal>
  );
};
