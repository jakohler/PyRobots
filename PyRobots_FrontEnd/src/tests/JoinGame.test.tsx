import { joinGame } from "../features/joinGame/JoinGame";
import { ListMatch, Match } from "../features/listMatches/ListMatchesApi";

describe("Test a funcion joinGame", () => {
  test("Prueba si modifica el estado a joined", () => {
    let actualMatch: Match | null = null;
    let isCreator: boolean = false;
    let showLobby: boolean = false;
    let matches: ListMatch = [];
    const userName = "soyunuser";
    const setActualMatch = (match: Match) => {
      actualMatch = match;
    };
    const setIsCreator = (value: boolean) => {
      isCreator = value;
    };
    const setShowLobby = (value: boolean) => {
      showLobby = value;
    };
    const setMatches = (listMatches: ListMatch) => {
      matches = listMatches;
    };
    const data = {
      row: {
        id: 1,
        _current_players: 1,
        _max_players: 4,
        _status: "notJoined",
      },
    };
    const match: Match = {
      _id: 1,
      _name: "hola",
      _rounds: 200,
      _games: 10000,
      _max_players: 4,
      _min_players: 2,
      _websocketurl: "/game/lobby/1",
      _current_players: 1,
      _creator: "test",
      _players: [{ player: "test", robot: "hola" }],
      _creation_date: "",
      _password: "",
      _private: false,
      _gameStatus: 0,
      _status: "notJoined",
    };
    setMatches([match]);
    const expectedMatch: Match = {
      _id: 1,
      _name: "hola",
      _rounds: 200,
      _games: 10000,
      _max_players: 4,
      _min_players: 2,
      _websocketurl: "/game/lobby/1",
      _current_players: 2,
      _creator: "test",
      _players: [{ player: "test", robot: "hola" }],
      _creation_date: "",
      _password: "",
      _private: false,
      _gameStatus: 0,
      _status: "joined",
    };
    const expectedListMatch: ListMatch = [expectedMatch];

    joinGame(
      data,
      setActualMatch,
      setIsCreator,
      setMatches,
      userName,
      setShowLobby,
      matches
    );

    expect(isCreator).toBeFalsy();
    expect(showLobby).toBeTruthy();
    expect(matches).toStrictEqual(expectedListMatch);
    expect(actualMatch).toStrictEqual(expectedMatch);
  });
  test("Prueba si modifica el estado a full", () => {
    let actualMatch: Match | null = null;
    let isCreator: boolean = false;
    let showLobby: boolean = false;
    let matches: ListMatch = [];
    const userName = "soyunuser";
    const setActualMatch = (match: Match) => {
      actualMatch = match;
    };
    const setIsCreator = (value: boolean) => {
      isCreator = value;
    };
    const setShowLobby = (value: boolean) => {
      showLobby = value;
    };
    const setMatches = (listMatches: ListMatch) => {
      matches = listMatches;
    };
    const data = {
      row: {
        id: 1,
        _current_players: 2,
        _max_players: 2,
        _status: "notJoined",
      },
    };
    const match: Match = {
      _id: 1,
      _name: "hola",
      _rounds: 200,
      _games: 10000,
      _max_players: 2,
      _min_players: 2,
      _websocketurl: "/game/lobby/1",
      _current_players: 2,
      _creator: "test",
      _players: [
        { player: "test", robot: "soyunrobot" },
        { player: "hola", robot: "soyunrobot" },
      ],
      _creation_date: "",
      _password: "",
      _private: false,
      _gameStatus: 0,
      _status: "notJoined",
    };
    setMatches([match]);
    const expectedMatch: Match = {
      _id: 1,
      _name: "hola",
      _rounds: 200,
      _games: 10000,
      _max_players: 2,
      _min_players: 2,
      _websocketurl: "/game/lobby/1",
      _current_players: 2,
      _creator: "test",
      _players: [
        { player: "test", robot: "soyunrobot" },
        { player: "hola", robot: "soyunrobot" },
      ],
      _creation_date: "",
      _password: "",
      _private: false,
      _gameStatus: 0,
      _status: "full",
    };
    const expectedListMatch: ListMatch = [expectedMatch];

    joinGame(
      data,
      setActualMatch,
      setIsCreator,
      setMatches,
      userName,
      setShowLobby,
      matches
    );

    expect(isCreator).toBeFalsy();
    expect(showLobby).toBeFalsy();
    expect(matches).toStrictEqual(expectedListMatch);
    expect(actualMatch).toStrictEqual(expectedMatch);
  });
});
