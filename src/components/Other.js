import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setRoomCode,getRoomCode} from '../dux/reducer.js'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Other extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false,
        name:''
    }
    socket.on("permission-granted",data=>{
        console.log('inside permission granted')
        if (this.state.name == data.name){
            this.setState({redirect:true})
        }
    })
}

handleChange(e){
    this.setState({
        room:e.target.value
    })
}

handleChange2(e){
    this.setState({
        name:e.target.value
    })
}

makeRedirectTrue(){
    socket.emit('join-room',{room:this.state.room});
    setTimeout(()=>{
        socket.emit('request-to-join',{name:this.state.name});
    },1000)
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/playerawait/${this.state.room}/${this.state.name}`}/>
    }
}

render(){
    return(<div>
        <h4>Other</h4>
        {this.redirect()}
        <h4>Room Code:<input value = {this.state.room} onChange={e=>this.handleChange(e)}/></h4>
        <h4>Unique Name:<input value = {this.state.name} onChange={e=>this.handleChange2(e)}/></h4>
        <button onClick = {()=>this.makeRedirectTrue()}>Join Room</button>
    </div>)
}
}

const mapStateToProps = state => {const {room} = state; return state;};

export default connect(mapStateToProps,{setRoomCode,getRoomCode})(Other);