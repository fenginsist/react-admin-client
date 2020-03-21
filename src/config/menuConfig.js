const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'pie-chart'
    },
    {
        title: '商品',
        key: '/products',
        icon: 'mail',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'bars'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            },
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'tool'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'tool'
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'tool',
        children: [
            {
                title: '柱状图',
                key: '/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'pie-chart'
            }
        ]
    }
];

export default menuList;
