import request from '../utils/request'
export const STATIC_URL = ""

export default {
  //登录
  login(userInfo) {
    return request({
      url: STATIC_URL+`/user/login`,
      method: 'post',
      data: JSON.stringify(userInfo),
    })
  },
  register(userInfo) {
    return request({
      url: STATIC_URL+`/user/register`,
      method: 'post',
      data: JSON.stringify(userInfo),

    })
  },
  logout(token) {
    return request({
      url: STATIC_URL+`/user/logout`,
      method: 'put',
      headers: {
        "Authorization": token
      }
    })
  },
}
