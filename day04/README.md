## 使用 Model

这里主要介绍前端的分层，通常在服务端中会按照 MVC 方式来分层，M 代表 Model V 代表 View C 代表 Controller，一个请求通过 Controller 接收并使用 Model 进行处理 最终通过 View 进行内容渲染。

![](https://imgchr.github.la/20190221232349_DpmC34_Screenshot.png)

右边是前端的分层思想。

- Page 负责与用户直接沟通 渲染页面 接收用户的输入以及处理和用户的交互。
- Model 负责处理业务逻辑 为 Page 生成数据/存储状态以及数据的读写。
- Service 负责与 HTTP 接口对接 ，进行存粹的数据读写。

## Dva 介绍

在 umi 中，需要在配置中打开 Dva 配置:

```js
export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true,
    }],
  ],
}
```

Model 是前端分层中的中间力量，承上启下，负责数据(状态)的处理维护，在 React 中有主流的状态管理框架 [redux](https://redux.js.org/)/[mobx](https://mobx.js.org)，这里使用 Dva 来承担这个角色。


Dva 是基于 redux/redux-saga 和 redux-router 的轻量级前端框架以及最佳实践沉淀，其中 Model 是 Dva 最重要的概念:

- namespace: model 的命名空间 只能用字符串表示，一个项目可以创建很多 model 它们需要通过 namespace 来区分表示
- state: 当前 model 的状态 
- reducers: 用于处理同步操作 可以修改 state ，使用 action 触发 reducer 是一个纯函数 ，他接收当前的 state 和 action 对象 并返回一个新的 state 
- effects: 用于处理异步操作 (服务端的交互)和业务逻辑 和 reducers 的触发规则一样 ，但是它无法修改 state 必须要通过 action 通知 reducers 修改 state
- action: 是 reducers 和 effects 的触发器，它的参数是 `{ type: 'add', payload: todo }`  type 属性用来匹配 reducers 或者 effects ，payload 则是需要传递的参数。


## 创建一个卡片列表

先建立一个页面:

```js
import React,{Component} from 'react'
import {Card,Button} from 'antd'


class Puzzlecards extends React.Component{

    constructor(porps){
        super(porps)
        this.counter = 100;

        this.state = {
            cardList: [
                {
                    id: 1,
                    setup: 'Did you hear about the two silk worms in a race?',
                    punchline: 'It ended in a tie',
                },
                {
                    id: 2,
                    setup: 'What happens to a frog\'s car when it breaks down?',
                    punchline: 'It gets toad away',
                },
            ]
        }
    }

    addNewCard = () => {

    }

    render(){
        return (
            <div>
                {
                    this.state.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        )
                    })
                }
                <div>
                    <Button onClick={this.addNewCard}>添加卡片</Button>
                </div>
            </div>
        )
    }

}

export default Puzzlecards
```

修改下路由规则:

```js
routes: [{

    /**
     * 把路由对应的组件渲染到布局(容器)中去
     */
    path: '/',
    component: '../layout',
    routes: [
        {path: 'puzzlecards',component: './puzzlecards'},
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

效果图:

![](https://imgchr.github.la/20190221233810_lyV2SH_Screenshot.png)


接下来完成添加事件:

```js
addNewCard = () => {
    this.setState(prevState => {
        const prevCardList = prevState.cardList;
        this.counter += 1;
        const card = {
            id: this.counter,
            setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            punchline: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        };
        return {
            cardList: prevCardList.concat(card),
        };
        });
}
```

虽然实现了功能 但是这里并没有通过 Dva 来管理数据状态，好像也没有什么问题?

这里介绍下前端为什么要通过第三方框架来管理数据状态:

- 在实际开发中 这里的数据通常都是从服务端获取的，一般都是异步获取的。
- 我们希望把数据逻辑和试图逻辑放在不同的地方 [关注分离] 使代码更健壮
- 在必要的时候 也可以把这些数据给其它组件共享


## 使用 Dva 重写卡片

Dva 可以帮助我们把 state 都提升到所有组件之上 ，而在 React 中 子组件的状态可以上提到父组件中管理 Dva 也是一致的。

- 页面通过调用 dispatch 函数驱动更改 dva model state 数据
- 改变后的 dva model state 通过 connect 方法注入页面。

> 这里的注入是一种控制反转的实现(IOC)，实际则是 Dva 帮组我们管理这些数据 model 和数据的控制权在 Dva，如果我们想用到 加上一些声明就可以了，这种思想在 Spring 中非常出名 比如使用 `@Autowired` 进行注入 而我们不需要关心这是如何注入进来的。

接下来先创建 model 

```bash
mkdir model
cd model
touch puzzlecards.js
```

内容如下:

```js
export default {
    namespace: 'puzzlecards',
    state: {
        data: [
            {
                id: 1,
                setup: 'Did you hear about the two silk worms in a race????',
                punchline: 'It ended in a tie',
            },
            {
                id: 2,
                setup: 'What happens to a frog\'s car when it breaks down?',
                punchline: 'It gets toad away',
            },
        ],
        counter: 100,
    },
    effects: {
    },
    reducers: {
        addNewCard(state, { payload: newCard }) {
            const nextCounter = state.counter + 1;
            const newCardWithId = { ...newCard, id: nextCounter };
            const nextData = state.data.concat(newCardWithId);
            return {
              data: nextData,
              counter: nextCounter,
            };
        }
    }
}
```

这里 注意 dva model 的定义。一个基本的 dva model 最少具备两个成员：namespace 和 state。namespace 来作为一个 model 的唯一标识，state 中就是该 model 管理的数据。

接下来修改创建一个新的 devPuzzlecard.js

```js
import React,{Component} from 'react'
import {Card,Button} from 'antd'
import {connect} from 'dva'

const namespace = 'puzzlecards'

const mapStateToProps = (state) => {
    console.log(state)
    const cardList = state[namespace].data
    return {
        cardList
    }
}

@connect(mapStateToProps,mapDispatchToProps)
class PuzzleCardsPage extends React.Component{

    componentDidMount() {
        this.props.onDidMount()
    }

    render(){
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        )
                    })
                }
                <div>
                    <Button onClick={() => {this.props.onClickAdd({
                        setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        punchline: 'here we use dva',
                    })}}> 添加卡片 </Button>
                </div>
            </div>
        )
    }
}

export default PuzzleCardsPage
```

我们删除了组件本身的 state，同时添加了 @connect(mapStateToProps)。connect 是连接 dva 和 React 两个平行世界的关键，一定要理解。

- connect 让组件获取到两样东西：1. model 中的数据；2. 驱动 model 改变的方法。
- connect 本质上只是一个 javascript 函数，通过 @ 装饰器语法使用，放置在组件定义的上方；
- connect 既然是函数，就可以接受入参，第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫做 mapStateToProps，顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。通过实现这个函数，我们就能实现把 dva model 的 state 注入给组件。


这里 render 函数中通过 this.props.cardList 取到了数据，数据已经不再由组件自己管理

修改一下路由:

```js
routes: [{

    /**
     * 把路由对应的组件渲染到布局(容器)中去
     */
    path: '/',
    component: '../layout',
    routes: [
        {path: 'puzzlecards',component: './dvaPuzzlecards'},
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

接下来打开浏览器以及得到了第一步中的页面样子。














