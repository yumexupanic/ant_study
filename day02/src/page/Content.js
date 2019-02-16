import React from 'React'
import ShoppingList from './ShoppingList'


/**
 * 这里创建一个组件并引入刚才的 `ShoppingList` 组件
 */
class Content extends React.Component{

    /**
     * 在标签上面的 `name` 是值 ，组件可以通过 `this.props.name` 进行接收 
     * 通过这种机制 React 组件可以接收外部消息
     */

    // render(){
    //     return  <ShoppingList name="😄"/>
    // }

    /**
     * 这里的自定义组件标签是闭合的，没有结束标签 因为组件没有其它参数 否则要写成下面这种形式: 
     */
    render(){
        return (
            <ShoppingList name="😄">
                <li>AliPay</li>
            </ShoppingList>
        )
    }

    /**
     * 在上面标签内容里面添加了一个 li 标签，这个内容可以在组件中通过 `{this.props.children}` 进行获取，这样我们就可以在组件中插入其它的元素。
     */

}

//导出 Content 组件
export default Content