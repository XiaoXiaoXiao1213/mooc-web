import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"
export default {
  //登录
  login(userInfo) {
    return request({
      url: STATIC_URL+`/user/login`,
      method: 'post',
      data: JSON.stringify(userInfo),
    })
  },
  logout() {
    return request({
      url: STATIC_URL+`/user/logout`,
      method: 'put',
    })
  },
}
