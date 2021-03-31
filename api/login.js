import request from '@/utils/request'
export default {
  //登录
  login(userInfo) {
    return request({
      url: `/userLogin`,
      method: 'post',
      data: userInfo
    })
  },
  editUser(userInfo) {
    return request({
      url: `/editUser`,
      method: 'post',
      data: userInfo
    })
  },
  //根据token获取用户信息
  // getLoginInfo() {
  //   return request({
  //     url: `/serviceucenter/getLoginInfo`,
  //     method: 'get',
  //    // headers: {'token': cookie.get('guli_token')}
  //   })
  //   //headers: {'token': cookie.get('guli_token')} 
  // }
}