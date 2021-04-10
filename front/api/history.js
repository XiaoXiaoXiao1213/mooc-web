import request from '../utils/request'
export const STATIC_URL = ""

export default {
  //获取浏览历史
  getHistoryList(token) {
    return request({
      url: STATIC_URL+`/user/history/video`,
      method: 'get',
      headers: {
        "Authorization": token
      }
    })
  },
  //添加浏览历史
  addHistory(id, token) {
    return request({
      url: STATIC_URL+`/video/click/${id}`,
      method: 'put',
      headers: {
        "Authorization":token
      }
    })
  }
}
