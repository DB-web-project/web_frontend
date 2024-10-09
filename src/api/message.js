import {request} from "./api"

export async function buyMessageConfirmReq(method, params, id) {
  const url = `/api/notification/deal/${id}`;
  return request(url, method, params);
}

export async function buyMessageReq(method, params) {
  const url = `/api/notification/deal`;
  return request(url, method, params);
}

export async function commentMessageReq(method, params) {
  const url = `/api/notification/reply`;
  return request(url, method, params);
}

export async function openCommentMessageReq(method, params, id) {
  const url = `/api/notification/reply/${id}`;
  return request(url, method, params);
}

export async function openBuyMessageReq(method, params, id) {
  const url = `/api/notification/purchase/${id}`;
  return request(url, method, params);
}


export async function hasEmailReq(method, params) {
  const url = `/api/notification/hasEamil`;
  return request(url, method, params);
}
