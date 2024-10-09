import {request,fileRequest} from "./api"


export async function postsReq(method,params) {
  const url = '/api/post'
  return request(url,method,params)
}

export async function postIdReq(method,params,id) {
  const url = `/api/post/${id}`
  return request(url,method,params)
}

export async function postsNewReq(method,params,type) {
  const url = `/api/post/${type}/new`
  return request(url,method,params)
}

export async function postsNewImgReq(method,params, type) {
  const url = `/api/post/${type}/new/img`
  return fileRequest(url, method, params)
}

export async function postOpenReq(method, params, id) {
  const url = `/api/post/${id}`
  return request(url, method, params);
}

export async function postDelReq(method, params, id) {
  const url = `/api/post/${id}`
  return request(url, method, params);
}

export async function postEditReq(method ,params, id,type) {
  const url = `/api/post/${id}`
  return request(url, method, params);
}

export async function commentsReq(method, params, postId) {
  const url = `/api/post/${postId}/comment`
  return request(url, method, params);
}

export async function commentFirstNewReq(method, params, postId) {
  const url= `/api/post/${postId}/comment`
  return request(url, method, params);
}

export async function commentSecondNewReq(method, params, postId, commentId) {
  const url = `/api/post/${postId}/comment/${commentId}`
  return request(url, method, params);
}


export async function commentDeleteReq(method, params, postId, commentId) {
  const url = `/api/post/${postId}/comment/${commentId}`
  return request(url, method, params);
}

export async function postIdTagReq(method, params, postId) {
  const url = `/api/post/${postId}/tag`
  return request(url,method,params)
}

export async function postIdTagAddReq(method, params, postId) {
  const url = `/api/post/${postId}/tag/add`
  return request(url,method,params)
}

export async function postIdTagDeleteReq(method, params, postId) {
  const url = `/api/post/${postId}/tag/delete`
  return request(url,method,params)
}

export async function postIdFollow(method, params, postId) {
  const url = `/api/post/${postId}/follow`
  return request(url,method,params)
}

export async function followReq(method, params) {
  const url = `/api/follows`;
  return request(url, method, params);
}

export async function postIdCommodityReq(method, params, postId) {
  const url = `/api/post/sell/${postId}/commodity`
  return request(url, method, params)
}

export async function postIdCommodityNewReq(method, params, postId) {
  const url = `/api/post/sell/${postId}/commodity/new`
  return request(url, method, params)
}

export async function postIdCommodityBuyReq(method, params, postId) {
  const url = `/api/post/sell/${postId}/commodity/buy`
  return request(url, method, params)
}

export async function postReportReq(method, params, postId) {
  const url = `/api/post/${postId}/complain`
  return request(url, method, params);
}

export async function postIdCartReq(method, params, postId) {
  const url = `/api/post/sell/${postId}/cart`
  return request(url, method, params);
}

export async function commentLikesReq(method, params, postId, commentId) {
  const url = `/api/post/${postId}/comment/${commentId}/likes`
  return request(url, method, params);
}


export async function postSearchReq(method, params) {
  const url = `/api/post/search`
  return request(url, method, params);
}
