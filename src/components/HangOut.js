import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class HangOut extends Component{
constructor(props){
    super(props);

    this.state={
        redirect:false,
        phase:''
    }

    socket.on('go-here',data=>{
        this.setState({phase:data.phase});
        this.setState({redirect:true})
    })
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
}

redirect(){
    if (this.state.redirect){
        if (this.state.phase=='propose'){
            return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='execute'){
            return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='killMerlin'){
            return <Redirect to={`/killmerlin/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='gameDone'){
            return <Redirect to={`/gamedone/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }
    }
}


render(){
    return(<div>
        <h4>Incoming Results</h4>
        {this.redirect()}
    </div>)
}
}

export default HangOut;