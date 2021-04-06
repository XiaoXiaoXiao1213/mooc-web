import request from '@/utils/request'

export default {
  // 添加评论
  addCourseAnswer(comment) {
    return request({
      url: `/addCourseAnswer`,
      method: 'post',
      data: comment
    })
  },
  // 获取课程评论
  getComment(comment) {
    return request({
      url: `/getComment`,
      method: 'post',
      data: comment
    })
  }
}
