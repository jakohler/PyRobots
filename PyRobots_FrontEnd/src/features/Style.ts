import { SxProps, Theme } from "@mui/material";

export const pageColor: string = "#43B647";

export const Button_sx: SxProps<Theme> = {
  backgroundColor: pageColor,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: pageColor,
    boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
  },
};
