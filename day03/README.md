## 布局与路由

在 react 中，布局主要是通过 `{props.children}` 实现的，有一类组件 充当了组件的作用，它定义了外层的结构样式 然后可以在容器里面放入任意结构 。

下面代码使用了这种容器组件:

```js
import {Card} from 'antd'

export default () => {
    const style = {
        width: '400px',
        margin: '30px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
    };

    return (
        <Card style={style} actions={[<a>操作一</a>, <a>操作二</a>]}>
            <Card.Meta avatar={<img alt="" style={{ width: '64px', height: '64px', borderRadius: '32px' }} src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>} title="支付宝" description="hhhhhh😄😄😂"/>
        </Card>
    )
}
```

这里给 Card 传入内部 content 属性，在 Card 组件中，使用了 `{props.children}` 接收这里的 `Card.Meta` 并渲染到页面上。


## 使用 Ant Design实现基本布局

Ant 提供了多种的布局方式，下图是最典型的一种:

![](https://imgchr.github.la/20190220224558_6kM04f_Screenshot.png)

```js
import {Component} from 'react';
import {Layout} from 'antd';

const {Header,Footer,Sider,Content} = Layout;


/**
 * 定义一个基本布局
 */
class BasicLayout extends Component{

    render(){
        return (
            <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout
```

看下效果:

![](https://imgchr.github.la/20190220225408_WuGhjB_Screenshot.png)

接下来使用 `{props.children}` 来填充 Content 标签中的内容:

```js
<Content>`{props.children}`</Content>
```

在添加一些样式:

```js
import {Component} from 'react';
import {Layout} from 'antd';

const {Header,Footer,Sider,Content} = Layout;


/**
 * 定义一个基本布局
 */
class BasicLayout extends Component{

    render() {
        return (
            <Layout>
            <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
            Sider
            </Sider>
            <Layout >
            <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    {this.props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
        )
    }
}

export default BasicLayout
```


## 配置路由

上面配置好了 ant 基本布局，接下来需要配置路由信息:

```js
    routes: [{
        /**
         * 把路由对应的组件渲染到布局(容器)中去
         */
        path: '/',
        component: '../layout',
        routes: [
            {
                path: '/',
                component: './HelloWorld',
            }
        ]
    }]
```

这里把之前的卡片页面放进来了，看看效果:

![](https://imgchr.github.la/20190220225907_ncmt1m_Screenshot.png)

## 侧边导航

接下来使用 `Menu` 标签填充左边的 `Sidebar` :

```js
import {Component} from 'react';
import {Layout,Menu,Icon} from 'antd';
import {Link} from 'umi';

// import Link from 'umi/link';

const {Header,Footer,Sider,Content} = Layout;
const SubMenu = Menu.SubMenu;

/**
 * 定义一个基本布局
 */
class BasicLayout extends Component{

    render(){
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Helloworld</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}>
                            <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                    {/* <Content>Content</Content> */}
                    <Content  style={{ margin: '24px 16px 0' }}><div  style={{ padding: 24, background: '#fff', minHeight: 360 }}>{ this.props.children }</div></Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout
```

启动浏览器 看下效果:

![](https://imgchr.github.la/20190220230109_70MkXx_Screenshot.png)

这里的 `Link` 标签 相当于 `a` 标签。

菜单创建完成后，我们需要完成点击菜单能够进行跳转，先创建需要的页面文件:

```bash
cd page
mkdir Dashboard
touch Analysis.js
touch Monitor.js
touch Workplace.js
```

这里的页面内容如下:

```js
import React from 'react'

class Monitor extends React.Component{

    render(){
        return (
            <h1>模块名称 Page</h1>
        )
    }
}

export default Monitor
```


接下来配置下路由:

```js
    routes: [{
        /**
         * 把路由对应的组件渲染到布局(容器)中去
         */
        path: '/',
        component: '../layout',
        routes: [
            {
                path: '/',
                component: './HelloWorld',
            },
            {
                page: '/dashboard',
                routes: [
                    {path: '/dashboard/analysis',component: 'Dashboard/Analysis'},
                    {path: '/dashboard/monitor',component: 'Dashboard/Monitor'},
                    {path: '/dashboard/workplace',component: 'Dashboard/Workplace'}
                ]
            }
        ]
    }]
```

这里配置的含义如下:

当访问 '/' 时，通过 `layout/index.js`，默认展示 `HelloWorld` 组件
访问 '/dashboard/analysis` 时 通过 `Dashboard/Analysis` 进行渲染 
... 以此类推

![](https://imgchr.github.la/20190220230540_9VvOHQ_Screenshot.png)

一个简单的导航栏就完成了。

