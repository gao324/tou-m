import axios from 'axios'
import store from "@/store/index";
import jsonBig from 'json-bigint'


const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  if (config.url.startsWith('/app')) {
    config.url = config.url.slice(4)
  }
  // Do something before request is sent
  const {user} = store.state
  if (user && user.token) {
    config.headers. Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器

export default request
