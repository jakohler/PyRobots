import swal, { SweetAlertResult } from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";

export async function postRobot(
  data: FormData
): Promise<SweetAlertResult<void>> {
  const access_token = localStorage.getItem("access_token")?.toString();

  return new Promise((resolve, reject) => {
    axios
      .post("robots/create", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return resolve(
          swal.fire({
            title: response.data[0],
            icon: "success",
            confirmButtonColor: pageColor,
          })
        );
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
  });
}
