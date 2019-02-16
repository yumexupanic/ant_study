import react from 'React'


class MyInput extends React.Component{

    render(){
        return (
            <input onChange={this.props.onChange} value={this.props.value} />
        )
    }
}

export default MyInput

