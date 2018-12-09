import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class GameDone extends Component{
    constructor(props){
        super(props);

        this.state = {
            redirectHome:false,
            restartGame:false
        }

        socket.on('go-here',data=>{
            this.makeRedirectHomeTrue()
        })
    }

redirectHome(){
    if (this.state.redirectHome){
        return <Redirect to={`/`}/>
    }
}

makeRedirectHomeTrue(){
    this.setState({redirectHome:true});
}

restartGame(){
    if (this.state.restartGame){
        return <Redirect to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

makeRestartGameTrue(){
    this.setState({restartGame:true});
}

    render(){
        return ( <div>
<h1>The game is over.  Have the host start again or return to the opening menu.</h1>
        <button onClick={()=>this.makeRedirectHomeTrue()}>Main Menu</button>
        {this.redirectHome()}
        {this.restartGame()}
        </div>)
    }
}

export default GameDone;