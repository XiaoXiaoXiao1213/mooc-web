import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"

export default {
  // 通过课程id 获取课程信息
  getCourse(id) {
    return request({
      url: STATIC_URL+`/getCourse?id=${id}`,
      method: 'get'
    })
  },
  getCourseByType(req,type) {
    return request({
      url: STATIC_URL+`/video/type/${type}`,
      method: 'get',
      params:req
    })
  },
  getHotCourseByType(req) {
    return request({
      url: STATIC_URL+`/video/hot`,
      method: 'get',
      params:req
    })
  },
  getCourseAll(req) {
    return request({
      url: STATIC_URL+`/video/all`,
      method: 'get',
      params: req
    })
  },
}

