import request from '@/utils/request'

export default {
  // 通过讲师id 获取讲师信息
  getTeacher(id) {
    return request({
      url: `/getTeacher?id=${id}`,
      method: 'get'
    })
  }
}