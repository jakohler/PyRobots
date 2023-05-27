import swal from "sweetalert2";

import axios from "../../api/axios";

export function getCodeApi(username: string) {
  const params = { username: username };
  return new Promise((resolve, reject) => {
    axios
      .get(`/pass-recovery`, { params })
      .then((response) => {
        console.log(response);
        swal.fire({
          title: response.data,
          icon: "success",
          confirmButtonColor: "#43B647",
        });
        return resolve("Not Error");
      })
      .catch(function (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          swal.fire({
            title: "Error",
            text: error.response.data.detail,
            icon: "error",
            confirmButtonColor: "#43B647",
          });
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          return resolve(error.response.data.detail);
        }
      });
  });
}

export type userPassRecover = {
  username: string;
  code: string;
  password: string;
};
export function sendCodeAndPasswordApi(
  user: userPassRecover,
  navigate: Function
) {
  console.log(user);
  return new Promise((resolve, reject) => {
    axios
      .put(`/pass-change`, user)
      .then((response) => {
        console.log(response);
        console.log(user);
        swal.fire({
          title: response.data,
          icon: "success",
          confirmButtonColor: "#43B647",
        });
        navigate("/login", { replace: true });
      })
      .catch(function (error: any) {
        console.log(error);
        swal.fire({
          title: "Error",
          text: error.response.data.detail,
          icon: "error",
          confirmButtonColor: "#43B647",
        });
        if (error.response.status === 401) {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          return resolve(error.response.data.detail);
        }
      });
  });
}

export function callApiGetCode(username: string, setEmailSent: Function): void {
  const promise1 = Promise.resolve(getCodeApi(username));
  promise1.then((value) => {
    setEmailSent(value === "Not Error");
  });
}
