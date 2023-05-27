import swal from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";

export function signUpApi(formData: FormData, navigate: Function): void {
  axios
    .post("users/register", formData)
    .then((res) => {
      if (res.status === 201) {
        swal.fire({
          title: res.data[0],
          icon: "success",
          confirmButtonColor: pageColor,
        });
        navigate("/login", { replace: true });
      }
    })
    .catch((err) => {
      swal.fire({
        title: "Error",
        text: err.response.data.detail,
        icon: "error",
        confirmButtonColor: pageColor,
      });
    });
}
