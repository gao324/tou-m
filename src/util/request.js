import axios from 'axios'
import store from "@/store/index";

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
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
