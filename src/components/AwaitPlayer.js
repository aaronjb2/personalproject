import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame} from '../dux/reducer.js'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class AwaitPlayer extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false,
        playerArray: [],
        redirectToOpeningMenu:false
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

async makeRedirectTrue(){
    this.props.startGame(this.props.match.params.room,this.state.playerArray.map(element=>{return {name:element}}));
    setTimeout(async ()=>{
        await axios.put(`/api/setplayersup/${this.props.match.params.room}/${this.props.playerArray[0].name}/${this.props.playerArray[0].identity}/${this.props.playerArray[1].name}/${this.props.playerArray[1].identity}/${this.props.playerArray[2].name}/${this.props.playerArray[2].identity}/${this.props.playerArray[3].name}/${this.props.playerArray[3].identity}/${this.props.playerArray[4].name}/${this.props.playerArray[4].identity}/${this.props.playerArray[5]?this.props.playerArray[5].name:null}/${this.props.playerArray[5]?this.props.playerArray[5].identity:null}/${this.props.playerArray[6]?this.props.playerArray[6].name:null}/${this.props.playerArray[6]?this.props.playerArray[6].identity:null}/${this.props.playerArray[7]?this.props.playerArray[7].name:null}/${this.props.playerArray[7]?this.props.playerArray[7].identity:null}/${this.props.playerArray[8]?this.props.playerArray[8].name:null}/${this.props.playerArray[8]?this.props.playerArray[8].identity:null}/${this.props.playerArray[9]?this.props.playerArray[9].name:null}/${this.props.playerArray[9]?this.props.playerArray[9].identity:null}/${this.props.teamLeader}`)
    },1500)
    this.setState({
        redirect:true
    })
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/displaygame/${this.props.match.params.room}`}/>
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

async deleteGame(){
await axios.delete(`/api/deletegame/${this.props.match.params.room}`);
this.setState({redirectToOpeningMenu:true})
}

redirectToOpeningMenu(){
    if (this.state.redirectToOpeningMenu){
        return <Redirect to={`/`}/>
    }
}

render(){
    return(<div>
        <h3>5-10 People Can Play</h3>
        <h4>Waiting For Players to Join the Room</h4>
        <hr></hr>
        <button onClick={()=>this.deleteGame()}>Delete Game</button>
        {this.displayPlayers()}
        {this.displayStartButton()}
        {this.redirect()}
        {this.redirectToOpeningMenu()}
    </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{startGame})(AwaitPlayer);