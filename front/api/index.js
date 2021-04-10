import request from '../utils/request'
export const STATIC_URL = ""

export default {
  // 获取8门推荐课程
  // 获取8门推荐课程
  getSuggest(token) {
    return request({
      url: STATIC_URL+`/user/commend/video`,
      method: 'get',
      headers: {
        "Authorization": token
      }
    })
  },
  getSuggestNotLogin() {
    return request({
      url: STATIC_URL+`/user/commend/video/default`,
      method: 'get'
    })
  }

}
