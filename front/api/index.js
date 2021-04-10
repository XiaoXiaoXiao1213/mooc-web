import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"

export default {
  // 获取8门推荐课程
  // 获取8门推荐课程
  getSuggest(token) {
    return request({
      url: STATIC_URL+`/user/commend/video`,
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
      url: STATIC_URL+`/user/commend/video/default`,
      method: 'get',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  }

}
