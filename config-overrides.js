const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    // 针对 antd 实现按需打包： 根据 import 来打包（使用 babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        //style: 'css', // 自动打包相关的样式
        style: true,
    }),

    // 使用 less-loader 对源码中的 less 的变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    })
);
