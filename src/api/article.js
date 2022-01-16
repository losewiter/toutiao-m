import require from '@/utils/request'

export const getArticles = (params) => {
  return require({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

export const getArticleById = (articleId) => {
  return require({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}

export const addCollect = (target) => {
  return require({
    method: 'post',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = (target) => {
  return require({
    method: 'delete',
    url: `/v1_0/article/collections/${target}`
  })
}

export const addLike = (target) => {
  return require({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const deleteLike = (target) => {
  return require({
    method: 'delete',
    url: `/v1_0/article/likings/${target}`
  })
}
