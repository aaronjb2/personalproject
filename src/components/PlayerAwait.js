import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class PlayerAwait extends Component{
constructor(props){
    super(props);
}

componentDidMount(){
    socket.emit("join-room",{room:this.props.match.params.room})
}

render(){
    return (
        <div><h4>Have the host press to start when the 5-10 players are in</h4></div>
    )
}
}

export default PlayerAwait;