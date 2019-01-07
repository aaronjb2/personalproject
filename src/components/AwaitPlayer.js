import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame} from '../dux/reducer.js'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './AwaitPlayer.css';
import images from './images.js';
import io from 'socket.io-client';

const socket = io.connect();

class AwaitPlayer extends Component{
constructor(props){
    super(props);
    this.state={
        room:'',
        redirect:false,
        playerArray: [],
        imagesArray: [],
        redirectToOpeningMenu:false
    }

    socket.on('request-to-join',data=>{

        if (this.state.playerArray.findIndex(element=>element == data.name) == -1 && this.state.playerArray.length < 10){
                if (data.room === this.props.match.params.room){
                    let arr = this.state.playerArray.slice();
                    let err = this.state.imagesArray.slice();
                    arr.push(data.name);
                    err.push(data.image);
                    this.setState({playerArray:arr,imagesArray:err});
                    console.log(this.state.playerArray)
                    socket.emit('join-room',{data:this.props.match.params.room})
                    socket.emit("permission-granted",{room:this.props.match.params.room,name:data.name});
                    console.log('io.sockets.sockets[socket]',io);
                }
            
        }
    })
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    
}

handleChange(e){
    this.setState({
        room:e.target.value
    })
}

async makeRedirectTrue(){
    this.props.startGame(this.props.match.params.room,this.state.playerArray.map((element,index)=>{return {name:element,image:this.state.imagesArray[index]}}));
    setTimeout(async ()=>{
        await axios.put(`/api/setplayersup/`,
        {
            room:this.props.match.params.room,
            player1name:this.props.playerArray[0].name,
            player1identity:this.props.playerArray[0].identity,
            player2name:this.props.playerArray[1].name,
            player2identity:this.props.playerArray[1].identity,
            player3name:this.props.playerArray[2].name,
            player3identity:this.props.playerArray[2].identity,
            player4name:this.props.playerArray[3].name,
            player4identity:this.props.playerArray[3].identity,
            player5name:this.props.playerArray[4].name,
            player5identity:this.props.playerArray[4].identity,
            player6name:this.props.playerArray[5]?this.props.playerArray[5].name:null,
            player6identity:this.props.playerArray[5]?this.props.playerArray[5].identity:null,
            player7name:this.props.playerArray[6]?this.props.playerArray[6].name:null,
            player7identity:this.props.playerArray[6]?this.props.playerArray[6].identity:null,
            player8name:this.props.playerArray[7]?this.props.playerArray[7].name:null,
            player8identity:this.props.playerArray[7]?this.props.playerArray[7].identity:null,
            player9name:this.props.playerArray[8]?this.props.playerArray[8].name:null,
            player9identity:this.props.playerArray[8]?this.props.playerArray[8].identity:null,
            player10name:this.props.playerArray[9]?this.props.playerArray[9].name:null,
            player10identity:this.props.playerArray[9]?this.props.playerArray[9].identity:null,
            teamLeader:this.props.teamLeader,
            player1image:this.props.playerArray[0]?this.props.playerArray[0].image:null,
            player2image:this.props.playerArray[1]?this.props.playerArray[1].image:null,
            player3image:this.props.playerArray[2]?this.props.playerArray[2].image:null,
            player4image:this.props.playerArray[3]?this.props.playerArray[3].image:null,
            player5image:this.props.playerArray[4]?this.props.playerArray[4].image:null,
            player6image:this.props.playerArray[5]?this.props.playerArray[5].image:null,
            player7image:this.props.playerArray[6]?this.props.playerArray[6].image:null,
            player8image:this.props.playerArray[7]?this.props.playerArray[7].image:null,
            player9image:this.props.playerArray[8]?this.props.playerArray[8].image:null,
            player10image:this.props.playerArray[9]?this.props.playerArray[9].image:null,
        })
        
        
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

displayPlayer1Div(){
    if (this.state.playerArray[0]){
        return (<div className = 'playerDiv' id = 'player1'>
        <div className = 'playerNumber'>1</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[0]?this.state.imagesArray[0]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[0]}</h1></div>
        </div>)
    }
    else{
        return (<div className = 'empty' id='empty1'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer2Div(){
    if (this.state.playerArray[1]){
        return (<div className = 'playerDiv' id = 'player2'>
        <div className = 'playerNumber'>2</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[1]?this.state.imagesArray[1]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[1]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty2'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer3Div(){
    if (this.state.playerArray[2]){
        return (<div className = 'playerDiv' id = 'player3'>
        <div className = 'playerNumber'>3</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[2]?this.state.imagesArray[2]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[2]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty3'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer4Div(){
    if (this.state.playerArray[3]){
        return (<div className = 'playerDiv' id = 'player4'>
        <div className = 'playerNumber'>4</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[3]?this.state.imagesArray[3]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[3]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty4'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer5Div(){
    if (this.state.playerArray[4]){
        return (<div className = 'playerDiv' id = 'player5'>
        <div className = 'playerNumber'>5</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[4]?this.state.imagesArray[4]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[4]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty5'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer6Div(){
    if (this.state.playerArray[5]){
        return (<div className = 'playerDiv' id = 'player6'>
        <div className = 'playerNumber'>6</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[5]?this.state.imagesArray[5]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[5]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty6'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer7Div(){
    if (this.state.playerArray[6]){
        return (<div className = 'playerDiv' id = 'player7'>
        <div className = 'playerNumber'>7</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[6]?this.state.imagesArray[6]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[6]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty7'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer8Div(){
    if (this.state.playerArray[7]){
        return (<div className = 'playerDiv' id = 'player8'>
        <div className = 'playerNumber'>8</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[7]?this.state.imagesArray[7]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[7]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty8'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer9Div(){
    if (this.state.playerArray[8]){
        return (<div className = 'playerDiv' id = 'player9'>
        <div className = 'playerNumber'>9</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[8]?this.state.imagesArray[8]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[8]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty9'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}
displayPlayer10Div(){
    if (this.state.playerArray[9]){
        return (<div className = 'playerDiv' id = 'player10'>
        <div className = 'playerNumber'>10</div>
        <div className="userIconDiv"><img className = 'userIcon' src = {this.state.imagesArray[9]?this.state.imagesArray[9]:images.userIcon} onError={images.userIcon} alt/></div>
        <div className="nameDiv"><h1 className="name">{this.state.playerArray[9]}</h1></div>
        </div>)
    }else{
        return (<div className = 'empty' id='empty10'>
            <h1 className = "available">Available Slot</h1>
        </div>)
    }
}

render(){
    return(<div>
        <h3>5-10 People Can Play</h3>
        <h4>Waiting For Players to Join the Room</h4>
        <hr></hr>
        {this.displayPlayer1Div()}
        {this.displayPlayer2Div()}
        {this.displayPlayer3Div()}
        {this.displayPlayer4Div()}
        {this.displayPlayer5Div()}
        {this.displayPlayer6Div()}
        {this.displayPlayer7Div()}
        {this.displayPlayer8Div()}
        {this.displayPlayer9Div()}
        {this.displayPlayer10Div()}
        <button onClick={()=>this.deleteGame()}>Abort</button><button disabled = {this.state.playerArray.length < 5} onClick={()=>this.makeRedirectTrue()}>All In</button>
        {this.redirect()}
        {this.redirectToOpeningMenu()}
    </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{startGame})(AwaitPlayer);

