import request from '../utils/request'
export default {
  // 通过用户id 获取用户信息
  getMember(req) {
    return request({
      url: `/getMember`,
      method: 'post',
      data: req
    })
  },
}