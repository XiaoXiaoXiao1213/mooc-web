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
  logout() {
    return request({
      url: `/user/logout`,
      method: 'put',
    })
  },
}
