import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '', // 这里可以设置基础URL，根据项目需求配置
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 根据实际项目的响应格式进行处理
    return res
  },
  (error) => {
    console.error('响应错误:', error)
    // 可以在这里添加错误处理逻辑
    // 例如：判断token过期、网络错误等
    return Promise.reject(error)
  },
)

export default service
