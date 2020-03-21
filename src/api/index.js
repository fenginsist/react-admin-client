/*
* 包含应用中所有接口请求函数的模块
* */
import Ajax from './core.axios'


// const BASE = 'http://localhost:8080'
const BASE = '';

// 登录
export function reqLogin(username, password, type) {
    console.log(username+password+type)
    return Ajax(BASE+'/api/user/login', {username: username, password: password, type: type}, 'POST');
}

// 添加用户
export const reqAddUser = (user) => Ajax('api/addUser', user, 'POST',);
