import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect();

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
        return ( 
        <div className = 'germany'>
            <div className='a-tiny-bit-of-space'></div>
            <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
            <h1>The game is over.  Have the host start again or return to the opening menu.</h1>
            <button onClick={()=>this.makeRedirectHomeTrue()}>Main Menu</button>
            {this.redirectHome()}
            {this.restartGame()}
        </div>
        )
    }
}

export default GameDone;