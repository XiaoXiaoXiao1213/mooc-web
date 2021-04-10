import request from '../utils/request'
export const STATIC_URL = ""

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

