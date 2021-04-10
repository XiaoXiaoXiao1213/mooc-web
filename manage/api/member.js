import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"
export default {
  // 通过用户id 获取用户信息
  getMember(req) {
    return request({
      url: STATIC_URL+`/getMember`,
      method: 'post',
      data: req
    })
  },
}