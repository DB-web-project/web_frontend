import {request,fileRequest} from "./api"


export async function registerReq(method,params) {
  const url = '/api/register'
  return request(url,method,params)
}

export async function loginReq(method,params) {
  const url = '/api/login'
  return request(url,method,params)
}

export async function userIdReq(method,params,id) {
  const url = `/api/user/${id}`
  return request(url,method,params)
}

export async function changePasswordReq(method, params, id) {
  const url = `/api/user/password/${id}`;
  return request(url, method, params);
}

export async function changeUsernameReq(method, params, id) {
  const url = `/api/user/username/${id}`;
  return request(url, method, params);
}

export async function changeEmail(method, params, id) {
  const url = `/api/user/email/${id}`;
  return request(url, method, params);
}

export async function changeAvatar(method, params, id) {
  const url = `/api/user/avatar/${id}`;
  return fileRequest(url, method, params)
}

export async function userListReq(method, params) {
  const url = `/api/userList`;
  return fileRequest(url, method, params)
}

export async function userBanReq(method, params) {
  const url = `/api/banUser`;
  return fileRequest(url, method, params)
}
