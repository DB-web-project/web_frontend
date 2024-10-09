import {request} from "./api"

export async function reportReq(method, params) {
  const url = `/api/complaint`;
  return request(url, method, params);
}
