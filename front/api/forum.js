import request from '@/utils/request'

export default {
  // 分页方式获取论坛信息
  getForumList(req) {
    return request({
      url: `/getForumList`,
      method: 'post',
      data: req
    })
  },
  // 分页方式获取论坛回复信息
  getAnswerList(req) {
    return request({
      url: `/getAnswerList`,
      method: 'post',
      data: req
    })
  },
  // 添加论坛话题
  addForum(req){
    return request({
      url: `/addForum`,
      method: 'post',
      data: req
    })
  },
  // 添加论坛回复
  addForumAnswer(req){
    return request({
      url: `/addForumAnswer`,
      method: 'post',
      data: req
    })
  },
}