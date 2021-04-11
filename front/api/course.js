import request from '../utils/request'
export default {
  // 通过课程id 获取课程信息
  getCourse(id) {
    return request({
      url: `/getCourse?id=${id}`,
      method: 'get'
    })
  },
  getCourseByType(req,type) {
    return request({
      url: `/video/type/${type}`,
      method: 'get',
      params:req
    })
  },
  getHotCourseByType(req) {
    return request({
      url: `/video/hot`,
      method: 'get',
      params:req
    })
  },
  getCourseAll(req) {
    return request({
      url: `/video/all`,
      method: 'get',
      params: req
    })
  },
}

export const STATIC_URL = "http://127.0.0.1:8013/images/"
