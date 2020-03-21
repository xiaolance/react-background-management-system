//
export default {
    saveUser:function (userInfo) {
    //存储用户信息
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
    },
    getUser:function () {
    //获取用户信息
       return  JSON.parse(localStorage.getItem('userInfo')||'{}')
    },
    removeUser:function () {
    //删除用户信息
        localStorage.removeItem('userInfo')
    }
}

