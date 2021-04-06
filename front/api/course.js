import request from '@/utils/request'

export default {
  //分页查询课程
  getCourseList(req) {
    return request({
      url: `/getCourseList`,
      method: 'post',
      data: req
    })
  },
  // 通过课程id 获取课程信息
  getCourse(id) {
    return request({
      url: `/getCourse?id=${id}`,
      method: 'get'
    })
  },
}

export const STATIC_URL = "http://127.0.0.1:8013/images/"