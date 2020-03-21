import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

import './index.less'
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

/*
* 左侧导航组件
* */
class LeftNav extends Component {

    /*
    * 根据 menu 的数据数组 生成对应的标签数组
    * 主要语法：map() 函数 和 递归语法
    * */

    getMenuNodes_map = (menuList)=>{
        return menuList.map((item)=>{
            // 返回 有两种形式， <Menu.Item> 或者 <SubMenu>， 需要判断,判断是否有 children 子数组
            if (!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}></Icon>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/*<Menu.Item></Menu.Item>  ， 使用递归*/}
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    /*
    * 根据 menu 的数据数组 生成对应的标签数组
    * 主要语法：reduce() 函数 和 递归语法
    * */
    getMenuNodes_reduce = (menuList) =>{
        // 得到当前请求的 路由路径
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item)=>{
            // 向 pre 添加 <Menu.Item>
            if (!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else {
                // 向 pre 添加 <SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}></Icon>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ));

                // 查找一个 与当前请求路径 匹配的 子 Item
                const cItem = item.children.find(cItem => cItem.key === path )
                // 如果存在， 说明 当前 item的 子列表需要打开
                if (cItem){
                    this.openKey = item.key
                }
            }
            return pre;
        },[])
    }

    /*
    * 1、在第一次 render() 之前执行一次
    * 2、为第一个 render() 准备数据（必须同步的）
    * */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuList);
    }

    render() {
        // 得到当前请求的 路由路径
        const pathname = this.props.location.pathname;
        // 有子路径的 key， 默认打开 带有子节点的 节点。
        const openKey = this.openKey;
        // debugger
        return (
            <div className='left-nav'>
                {/*点击智慧社区 进入到 主页面*/}
                <Link to='/' className='left-nav-header'>
                    <h1>智慧社区</h1>
                </Link>
                <Menu
                    selectedKeys={[pathname]}  //选中的菜单项 高亮
                    defaultOpenKeys={[openKey]} // 当有子菜单时，需要默认打开。
                    mode="inline"
                    theme="dark"
                >
                    {/*
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail"/>
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="mail"/>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    */}

                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/*
* WithRouter 高阶组件：
* 包装非路由组件， 返回一个新的组件
* 新的组件向非路由组件传递 3 个属性： history/location/match
* */
/* 让非路由组件 变成 路由组件，使用高阶函数 withRouter()*/
export default withRouter(LeftNav);
