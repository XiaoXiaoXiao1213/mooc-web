import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"

export default {
  // 通过课程id 获取课程信息
  getCourse(id) {
    return request({
      url: STATIC_URL+`/getCourse?id=${id}`,
      method: 'get',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  getCourseByType(req,type) {
    return request({
      url: STATIC_URL+`/video/type/${type}`,
      method: 'get',
      params:req,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  getHotCourseByType(req) {
    return request({
      url: STATIC_URL+`/video/hot`,
      method: 'get',
      params:req,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
  getCourseAll(req) {
    return request({
      url: STATIC_URL+`/video/all`,
      method: 'get',
      params: req,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":"Origin,X-Requested-With,Content-Type,Authorization",
        "Access-Control-Allow-Credentials": 'true',
      }
    })
  },
}

