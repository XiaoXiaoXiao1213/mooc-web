import request from '@/utils/request'

export default {
  //获取收藏课程
  getCollectionList(memberToken) {
    return request({
      url: `/getCollectList?memberToken=${memberToken}`,
      method: 'get',
    })
  },

  //添加收藏/取消收藏
  editCollection(req){
    return request({
      url: `/editCollection`,
      method: 'post',
      data: req
    })
  },

  //添加收藏/取消收藏
  getCollect(req){
    return request({
      url: `/getCollect`,
      method: 'post',
      data: req
    })
  },
}