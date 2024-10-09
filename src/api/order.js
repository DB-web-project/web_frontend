import {request} from "./api"

export async function orderReq(method,params) {
  const url = '/api/order'
  return request(url,method,params)
}