import { AxiosResponse } from "axios";

import axios from "../../api/axios";

export type emailValidationInfo = {
  email: string;
  code: string;
};

export type errorResponse = {
  detail: string;
};

export function emailValidationAPI({
  email,
  code,
}: emailValidationInfo): Promise<AxiosResponse<string>> {
  return axios.get(`/validate?email=${email}&code=${code}`);
}
