import swal from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";

export function leaveMatchApi(roomId: string, access_token: string | null) {
  axios
    .post(
      `game/${roomId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      swal.fire({
        title: response.data.msg,
        icon: "success",
        confirmButtonColor: pageColor,
      });
    })
    .catch(function (error) {
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
}
