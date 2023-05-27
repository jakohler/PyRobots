import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  CircularProgress,
  createTheme,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../directories/NavBar";
import { callApiFetchInfo } from "./profileApi";
import { userInfo } from "./profileHelper";
import uploadAvatarApi from "./uploadAvatarApi";

const theme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          textAlign: "left",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "120px",
          height: "120px",
          margin: "40px 40px 10px 40px",
        },
      },
    },
  },
});

export function ButtonChangeAvatar(): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatarImage = document.getElementById("user-image")
      ?.childNodes[0] as HTMLImageElement | null;
    const file: File | null | undefined = e.target.files?.item(0);
    if (file !== null && file !== undefined) {
      const imageUpload: string = URL.createObjectURL(file);
      if (avatarImage !== null) {
        const avatar: FormData = new FormData();
        avatar.append("new_avatar", file);
        uploadAvatarApi(avatar);
        avatarImage!.src = imageUpload;
      }
    }
  };

  return (
    <div className="div-image">
      <p className="botton-text">Cargar una foto </p>
      <input
        data-testid="input-file"
        name="avatar-user"
        onChange={handleChange}
        className="input-avatar"
        type="file"
      />
    </div>
  );
}

export const ProfileInfo = ( {name, email, avatar_img, avatar_name} : userInfo) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/changePassword", { replace: true });
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid
        item
        xs={6}
        sx={{
          borderRadius: "5px",
        }}
      >
        <Grid container>
          <Grid item xs="auto">
            <Avatar
              variant="rounded"
              id="user-image"
              alt="User Avatar"
              src={`data:image/${avatar_name.split(".")[1]};base64,${
                avatar_img.split("'")[1].split("'")[0]
              }`}
            />
            <ButtonChangeAvatar />
          </Grid>
          <Grid item xs="auto" sx={{ margin: "auto" }}>
            <Typography variant="h3" sx={{ margin: "auto" }}>
              Hola {name}!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ marginLeft: "50px", color: "#737373" }}
            >
              INFORMACIÓN DE CUENTA
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={12}>
            <Stack
              spacing={1}
              divider={<Divider variant="middle" />}
              sx={{ margin: "20px 50px 0 50px" }}
            >
              <Typography>
                Nombre de usuario: <strong>{name}</strong>
              </Typography>
              <Typography>
                Dirección de correo: <strong>{email}</strong>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ marginTop: "20px", marginLeft: "50px", color: "#737373" }}
            >
              OPCIONES DE CONFIGURACIÓN
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={12}>
            <Stack
              spacing={1}
              divider={<Divider variant="middle" />}
              sx={{ margin: "10px 50px 0 50px" }}
            >
              <Typography>
                <Link onClick={handleClick} underline="hover">
                  Cambiar contraseña
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

const Profile = () => {
  const access_token = localStorage.getItem("access_token")?.toString();
  const [loading, setLoading] = useState<boolean>(true);
  const initUser: userInfo = {
    name: "",
    email: "",
    avatar_name: "",
    avatar_img: ""
  }
  const [info, setInfo] = useState<userInfo>(initUser);

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
    <ThemeProvider theme={theme}>
      <NavBar />
      <ProfileInfo avatar_name={info.avatar_name} avatar_img={info.avatar_img} email={info.email} name={info.name} />
    </ThemeProvider>
  );
};

export default Profile;
