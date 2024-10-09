import {request} from "./api"

export async function tagReq(method,params) {
  const url = '/api/tag'
  return request(url,method,params)
}

