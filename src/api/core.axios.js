import axios from 'axios'
import {message} from 'antd'


/*
* 能发送异步ajax请求的函数模块
* 封装 axios 库的工具类
* 函数的返回值是 promise 对象
* 1、优化：统一处理请求异常
*    在 外层 包一个 自己创建的 Promise 对象
*    在请求出错时，不reject(error), 自定义出错形式
* 2、优化2： 异步得到不是 response ，而是 response.dsata
*    在请求 成功 resolve 时，resolve(response.data)
* */
/*{headers: {'authorization': cookie.load(headers)}}*/
export default function Ajax(url, params = {}, method = 'GET', headers, async, contentType) {

    return new Promise((resolve, reject) => {
        let promise;
        // 1、执行异步ajax请求
        if (method === 'GET') {
            promise = axios.get(url, params);
        } else {
            console.log(params)
            promise = axios.post(url, params);
        }
        // 2、如果成功了，调用 resolve（value）
        promise.then(response => {
            resolve(response.data);
            // 3、如果失败了，调用 reject（value）
        }).catch(error => {
            reject(error)
            message.error('请求出错了' + error.message)
        })
    })
}
