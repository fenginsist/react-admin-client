import React, {Component} from "react";
import { Switch, Redirect, Route } from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from "../../utils/memoryUtils";

import Header from '../../components/header/index'
import LeftNav from "../../components/left-nav/index";

// 引入路由组件
import Category from '../category/catagory'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Home from '../home/home'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

const { Sider, Footer, Content } = Layout;

export default class Admin extends Component{
    render(){
        const user = memoryUtils.user
        // 如果内存没用储存 user =》 当前没有登录
        if(!user || !user.accessToken){
            // 自动跳转到 登录（在 render()中）
            return <Redirect to='/login' />
        }
        return (
            /* 第一个{}:代表里面写js语法，第二个{}: 代表一个对象*/
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/category' component={Category}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
