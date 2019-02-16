
## 创建组件

> 万物皆组件

一个网页可以由很多个组件组成，比如网站的 `header/content/footer`，组件中也可以包含子组件。

使用组件的好处如下:

- 有利于细化 UI，不同的组件用于不同的功能点
- 代码复用，多个网页可以使用同一个组件

在 `react` 中，主要使用组件来构建网页，在 `HelloWorld` 中 是这样创建组件的:

```js
export default () => {
    return <div>hello world</div>
}
```

这里使用了 ES6 的语法，创建了一个 `div` 标签，之所以能够在 js 中写网页代码是因为 `react` 的 JSX 语法。这里就是最简单的组件创建。


## JSX 语法

把之前的 `HelloWorld.js` 放在浏览器中执行 确实会报错，因为这种语法并不是 `javascript`，而是 `react` 为了方便开发者自创的 `JSX` 语法。

JSX 可以被 `Babel` 转码器自动转换为正常的 JavaScript 语法，上面的代码转码后:

```js
exports.default = function () {
  return React.createElement(
    "div",
    null,
    "hello world"
  );
};
```

使用这种方式写不利于开发者，也不容易读取，JSX 语法更方便和容易读取。

在创建 JSX 语法的时候需要注意下面几个规则:

- 只能存在一个顶级标签

正确:

```js
export default () => {
    return <div><span>hello world</span></div>
}
```

错误:

```js
export default () => {
    return <span>hello</span><span>world</span>
}
```

- 标签一定要闭合

闭合标签有两种方式:

1. 使用结束标签 `</tag>`
2. 使用斜杠 `<tag>`

> 如果标签中不存在内容 可以使用第一种方式。

- 原生标签小些,自定义标签首字母大写

> 这个规则主要是分辨哪些是自定义标签 方便标示。

## React 组件语法

虽然 `HelloWorld` 完成了一个标签的创建，但是尽量使用标准的方式创建标签:

```js
import React from 'react'

//这是更标准正式的自定义标签写法

/**
 *  自定义组件必须要继承 React.Component 类 并实现 `render` 方法进行组件输出
 */
class ShoppingList extends React.Component{

    render(){
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instegram</li>
                    <li>WhatsApp</li>
                </ul>
            </div>
        )
    }
}

//导出组件
export default ShoppingList
```

> 自定义标签需要继承 `React.Component` 并实现 `render` 函数。

接下来看看如何使用自定义标签:

```js
import React from 'React'
import ShoppingList from './ShoppingList'

/**
 * 这里创建一个组件并引入刚才的 `ShoppingList` 组件
 */
class Content extends React.Component{
    render(){
        return (
            <ShoppingList name="😄"/>
        )
    }

}
export default Content
```

修改下路由配置,浏览器访问:

