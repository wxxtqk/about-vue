import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseUrl: process.env.BASE_API,
  timeout: 15000
})
service.interceptors.request.use(config => {
  // 后期根据token做处理
  if (store.getters.token) {
    config.headers['X-Token'] = '795645679841' // 让每个请求携带自定义token
  }
  config.headers['X-Token'] = '795645679841' // 让每个请求携带自定义token
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
export default service
