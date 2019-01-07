import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setRoomCode,getRoomCode} from '../dux/reducer.js'
import io from 'socket.io-client';

const socket = io.connect();

class Play extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false,
        name:'',
        image:''
    }
    socket.on("permission-granted",data=>{
        if (this.state.name == data.name){
            this.setState({redirect:true})
        }
    })
}

handleChange(e){
    this.setState({
        room:e.target.value.toUpperCase()
    })
}

handleChange2(e){
    this.setState({
        name:e.target.value
    })
}

handleChange3(e){
    this.setState({
        image:e.target.value
    })
}

makeRedirectTrue(){
    socket.emit('join-room',{room:this.state.room});
    setTimeout(()=>{
        socket.emit('request-to-join',{room:this.state.room,name:this.state.name,image:this.state.image});
    },1000)
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/playerawait/${this.state.room}/${this.state.name}`}/>
    }
}

render(){
    return(<div>
        <h1>Player</h1>
        {this.redirect()}
        <h4>Room Code:<input value = {this.state.room} onChange={e=>this.handleChange(e)}/></h4>
        <h4>Unique Name:<input maxlength='10' value = {this.state.name} onChange={e=>this.handleChange2(e)}/></h4>
        <h4>Image (optional):<input value = {this.state.image} onChange={e=>this.handleChange3(e)}/></h4>
        <button onClick = {()=>this.makeRedirectTrue()}>Join Room</button>
    </div>)
}
}

const mapStateToProps = state => {const {room} = state; return state;};

export default connect(mapStateToProps,{setRoomCode,getRoomCode})(Play);