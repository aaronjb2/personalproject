import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class PlayerAwait extends Component{
constructor(props){
    super(props);

    this.state = {
        redirect:false
    }
    socket.on("come-inside",data=>{
        console.log('inside come inside')
        this.setState({redirect:true})
    })
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

makeRedirectTrue(){
    this.setState({redirect:true})
}

componentDidMount(){
    socket.emit("join-room",{room:this.props.match.params.room})
}

render(){
    return (
        <div><h4>Have the host press to start when the 5-10 players are in</h4>{this.redirect()}</div>
        
    )
}
}

export default PlayerAwait;