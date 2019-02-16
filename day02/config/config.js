export default{
    plugins: [
        ['umi-plugin-react',{
            antd: true
        }]
    ],

    singular: true,

    routes: [{
        path: '/',
        component: './HelloWorld'
    },
    {
        path: '/content',
        component: './Content'
    },
    {
        path: '/antd',
        component: './Antd'
    },
    {
        path: '/demo',
        component: './Demo'
    },
    {
        path: '/tabs',
        component: './tabs'
    }]
}