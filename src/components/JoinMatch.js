import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

class JoinMatch extends Component {
    constructor(props){
        super(props);

        this.state={
            redirectBack:false,
            redirectToMatch:false,
            desiredMatchName:'',
            currentMatchName:'',
            desiredPlayerName:'',
            desiredPlayerPassword:'',
            desiredPlayerImage:'',
            showNavigateToPlay:false,
            currentNumberOfPlayersInGame:0,
            room:'myroom'
        }
        socket.on('player_number_change',data=>{
            console.log('inside player_number_change');
        });
    }

    handleUpdateMatchName(e){
        this.setState({
            desiredMatchName:e.target.value
        })
    }

    handleUpdatePlayerName(e){
        this.setState({
            desiredPlayerName:e.target.value
        })
    }

    handleUpdatePlayerPassword(e){
        this.setState({
            desiredPlayerPassword:e.target.value
        })
    }

    handleUpdatePlayerImage(e){
        this.setState({
            desiredPlayerImage:e.target.value
        })
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    async makeRedirectToMatchTrue(){
        console.log('this.state.redirectToMatch',this.state.redirectToMatch)
        let res = await axios.get(`/api/getplayers/${this.state.currentMatchName}`)
        if (res.data.numberofplayers === 10){
            alert("Sorry can't join this")
        }else{
            await axios.post(`/api/createplayer`,{matchName:this.state.currentMatchName,name:this.state.desiredPlayerName,password:this.state.desiredPlayerPassword,image:this.state.desiredPlayerImage})
            //socket.emit("join-room", { room: this.state.room });
            socket.emit("player_count_change",{});
            this.setState({
                currentNumberOfPlayersInGame:res.data.numberofplayers,
                redirectToMatch:true
            })
        }
    }

    makeShowNavigateToPlayTrue(){
        this.setState({
            showNavigateToPlay:true
        })
    }

    joinRoom(){
        socket.emit("join-room", { room: this.state.room });
    }

    displayNavigateToPlay(){
        if (this.state.showNavigateToPlay){
            return (
                <div>
                    <h3>The game does exist</h3>
                    <h4>name:<input value = {this.state.desiredPlayerName} onChange={e=>this.handleUpdatePlayerName(e)}/></h4>
                    <h4>password:<input value = {this.state.desiredPlayerPassword} onChange={e=>this.handleUpdatePlayerPassword(e)}/></h4>
                    <h4>image:<input value = {this.state.desiredPlayerImage} onChange={e=>this.handleUpdatePlayerImage(e)}/></h4>
                    <button onClick={()=>this.makeRedirectToMatchTrue()}>Proceed to {this.state.currentMatchName}</button>
                    <button onClick = {()=>this.joinRoom()}>join room</button>
                </div>
            )
        }
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/setupplaymatch`}/>
        }
    }

     renderRedirectToMatch(){
        if (this.state.redirectToMatch){
            if (this.state.currentNumberOfPlayersInGame === 10){
                alert('Sorry you cannot join this game.  It already has its limit of players or has already started');
                this.setState({redirectToMatch:false});
            }else{
                return <Redirect to={`/playerstartpendingscreen/${this.state.currentMatchName}/${this.state.desiredPlayerName}/${this.state.currentNumberOfPlayersInGame+1}`}/>
            }
        }
    }

    async findMatch(){
        let res = await axios.get(`/api/getmatch/${this.state.desiredMatchName}`);
        if (res.data.message==='Match Found'){
            this.setState({
                currentMatchName:this.state.desiredMatchName
            })
            this.setState({
                showNavigateToPlay:true
            })
        }else{
            alert("The match you typed in does not exist");
        }
    }

    componentDidMount(){
        socket.emit("join-room",{room:this.state.room});
    }

render(){
    return(
        <div>
            {this.renderRedirectBack()}
            {this.renderRedirectToMatch()}
            <h3>welcome to JoinMatch</h3>
            <h4>Game:<input value={this.state.desiredMatchName} onChange = {e=>this.handleUpdateMatchName(e)}/><button onClick={()=>this.findMatch()}>Find</button></h4>
            {this.displayNavigateToPlay()}
        <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
        </div>
    )
}
}

export default JoinMatch;