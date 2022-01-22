/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  // baseURL: 'http://api-toutiao-web.itheima.net/app'
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      const user = store.state.user
      console.log(user)
      if (!user || !user.refresh_token) {
        router.push('/login')
      }
      console.log(user.refresh_token)
      try {
        const res = await axios({
          url: 'http://toutiao.itheima.net/v1_0/authorizations',
          method: 'put',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log(res)
        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: user.refresh_token
        })
        return request(error.config)
      } catch (err) {
        console.log(err)
        // router.push('/login')``
      }
    }
    return Promise.reject(error)
  }
)

export default request
