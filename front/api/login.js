import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"

export default {
  //登录
  login(userInfo) {
    return request({
      url: STATIC_URL+`/user/login`,
      method: 'post',
      data: JSON.stringify(userInfo),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  register(userInfo) {
    return request({
      url: STATIC_URL+`/user/register`,
      method: 'post',
      data: JSON.stringify(userInfo),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  logout(token) {
    return request({
      url: STATIC_URL+`/user/logout`,
      method: 'put',
      headers: {
        "Authorization": token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },

}
