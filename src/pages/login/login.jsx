import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import {Form, Icon, Input, Button, message} from 'antd';
import cookie from 'react-cookies'

import {reqLogin} from './../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import localStorageUtils from "../../utils/localStorageUtils";

import './login.less'

/*
* 路由登录组件
* */
class Login extends Component {


    /*
    * 1、前台表单验证
    * 2、收集表单输入数据
    * */
    /*
    * async 和 await
    * 1、作用
    *   简化 promise 对象的使用： 不用再使用 then() 来指定成功/失败的回调函数
    *   以同步编码（没有回调函数） 方式实现异步流程
    * 2、哪里写await？
    *   在返回promise 的表达式左侧写await： 不想要 promise ，想要promise 异步执行的成功的 value 数据
    * 3、哪里写 async
    *   await 所在函数（最近的） 定义的左侧写 async
    * */
    handleSubmit = (event) => {
        // 组织事件的默认提交行为
        event.preventDefault();

        // 获取 隐藏框的 值，后端规定 pc 端为 1
        const inputType = this.inputType.value;
        //console.log(inputType)

        // 对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values;
                // reqLogin(username, password, inputType).then(response => {
                //     console.log('成功了', response.data)
                // }).catch(error => {
                //     console.log('失败了', error)
                // })
                // 可以对错误 进行统一处理 在 core.axios.js 中处理的
                const result = await reqLogin(username, password, inputType); // {code： 0， data : ...} {code: 其他}
                console.log('请求成功了', result)
                console.log('请求成功了', result.data)
                if (result.code === 0) {
                    message.success('登录成功')
                    // 保存 token 到 cookie
                    cookie.save('access_token', result.data.accessToken)
                    cookie.save('refresh_token', result.data.refreshToken)
                    // 保存信息
                    const user = result.data;
                    memoryUtils.user = user; // 保存到内存中
                    localStorageUtils.saveUser(user); // 保存到 localStorage
                    // 跳转到管理界面 （不需要再回退到登录）
                    this.props.history.replace('/')
                } else {// 登录失败
                    // 提示错误信息
                    message.error(result.msg);
                }
            } else {
                console.log('校验失败')
            }
        })
        /*
        * 测试
        * */
        // 得到 form 对象
        const form = this.props.form;
        // 获取 表单项的输入数据
        const values = form.getFieldsValue();
        console.log(values);

    };

    // 对密码进行自定义验证
    validatorPwd = (rule, value, callback) => {
        // console.log(rule, value, callback)
        if (!value) {
            callback('密码必须输入');
        } else if (value.length < 4) {
            callback('密码长度不能小于4位');
        } else if (value.length > 12) {
            callback('密码长度不能大于12位');
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成');
        } else {
            callback();
        }
    }

    render() {
        // 如果用户已经登录，自动跳转到管理页面
        const user = memoryUtils.user;
        if (user && user.accessToken){
            return <Redirect to='/' />
        }

        // 得到具有强大功能的 form 对象
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return (
            <div className='login'>
                <header className='login-header'>
                    {/*<img src={} alt='logo' />*/}
                    <h1>react项目:智慧社区管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        {/*隐藏表单*/}
                        <Form.Item>
                            <input name="type" type="hidden" ref={input => this.inputType = input} value="1"/>
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('username', { // 配置对象： 属性名是特定的一些名称
                                    // 这里就是 声明式 验证：直接使用别人定义好的验证规则进行验证
                                    // 还有 自定义 验证： {validator: this.validatorPwd}  在手写一个方法
                                    rules: [
                                        {required: true, message: '用户名不能为空'},
                                        {min: 4, message: '用户名至少4位'},
                                        {max: 12, message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'},
                                    ],
                                    initialValue: 'admin', // 指定初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [{validator: this.validatorPwd}]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
1.高阶函数
    1).一类特别的函数
        a.接受函数类型的参数
        b.返回值是函数
    2)常见的高阶函数
        a.定时器:setTimeout()/setInterval()
        b.Promise: Promise(()=>{}).then(value=>{})
        c.数组遍历相关的方法:forEach()/filter()/map()
        d.函数对象的bind()
        e.Form.create()() / getFieldDecorator()()
    3)高阶函数更加动态,更加具有扩展性

2.高阶组件：const WrapLogin
    1)本质就是一个函数
    2)接受一个组件(被包装组件),返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
    3)作用:扩展组件的功能
    4)高阶组件也是高阶函数:接收一个组件函数,返回是一个新的组件函数

*/
/*
* 包装 Form 组件 ，生成一个新的组件 Form(Login)
* 新组件 会向 Form 组件传递一个强大的对象属性： form
* 可以通过 Chrome 的 react 开发者工具查看
* */
// const WrapLogin = Form.create()(Login)
// export default WrapLogin

// 合二为一
export default Form.create()(Login)


