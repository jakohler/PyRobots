import swal from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";

export function launchGameApi(roomId: string, access_token: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(`game/${roomId.toString()}/start`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {})
      .catch(function (error: any) {
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

export function callApiLaunchApi(roomId: string): void {
  launchGameApi(roomId, localStorage.getItem("access_token")?.toString()!);
}
