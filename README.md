# src基本结构
1. api ajax相关
2. asset 公用资源
3. components 非路由组件
4. config 配置
5. pages 路由组件
6. utils 工具模型
7. App.jsx 应用根组件
8. index.js 入口js


# 一、开发大体顺序


## 1.引入 ant-design
yarn add antd

## 2.按需导入配置 只打包 import 引入组件的 js/css
1. yarn add react-app-rewired customize-cra babel-plugin-import

2. 创建一个 config-overrides.js 用于修改默认配置。
```
const {override, fixBabelImports} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);
```

3. package.json 修改
使用命令启动项目 `npm start` 时，不在使用react-scripts 中的脚本，而是使用下载的插件react-app-rewired中脚本，并加载
config-overrides.js 配置文件，对 antd 库使用 babel-plugin-import 插件 进行按需加载。
```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  },
```

## 3.自定义 antd 主题
`andt` 内部的样式是通过 `less` 进行编写的，相当于我们要对less语法进行重新编辑，
用到less语法就要下载`less` 和 `less-loader` 插件
yarn add less less-loader

修改 `config-overrides.js`, 添加了一个 less 加载器 addLessLoader
```
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    // 针对 antd 实现按需打包： 根据 import 来打包（使用 babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        //style: 'css', // 自动打包相关的样式
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    })
);
```

## 4.引入router
1. 安装路由 : `yarn add react-router-dom`
2. 使用路由标签
   a. < BrowserRouter>
   b. < Switch>
   c. < Route>
   d. < Redirect>
   
## 5.编写login.jsx 
1. 手写样式，登录 form 表单，使用 antd 的 form 表单。
2. 对登录的用户名、密码进行校验，有声明式验证(antd 自带写好)、自定义验证 两种
   用户名使用声明式验证、密码使用自定义验证
3. 收集表单数据，使用高阶函数、高阶组件、进行统一验证

## 6.引用axios
1. 安装 yarn add axios
2. 在api接口中 编写axios 的工具包:core.axios.js ,然后再编写 index.js 将所有的请求都放在这个包
3. 在请求中，使用 async 和 await 简化 promise 的使用，
4. 统一异常处理，在 core.axios.js 中优化

## 7. 跨域请求
* 跨域的三种情况 
    1. 协议名不同(HTTPS/HTTP) 
    2. 主机名(也就是IP) 
    3. 端口号()
* 三种方法 
    1. jsonp 只能解决get请求 
    2. 后端 cros 允许跨域 
    3. 前端代理。
* 前端代理方法
    脚手架搭建的项目 开发环境已经有代理服务器的存在，需要配置即可。
    在package.json 文件中 最下面添加一行 `"proxy": "http://123.56.30.106:8080"`

## 8. 持久化数据
1. 安装 cookie、localStorage : `yarn add react-cookies store` , 使用 store 来操作localStorage
2. 使用 cookie 存储 tooken , 缺点：容量小只有2k， 只能放字符串。
3. 编写模块 memoryUtils.js, 里面只有一个 user 对象，登录时 将获取的数据 放在这个 user对象中，但是这个对象是保存在内存中，容易丢失
4. 登录后 进入到 admin 页面，会获取存储在 内存中 user 对象，但是刷新后 会丢失，因为储存在内存。
5. 使用 localStorage 存储 数据， 
    优点：容量大，与 sessionStorage 相比，存储在 localStorage 的数据可以长期保留；
    而当页面会话结束（当页面被关闭时），存储在 sessionStorage 的数据会被清除 。
    使用方法js中直接使用： 
        添加：localStorage.setItem('','')，
        获取：localStorage.getItem(''), 
        删除：localStorage.removeItem('')
        
6. 在js 中，可以使用localStorage 对象直接使用 3 中的方法进行操作。还可以 安装 store 库，操作 localStorage
   使用新库时，可以去GitHub上搜索，进行查看使用方法。这个库使用方便。直接看 localStorageUtils.js，已改为使用 store 操作。
        
## 9. 维持登录与自动登录
* 维持登录：

   关闭页面，还可以登录，关闭电脑，还可以登录。也就是将登录用户数据 放在 localStorage 中
   编写模块 localStorageUtils.js， 在里面编写 添加、获取、删除 方法。
   登录成功后，将用户数据储存在 内存和localStorage中, 在admin 组件中，进行判断,这就是维持登录
    ``` 
    const user = memoryUtils.user
    // 如果内存没用储存 user =》 当前没有登录
    if(!user || !user.accessToken){
        // 自动跳转到 登录（在 render()中）
        return <Redirect to='/login' />
    }
    ```
* 自动登录：

1、登录后，关闭页面，再打开，还处于登录页面；
  方法：在入口index.js 中，编写如下代码
  ```
  import memoryUtils from "./utils/memoryUtils";
  import localStorageUtils from "./utils/localStorageUtils";
  
  memoryUtils.user = localStorageUtils.getUser();
  ```
  login组件中进行判断。
  然后便可进行自动登录。
  只有在 Chrome 中 ，删除掉 localStorage 中的数据，才会进行登录。

  2、登录后，请求 登录页面，自动跳转到主页面, 在 login.jsx 中的 render() 函数写如下代码，
  ```
  // 如果用户已经登录，自动跳转到管理页面
  const user = memoryUtils.user;
  if (user && user.accessToken){
      return <Redirect to='/' />
  }
  ```

## 10. 搭建 Admin 组件界面和 LeftNav 组件
1. Admin 页面的二级子路由
2. LeftNav 页面展示的动态菜单项， 使用reduce()/map()+递归 展示菜单列表。
3. LeftNav 页面 自动选中当前菜单项 和 自动打开当前子列表 两个属性selectedKeys defaultOpenKeys


