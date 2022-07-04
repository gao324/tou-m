// 获取
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
// 存储
export const setItem = (key,value) => {
    // 转化
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    
    window.localStorage.setItem(key,value)
}
// 删除

export const removeItem = name =>{
    window.localStorage.removeItem(name)
}