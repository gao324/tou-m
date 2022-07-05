import request from "@/util/request";

// 获取文章列表
export const newsList = () =>{
    return request({
        url:'/v1_0/channels',
        method:'GET'
    })
}