import request from '../utils/request'

export default {
  // 通过用户id 获取用户信息
  getMember(token) {
    return request({
      url: `/user/message`,
      method: 'get',
      headers: {
        "Authorization":token
      }
    })
  },
  editMember(data, token) {
    return request({
      url: `/user/message/edit`,
      method: 'post',
      data: JSON.stringify(data),
      headers: {
        "Authorization":token
      }
    })
  },
  editPassword(data, token) {
    return request({
      url: `/user/password/reset`,
      method: 'post',
      data: data,
      headers: {
        "Authorization":token
      }
    })
  },
}
