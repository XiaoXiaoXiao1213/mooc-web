import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8013/api', // api的base_url
  timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
  //debugger
  if (cookie.get('token')) {
    config.headers['token'] = cookie.get('token');
  }
    return config
  },
  err => {
  return Promise.reject(err);
})

export default service