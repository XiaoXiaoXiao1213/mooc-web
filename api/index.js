import request from '@/utils/request'

export default {
  // 获取8门推荐课程
  getSuggest(req) {
    return request({
      url: `getSuggestCourse`,
      method: 'post',
      data: req
    })
  }
}