import request from "@/util/request";

// 获取当前频道列表
export const newsList = () =>{
    return request({
        url:'/app/v1_0/user/channels',
        method:'GET'
    })
}
//获取全部频道列表
export const reList = () =>{
    return request({
        url:'/app/v1_0/channels',
        method:'GET'
    })
}
//添加用户荐频道列表
export const addList = channel =>{
    return request({
        url:'/app/v1_0/user/channels',
        method:'PATCH',
        data:{
            channels:[channel]
        }
    })
}
// 删除用户频道
export const delList = channelID =>{
    return request({
        url:`/app/v1_0/user/channels/${channelID}`,
        method:'DELETE',
    })
}
