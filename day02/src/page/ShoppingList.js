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
                    {this.props.children}
                </ul>
            </div>
        )
    }
}


//导出组件
export default ShoppingList