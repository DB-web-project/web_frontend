import {request} from "./api"

export async function cartReq(method,params) {
  const url = '/api/cart'
  return request(url,method,params)
}