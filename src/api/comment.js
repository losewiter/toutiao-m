import request from '@/utils/request'

export const getComments = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}

export const addCommentLike = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const deleteCommentLike = (target) => {
  return request({
    method: 'delete',
    url: `/v1_0/comment/likings/${target}`
  })
}

export const addComment = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
