import React, {Component} from 'react';
import io from 'socket.io-client';
import {Link, Redirect} from 'react-router-dom';
import images from './images.js';
import './Propose.css';

const socket = io.connect();

class CastVote extends Component{
constructor(props){
    super(props);

    this.state={
        playerArray:[],
        onQuestArray:[],
        randomNumber:0,
        voted:true,
        redirect:false,
        redirectPropose:false,
        redirectExecute:false,
        redirectKillMerlin:false,
        redirectHangout:false,
        redirectGameDone:false
    }

    socket.on('here-are-the-people',data=>{
        if (data.name == this.props.match.params.name){
            this.setState({onQuestArray:data.onQuestArray,playerArray:data.playerArray,voted:data.voted})
            console.log('this.state.playerArray:',this.state.playerArray)
            console.log('this.state.onQuestArray:',this.state.onQuestArray)
        }
    })

    socket.on('hang-out',data=>{
        console.log('inside hangout')
        this.setState({redirect:true})
    })

    socket.on('this-is-the-place-to-be',data=>{
        if (data.name === this.props.match.params.name){
            if (data.phase != 'vote'){
                if (data.phase === 'propose'){
                    this.setState({redirectPropose:true})
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

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

componentDidMount(){
    this.setState({randomNumber:Math.floor(Math.random() * Math.floor(2))});
    socket.emit('join-room',{room:this.props.match.params.room})
        socket.emit('who-is-on-the-quest',{room:this.props.match.params.room,name:this.props.match.params.name});
        setTimeout(()=>{
            socket.emit("is-this-the-place-to-be",{room:this.props.match.params.room,name:this.props.match.params.name})
        },300)
}

displayOnQuestArray(){
    if (this.state.onQuestArray.length>0){
        return this.state.onQuestArray.map((element,index,arr)=>{
            return <h4>{element} {this.state.playerArray[element-1].name}</h4>
        })
    }
}

displayThoseOnQuest(){
    // return this.state.onQuestArray.map((element,index,arr)=>{
    //     return (<button onClick = {()=>this.shiftItem(element)}>{element} {this.state.playerArray[element-1].name}</button>)
    // })
    return this.state.onQuestArray.map((element,index,arr)=>{
        return (<div className='button-holder'>
            <button id='te' disabled = {true}>{element} {this.state.playerArray[element-1].name}</button>
        </div>)
    })
}

castVote(vote){
    socket.emit("cast-vote",{room:this.props.match.params.room,name:this.props.match.params.name,vote})
}

displayVotingOptions(){
    if (this.state.voted){
        return <h4>Wait till everyone is done voting</h4>
    }else{
        if (this.state.randomNumber === 0){
            return (
                <div className='fun-choices'>
                    <div className='i-approve-reject'>
                        <img src={images.thumbUp} id='me-me-approves' className='approve-reject-symbol' alt/>
                        <h4><button onClick={()=>this.castVote('approve')}>Approve</button></h4>
                    </div>
                    <div className='separator'>
                    </div>
                    <div className='i-approve-reject'>
                        <img src={images.thumbDown} className='approve-reject-symbol' alt/>
                        <h4><button onClick={()=>this.castVote('reject')}>Reject</button></h4>
                    </div>
                </div>
            )
        }else{
        return (
            <div className='fun-choices'>
                <div className='i-approve-reject'>
                    <img src={images.thumbDown} className='approve-reject-symbol' alt/>
                    <h4><button onClick={()=>this.castVote('reject')}>Reject</button></h4>
                </div>
                <div className='separator'>
                </div>
                <div className='i-approve-reject'>
                    <img src={images.thumbUp} id='me-me-approves' className='approve-reject-symbol' alt/>
                    <h4><button onClick={()=>this.castVote('approve')}>Approve</button></h4>
                </div>
            </div>
        )
        }
    }
}

redirectPropose(){
    if (this.state.redirectPropose){
        return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
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
    return (
    <div className = 'germany'>
        <div className='a-tiny-bit-of-space'></div>
        <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
        <h4>Do you approve or reject the following individuals going on a quest?</h4>
        <div className='tu'>
            {this.displayThoseOnQuest()}
        </div>
        {this.displayVotingOptions()}
        {this.redirect()}
        {this.redirectExecute()}
        {this.redirectGameDone()}
        {this.redirectHangout()}
        {this.redirectKillMerlin()}
        {this.redirectPropose()}
    </div>)
}
}

export default CastVote