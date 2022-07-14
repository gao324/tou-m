import request from "@/util/request";
//获取当前用户文章列表

export const getNewsList = params => {
    return request({
      method: 'GET',
      url: '/app/v1_0/articles',
      params
    })
}

// 获取文章详情
export const getArticle = article_id => {
    return request({
      method: 'GET',
      url: `/app/v1_0/articles/${article_id}`,
    })
}
// 关注用户
export const focusOn = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data:{
      target	
    }
  })
}
// 取消关注
export const focusDel = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`,
  })
}
//收藏
export const onCollection = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data:{
      target	
    }
  })
}
// 取消收藏
export const delCollection = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`,
  })
}