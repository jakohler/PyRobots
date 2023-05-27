import swal from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";

export type Robot = {
  robot_id: number;
  robot_name: string;
  gamesPlayed: number;
  wins: number;
  tied: number;
  losses: number;
  avatar_name: string;
  avatar_img: string;
};

export type ListRobots = Robot[];

export const robotsStatsApi = (
  access_token: string,
  setLoading: Function
): Promise<ListRobots> => {
  setLoading(false);
  return new Promise((resolve, reject) => {
    axios
      .get("/robot/statistics", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
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
};

export function callApiRobotsStats(
  setArrRobot: Function,
  setLoading: Function
): void {
  const promise1 = Promise.resolve(
    robotsStatsApi(
      localStorage.getItem("access_token")?.toString()!,
      setLoading
    )
  );
  promise1
    .then((value) => {
      setLoading(false);
      setArrRobot(value);
    })
    .catch((err) => {
      console.log(err);
    });
}
