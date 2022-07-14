import request from "@/util/request";


// 获取评论// 获取评论区评论
export const getReply = params => {
    return request({
      method: 'GET',
      url: '/app/v1_0/comments',
      params
    })
  }
// 点赞评论
export const givLick = target => {
    return request({
      method: 'POST',
      url: '/app/v1_0/comment/likings',
      data:{
        target
      }
    })
}
// 取消点赞评论
export const delLick = target => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/comment/likings/${target}`,
    })
}
// 发布评论
export function replyCom (data) {
    return request({
      method: 'POST',
      url: '/app/v1_0/comments',
      data
    })
}

