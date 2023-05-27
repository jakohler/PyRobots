import swal from "sweetalert2";

import axios from "../../api/axios";
import { pageColor } from "../Style";
import { ListPlayerMatch, PlayerMatch } from "../joinGame/JoinGame";

export type ListMatchesFilter = {
  game_name?: string;
  game_creation_date?: string; // Formato "año-mes-díaT__:__:__Z" donde los __ son de hora, minuto y segundo, pero no se usan
  created_by_user?: boolean;
  only_private?: boolean; // En true solo devuelve las privadas, en false solo las publicas y si no todas
};

export type Match = {
  _id: number;
  _name: string;
  _rounds: number;
  _games: number;
  _max_players: number;
  _min_players: number;
  _websocketurl: string;
  _current_players: number;
  _creator: string;
  _players: ListPlayerMatch;
  _creation_date: string; // Formato "año-mes-día hora:minuto:segundo"
  _password: string; // No es la contraseña real, si no un hash irreversible
  _private: boolean;
  _gameStatus: number;
  _status: string;
};

export type ListMatch = Array<Match>;

async function listMatchesApi(
  filters: ListMatchesFilter,
  access_token: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post("game/list", filters, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return resolve(response.data);
      })
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

export function callApiListMatch(
  filters: ListMatchesFilter,
  setMatches: Function
): void {
  const promise1 = Promise.resolve(
    listMatchesApi(filters, localStorage.getItem("access_token")?.toString()!)
  );
  promise1.then((value) => {
    setMatches(
      JSON.parse(value).map((match: Match) => {
        if (
          match._players
            .map((elem: PlayerMatch) => {
              return (
                elem.player === localStorage.getItem("username")?.toString()!
              );
            })
            .includes(true)
        ) {
          return { ...match, _status: "joined" };
        } else {
          if (match._current_players === match._max_players) {
            return { ...match, _status: "full" };
          } else return { ...match, _status: "notJoined" };
        }
      })
    );
  });
}
