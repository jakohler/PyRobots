import swal from "sweetalert2";

import axios from "../../api/axios";
import { PlayerJoinMatch } from "./JoinGame";
import { pageColor } from "../Style";

export function JoinGameApi(
  player: PlayerJoinMatch,
  access_token: string,
  handleClose: Function
): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post(`game/${player.game_id}/join`, player, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        handleClose();
        swal.fire("Se ha unido con éxito", "", "success");
        return resolve("Not Error");
      })
      .catch(function (error: any) {
        if (error.status === 403) {
          return resolve(error.response.data.detail);
        }
        handleClose();
        swal.fire({
          title: "Error",
          text: error.response.data.detail,
          icon: "error",
          confirmButtonColor: pageColor,
        });
        if (error.response.status === 401) {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  });
}
