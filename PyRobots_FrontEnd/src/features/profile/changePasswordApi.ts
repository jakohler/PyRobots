import swal from "sweetalert2";

import axios from "../../api/axios";
import { passwordInfo } from "./passwordHelpers";

export function changePasswordApi(passwordObject: passwordInfo, navigate: Function): void {
  const access_token = localStorage.getItem("access_token");
  axios
    .put("user/password", passwordObject, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        swal.fire({
          title: res.data,
          icon: "success",
          confirmButtonColor: "#43B647",
        });
        navigate("/profile", { replace: true });
      }
    })
    .catch((err) => {
      swal.fire({
        title: "Error",
        text: err.response.data.detail,
        icon: "error",
        confirmButtonColor: "#43B647",
      });
    });
}

export default changePasswordApi;
