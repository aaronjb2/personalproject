import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame} from '../dux/reducer.js'
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class AwaitPlayer extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false,
        playerArray: []
    }

    socket.on('request-to-join',data=>{
        if (this.state.playerArray.findIndex(element=>element == data.name) == -1 && this.state.playerArray.length < 10){
            let arr = this.state.playerArray.slice();
            arr.push(data.name);
            this.setState({playerArray:arr});
            console.log(this.state.playerArray)
            socket.emit('join-room',{data:this.props.match.params.room})
            socket.emit("permission-granted",{room:this.props.match.params.room,name:data.name});
        }
    })
}

componentDidMount(){
    socket.emit('join-room',{data:this.props.match.params.room})
    
}

handleChange(e){
    this.setState({
        room:e.target.value
    })
}

makeRedirectTrue(){
    this.props.startGame(this.props.match.params.room,this.state.playerArray.map(element=>{return {name:element}}))
    this.setState({
        redirect:true
    })
}

redirect(){
    if (this.state.redirect){

    }
}

displayStartButton(){
    if (this.state.playerArray.length > 4){
        return (
            <div>
                <button onClick={()=>this.makeRedirectTrue()}>Press to Start</button>
            </div>
        )
    }
}

displayPlayers(){
    return this.state.playerArray.map((element,index,arr)=>{
        return (
            <div>
            <h4>{index+1} {element}</h4>
            </div>
        )
    })
}

render(){
    return(<div>
        <h3>5-10 People Can Play</h3>
        <h4>Waiting For Players to Join the Room</h4>
        {this.displayPlayers()}
        {this.displayStartButton()}
        {this.redirect()}
    </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{startGame})(AwaitPlayer);