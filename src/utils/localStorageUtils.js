/*
* 进行local 数据储存管理的工具模块
* */
import store from 'store'

const USER_KEY = 'user_key'

export default {
    /*
    * 保存 user
    * 读取 user
    * 删除 user
    * */
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },
    getUser() {
        // return localStorage.getItem(USER_KEY)
        return store.get(USER_KEY) || {};
    },
    removeUser() {
        localStorage.removeItem(USER_KEY)
        store.delete(USER_KEY)
    }
}
