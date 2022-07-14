import request from "@/util/request";

// 获取用户信息
export  const login = data =>{
    return request({
        method:'post',
        url:'/app/v1_0/authorizations',
        data
    })
}
// 发送验证码
export  const getInfor = mobile =>{
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`,
    })
}
// 获取用户信息
export const userInfor = ()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user'
    })
}
//获取用户个人信息
export const getUserp = ()=>{
    return request({
        method:'get',
        url:'/app/v1_0/user/profile'
    })
}
//修改个人名字信息
export const modUserp = data =>{
    console.log(1);
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/profile',
        data
    })
}
//修改个人性别信息
export const sexUserp = (data) =>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/profile',
        data
    })
}
//修改个人生日信息
export const ageUserp = (data) => {
    return request({
      method: 'PATCH',
      url: '/app/v1_0/user/profile',
      data
    })
  }
//修改个人头像信息
export const photoUserp = (photo) =>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/photo',
        data:photo
    })
}