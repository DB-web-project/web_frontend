import {request} from "./api"

export async function boardReq(method, params) {
  const url = `/api/broadcast`;
  return request(url, method, params);
}

export async function boardPost(method, params, id) {
  const url = `/api/broadcast/${id}`;
  return request(url, method, params);
}
