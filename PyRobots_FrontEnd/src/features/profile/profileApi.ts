import axios from "../../api/axios";
import swal from "sweetalert2";

export const fetchInfo = (
  access_token: string | undefined,
  setLoading: Function
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get("/user/info", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return resolve(response.data);
      })
      .catch(function (error) {
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
        }
      });
  });
};

export function callApiFetchInfo(access_token: string | undefined, setInfo: Function, setLoading:Function): void {
  const promise1 = Promise.resolve(
      fetchInfo(access_token, setLoading)
  );
  promise1.then((value) => {
    setLoading(false);
    setInfo(value);
  });
}
