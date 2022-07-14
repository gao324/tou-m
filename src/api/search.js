import request from "@/util/request";

// 获取搜索建议
export const getSearchSug = q =>{
    return request({
        method:'GET',
        url:'/app/v1_0/suggestion',
        params:{
            q
        }
    })
}
// 获取搜索结果数据
// export const getSearchRes = params => {
//     return require({
//         method:'GET',
//         url:'/app/v1_0/search',
//         params
//     })
// }
export const getSearchRes = params =>{
    return request({
        method:'GET',
        url:'/app/v1_0/search',
        params
    })
}