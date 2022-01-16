/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const addFollow = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

export const deleteFollow = (target) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`
  })
}

export const getUserProfile = (target) => {
  return request({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}

export const updateUserProfile = (data) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/profile',
    data
  })
}

export const updateUserPhoto = (data) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/photo',
    data
  })
}
