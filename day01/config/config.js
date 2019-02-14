export default{
    plugins: [
        ['umi-plugin-react',{
            //不做任何配置
        }]
    ],

    singular: true,

    routes: [{
        path: '/',
        component: './HelloWorld'
    }]
}