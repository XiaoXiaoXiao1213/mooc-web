import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"

export default {
  // 通过用户id 获取用户信息
  getMember(token) {
    return request({
      url: STATIC_URL+`/user/message`,
      method: 'get',
      headers: {
        "Authorization":token
      }
    })
  },
  editMember(data, token) {
    return request({
      url: STATIC_URL+`/user/message/edit`,
      method: 'post',
      data: JSON.stringify(data),
      headers: {
        "Authorization":token
      }
    })
  },
  editPassword(data, token) {
    return request({
      url: STATIC_URL+`/user/password/reset`,
      method: 'post',
      data: data,
      headers: {
        "Authorization":token
      }
    })
  },
}
