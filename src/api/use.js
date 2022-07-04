import request from "@/util/request";

export  const login = data =>{
    return request({
        method:'post',
        url:'/v1_0/authorizations',
        data
    })
}

export  const getInfor = mobile =>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`,
    })
}