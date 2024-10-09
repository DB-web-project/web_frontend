import axios from 'axios'
import global from "@/components/Global"
import router from '@/router'
import store from "@/store/index"

axios.defaults.baseURL = global.ApiUrl;
axios.defaults.timeout = 1000;

export async function request(url, method, params){
  let response
  const options = { url, method }
  if (typeof params !== 'undefined') {
    if (method === 'get' || method === 'delete') {
      options.params = params
    } else {
      options.data = params
    }
  }
  if (options.headers !== undefined) {
    options.headers['Cache-Control'] = 'no-cache';
  } else {
    options['headers'] = {
      'Cache-Control': 'no-cache'
    };
  }

  try {
    response = await axios(options)
  } catch (e) {
    if (e.response) {
      let tmp = e.response
      if (tmp.status != 200){
        switch(tmp.status){
          case 400:
            store.dispatch('snack/openSnackBar',{
              msg: tmp.data,
              type: 'error',
            })
            break
          case 401:
            store.dispatch('user/logout')
            if (router.currentRoute.name !== 'login'){
              router.push({
                name: 'login',
                query: { redirect: router.currentRoute.fullPath }
              })
            }
            store.dispatch('snack/openSnackBar',{
              msg: `登录过期,请重新登录`,
              type: 'error',
            })
            break;
          case 500:
            store.dispatch('snack/openSnackBar',{
              msg: '500 Internal Server Error',
              type: 'error',
            })
            break
          case 404:
              break
          default:
            console.log(tmp.data)
        }
      }
    }
    throw e
  }

  return response
}

export async function fileRequest(url, method, params){
  let response
  const options = { url, method }
  if (typeof params !== 'undefined') {
    if (method === 'get' || method === 'GET') {
      options.params = params
      options.responseType = 'blob'
    } else {
      options.data = params
      options.headers = { 'Content-Type': 'multipart/form-data' }
    }
  }
  try {
    response = await axios(options)
  } catch (e) {
    if (e.response) {
      let tmp = e.response
      if (tmp.status != 200) {
        switch(tmp.status){
          case 400:
            store.dispatch('snack/openSnackBar',{
              msg: tmp.data,
              type: 'error',
            })
            break
          case 401:
            store.dispatch('user/logout')
            if (router.currentRoute.name !== 'login'){
              router.push({
                name: 'login',
                query: { redirect: router.currentRoute.fullPath }
              })
            }
            store.dispatch('snack/openSnackBar',{
              msg: `登录过期,请重新登录`,
              type: 'error',
            })
            break;
          case 500:
            store.dispatch('snack/openSnackBar',{
              msg: '500 Internal Server Error',
              type: 'error',
            })
            break
          case 404:
              break
          default:
            console.log(tmp.data)
        }
      }
    }
    throw e
  }

  return response
}
