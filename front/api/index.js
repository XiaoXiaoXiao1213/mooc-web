import request from '../utils/request'

export default {
  // 获取8门推荐课程
  getSuggest(token) {
    return request({
      url: `/user/commend/video`,
      method: 'get',
      headers: {
        "Authorization": token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  getSuggestNotLogin() {
    return request({
      url: `/user/commend/video/default`,
      method: 'get',
    })
  }

}
