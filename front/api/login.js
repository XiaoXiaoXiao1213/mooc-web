import request from '../utils/request'
export default {
  //登录
  login(userInfo) {
    return request({
      url: `/user/login`,
      method: 'post',
      data: JSON.stringify(userInfo),

    })
  },
  register(userInfo) {
    return request({
      url: `/user/register`,
      method: 'post',
      data: JSON.stringify(userInfo),
    })
  },
  logout(token) {
    return request({
      url: `/user/logout`,
      method: 'put',
      headers: {
        "Authorization": token,
      }
    })
  },

}
