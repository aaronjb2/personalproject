import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import './Propose.css';
import io from 'socket.io-client';

const socket = io.connect();

class Propose extends Component{
constructor(props){
    super(props);

    
    this.state = {
        playerArray:[],
        teamLeader:-1,
        numberOfPeopleThatCanGo:3,
        onQuestArray:[],
        notOnQuestArray:[],
        displayCommenceVotingButton:false,
        redirectToVote:false,
        b:[],
        redirectExecute:false,
        redirectKillMerlin:false,
        redirectHangout:false,
        redirectGameDone:false
    }

    socket.on('this-is-team-leader',data=>{
        console.log('inside this is team leader')
        if (this.props.match.params.name == data.name){
            console.log('data:',data)
            this.setState({playerArray:data.playerArray,numberOfPeopleThatCanGo:data.numberOfPeopleThatCanGo,teamLeader:data.teamLeader})
            console.log(this.state.playerArray)
            let k = [];
            for (let i = 0; i < this.state.numberOfPeopleThatCanGo; i++){
                k.push('');
            }
            setTimeout(()=>{
                this.setState({b:k})
            },100)
            let notOnQuest = [];
            this.state.playerArray.forEach((element,index,arr)=>{
                notOnQuest.push(index+1)
            })
            this.setState({notOnQuestArray:notOnQuest})
        }
    })

    socket.on('come-vote',data=>{
        this.setState({redirectToVote:true})
    })

    socket.on('this-is-the-place-to-be',data=>{
        if (data.name === this.props.match.params.name){
            if (data.phase != 'propose'){
                if (data.phase === 'vote'){
                    this.setState({redirectToVote:true})
                }else if (data.phase === 'execute'){
                    this.setState({redirectExecute:true})
                }else if (data.phase === 'killMerlin'){
                    this.setState({redirectKillMerlin:true})
                }else if (data.phase === 'evilVictory' || data.phase === 'goodVictory'){
                    this.setState({redirectGameDone:true})
                }else{
                    this.setState({redirectHangout:true})
                }
            }
        }
    })
}

displayPertinentStuff(){
    if (this.state.teamLeader == this.state.playerArray.findIndex(element=>element.name==this.props.match.params.name)+1){
        return (<div>
            <h1>You are teamLeader</h1>
            <h3>Select {this.state.numberOfPeopleThatCanGo} for the quest</h3>
            <button disabled={this.state.numberOfPeopleThatCanGo != this.state.onQuestArray.length} onClick = {()=>this.commenceVoting()}>Let's Vote</button>
            <h4 className='b'>People on Quest:</h4>
            <div className='container-for-quest-people'>
                {this.displayThoseOnQuest()}
            </div>
            <h4 className='c'>People not on Quest:</h4>
            <div className='container-for-rest'>
                {this.displayThoseOffQuest()}
            </div>
        </div>)
    }else{
        return (<div>
            <h1>Wait while teamLeader picks a team</h1>
        </div>)
    }
}

displayThoseOnQuest(){
    // return this.state.onQuestArray.map((element,index,arr)=>{
    //     return (<button onClick = {()=>this.shiftItem(element)}>{element} {this.state.playerArray[element-1].name}</button>)
    // })
    return this.state.b.map((element,index,arr)=>{
        return (<div className='button-holder'>
            {this.state.onQuestArray[index]?<button onClick = {()=>this.shiftItem(this.state.onQuestArray[index])}>{this.state.onQuestArray[index]} {this.state.playerArray[this.state.onQuestArray[index]-1].name}</button>:null}
        </div>)
    })
}

displayThoseOffQuest(){
    // return this.state.notOnQuestArray.map((element,index,arr)=>{
    //     return (<button onClick = {()=>this.shiftItem(element)}>{element} {this.state.playerArray[element-1].name}</button>)
    // })
    return this.state.playerArray.map((element,index,arr)=>{
        return (<div className='button-holder'>
            {this.state.onQuestArray.findIndex((el,i,ar)=>el === index+1) === -1?<button onClick = {()=>this.shiftItem(index + 1)}>{index + 1} {element.name}</button>:null}
        </div>)
    })
}

async shiftItem(value){
let onIndex = this.state.onQuestArray.findIndex(element=>element==value)
let offIndex = this.state.notOnQuestArray.findIndex(element=>element==value)
let on = this.state.onQuestArray.slice();
let off = this.state.notOnQuestArray.slice();
if (onIndex == -1){
    if (this.state.onQuestArray.length < this.state.numberOfPeopleThatCanGo){
        on.push(value);
        off.splice(offIndex,1)
        await this.setState({onQuestArray:on.sort(),notOnQuestArray:off})
    }
}
else if (offIndex == -1){
off.push(value);
on.splice(onIndex,1)
await this.setState({onQuestArray:on,notOnQuestArray:off.sort()})
}
socket.emit('alter-those-on-quest',{room:this.props.match.params.room,onQuestArray:this.state.onQuestArray,notOnQuestArray:this.state.notOnQuestArray})
this.setState({displayCommenceVotingButton:this.state.numberOfPeopleThatCanGo == this.state.onQuestArray.length?true:false})
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    socket.emit('who-is-team-leader',{room:this.props.match.params.room,name:this.props.match.params.name})
    setTimeout(()=>{
        socket.emit("is-this-the-place-to-be",{room:this.props.match.params.room,name:this.props.match.params.name})
    },300)
}

displayCommenceVotingButton(){
    if (this.state.displayCommenceVotingButton){
        return(<div>
            <button onClick = {()=>this.commenceVoting()}>Let's Vote</button>
        </div>)
    }
}

commenceVoting(){
    socket.emit('commence-voting',{room:this.props.match.params.room})
}

redirectToVote(){
    if (this.state.redirectToVote){
        return <Redirect to={`/castvote/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
redirectExecute(){
    if (this.state.redirectExecute){
        return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
redirectKillMerlin(){
    if (this.state.redirectKillMerlin){
        return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
redirectGameDone(){
    if (this.state.redirectGameDone){
        return <Redirect to={`/gamedone/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
redirectHangout(){
    if (this.state.redirectHangout){
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

    render(){
        return (<div className = 'germany'>
        <div className='a-tiny-bit-of-space'></div>
            <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
            {this.displayPertinentStuff()}
            {this.redirectToVote()}
            {this.redirectExecute()}
            {this.redirectGameDone()}
            {this.redirectHangout()}
            {this.redirectKillMerlin()}
        </div>
            )
    }
}

export default Propose;