import request from '../utils/request'

export default {
  // 获取8门推荐课程
  // 获取8门推荐课程
  getSuggest(token) {
    return request({
      url: `/user/commend/video`,
      method: 'get',
      headers: {
        "Authorization": token
      }
    })
  },
  getSuggestNotLogin() {
    return request({
      url: `/user/commend/video/default`,
      method: 'get'
    })
  }

}
