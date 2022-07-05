import request from "@/util/request";

// 获取用户信息
export  const login = data =>{
    return request({
        method:'post',
        url:'/v1_0/authorizations',
        data
    })
}
// 发送验证码
export  const getInfor = mobile =>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`,
    })
}
// 获取用户信息
export const userInfor = ()=>{
    return request({
        method:'GET',
        url:'/v1_0/user'
    })
}