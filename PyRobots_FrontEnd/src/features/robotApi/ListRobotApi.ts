import axios from "../../api/axios";
import swal from "sweetalert2";
import { pageColor } from "../Style";

export function listRobotApi(access_token: string | null): Promise<void> {
  return new Promise((resolve, reject) => {
    axios
      .get("robot/list", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return resolve(response.data);
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

export function callApiListRobot(setArrRobot: Function): void {
  const promise1 = Promise.resolve(
    listRobotApi(localStorage.getItem("access_token")?.toString()!)
  );
  promise1.then((value) => {
    setArrRobot(value);
  });
}
