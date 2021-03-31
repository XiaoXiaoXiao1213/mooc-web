import request from '@/utils/request'

export default {
  //获取浏览历史
  getHistoryList(memberToken) {
    return request({
      url: `/getHistoryList?memberToken=${memberToken}`,
      method: 'get',
    })
  },
  //添加浏览历史
  addHistory(req) {
    return request({
      url: `/addHistory`,
      method: 'post',
      data: req
    })
  }
}