![](https://imgchr.github.la/20190216231754_ks4EV5_32D361FB-0865-4C6D-B838-3C6A11E94964.jpeg)

### 参数传递

在上面的例子中，使用了这样的语法来获取组件传递过来的参数:

```js
{this.props.name}
```

因为组件的通讯参数都是放在 `this.props` 属性上面，所以通过上面的方式就能够获取到 `name` 参数。

> 通过这种机制 React 组件可以接收外部的通讯

这里再介绍下比较特殊的属性:

```js
{this.props.children}
```

这个属性主要是传递组件内部的组件，标示当前组件包裹的所有内容，来看一个例子:

```js
import React from 'react'

class ShoppingList extends React.Component{

    render(){
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instegram</li>
                    <li>WhatsApp</li>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}
export default ShoppingList
```

这里使用了 `{this.props.children}` 来现实其它的列表

```js
import React from 'React'
import ShoppingList from './ShoppingList'

class Content extends React.Component{
    render(){
        return (
            <ShoppingList name="😄">
                <li>AliPay</li>
            </ShoppingList>
        )
    }

}
export default Content
```

可以看到我们给 `ShoppingList` 多添加了一个 `li` 标签，接下来看看输出:


![](https://imgchr.github.la/20190216231837_tjP4eh_AE842C7E-B4F9-42A1-98C7-3B49B5CA189C.jpeg)

没有什么能比这张图片表达的还要多了。


## 组件的状态

组件也应该有不同的状态信息，这些都被 React 记录在 `this.state` 这个属性上面:

```js
import react from 'React'


class MyInput extends React.Component{

    render(){
        return (
            <input onChange={this.props.onChange} value={this.props.value} />
        )
    }
}

export default MyInput
```


这里我们创建了一个自定义标签，功能是创建了一个 `<input>` 标签监听了 `change` 事件并设置了一个值。

这里是具体使用方式:

```js
import react from 'react'
import MyInput from './input'

class Demo extends React.Component{

    state = {
        text: ''
    }

    onTextChange = (event) => {
    }

    render(){
        return (
            <div>
                <MyInput onChange={this.onTextChange} value={this.state.text}/>
            </div>
        )
    }
}

export default Demo
```

打开浏览器，在输入框中输出一段文字 发现并没有效果 有点像不能输入内容的感觉，这是因为自定义标签的值我们没有维护:

也就是这段代码:
```js
value={this.props.value}
```

接下来修改下 `onTextChange` 函数:

```js
onTextChange = (event) => {
    this.setState({text: event.target.value})
}
```

接下来打开浏览器 发现可以正常输入了。

> 组件的所有状态 都是记录在 `this.state` 这个属性中。

## 受控组件和非受控组件

- 非受控组

不能直接管理组件状态，需要通过其它的方式进行管理。

看下这个例子，加入我们需要 `input` 标签加一个重置的功能:

```js
import react from 'react'
import MyInput from './input'

/**
 * 受控组件 和 非受控组件
 */
class Demo extends React.Component{

    state = {
        text: ''
    }

    onTextChange = (event) => {
        console.log(event.target.value)
    }

    onReset = () => {
        //?? 如何操作 
    }

    render(){
        return (
            <div>
                <MyInput onChange={this.onTextChange} />
                <button onClick={this.onReset}>reset</button>
            </div>
        )
    }
}

export default Demo
```

上面的重置看起来不太好实现，对于这种不能直接控制状态的组件，我们称之为“非受控组件”, 下面看看受控组件的实现方式:

```js
import react from 'react'
import MyInput from './input'

/**
 * 受控组件 和 非受控组件
 */
class Demo extends React.Component{

    state = {
        text: ''
    }

    onTextChange = (event) => {
       this.setState({text: event.target.value})
    }

    onReset = () => {
        this.setState({text: ''})
    }

    render(){
        return (
            <div>
                <MyInput onChange={this.onTextChange} />
                <button onClick={this.onReset}>reset</button>
            </div>
        )
    }
}

export default Demo
```

“受控”与“非受控”两个概念，区别在于这个组件的状态是否可以被外部修改。一个设计得当的组件应该同时支持“受控”与“非受控”两种形式，即当开发者不控制组件属性时，组件自己管理状态，而当开发者控制组件属性时，组件该由属性控制。而开发一个复杂组件更需要注意这点，以避免只有部分属性受控，使其变成一个半受控组件。

一个良好的组件应该是支持受控和非受控。


## 使用一个简单的 Antd 组件

需要先进行安装:

```bash
cnpm install --save antd
```

安装完毕之后，需要在 `umi` 配置文件中打开 `Antd` 组件:

```js
export default{
    plugins: [
        ['umi-plugin-react',{
            antd: true
        }]
    ],
    singular: true,
}
```

插件导入完毕之后 我们就可以直接使用了:

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

打开浏览器,查看效果:

![](https://imgchr.github.la/20190216231905_Egcihe_01FC99F3-E9D7-442C-93B4-A69322D80F55.jpeg)

配合之前的组件使用代码 你能看懂上面的代码吗？ 应该是很容易理解的。