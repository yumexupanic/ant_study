//import MyInput from './input'

import react from 'react'
import MyInput from './input_master'

/**
 * 受控组件 和 非受控组件
 */
class Demo extends React.Component{

    state = {
        text: ''
    }

    onTextChange = (event) => {
        console.log(event.target.value)
        this.setState({text: event.target.value})
    }

    onReset = () => {
        this.setState({text: ''})
    }

    render(){
        return (
            <div>
                <MyInput onChange={this.onTextChange} value={this.state.text}/>
                <button onClick={this.onReset}>reset</button>
            </div>
        )
    }
}

export default Demo

