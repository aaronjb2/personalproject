import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import images from './images.js';
import './Propose.css';
import io from 'socket.io-client';

const socket = io.connect();

class Execute extends Component{
constructor(props){
    super(props);

    this.state={
        onQuest:false,
        redirect:false,
        randomNumber:0,
        redirectPropose:false,
        redirectVote:false,
        redirectKillMerlin:false,
        redirectHangout:false,
        redirectGameDone:false
    }

    socket.on('you-belong-here',data=>{
        if (data.name == this.props.match.params.name){
            this.setState({onQuest:data.onQuest?true:false})
        }
    })

    socket.on('hang-out',data=>{
        console.log('inside hangout')
        this.setState({redirect:true})
    })

    socket.on('this-is-the-place-to-be',data=>{
        if (data.name === this.props.match.params.name){
            if (data.phase != 'execute'){
                if (data.phase === 'propose'){
                    this.setState({redirectPropose:true})
                }else if (data.phase === 'vote'){
                    this.setState({redirectVote:true})
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


componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    socket.emit('am-i-on-this',{room:this.props.match.params.room,name:this.props.match.params.name})
    this.setState({randomNumber:Math.floor(Math.random() * Math.floor(2))});
    setTimeout(()=>{
        socket.emit("is-this-the-place-to-be",{room:this.props.match.params.room,name:this.props.match.params.name})
    },300)
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

submitExecution(execution){
    socket.emit('submit-execution',{room:this.props.match.params.room,name:this.props.match.params.name,execution})
}

displayPertinentInformation(){
    if (this.state.onQuest){
        if (this.state.randomNumber === 0){
            return (
                <div className='fun-choices' id='ggg'>
                    <div className='i-approve-reject' id='jklm'>
                    <div id='ready-to-beleive-in-good' disabled={true}><img className='success-symbol' src={images.success} alt></img></div>
                        <button onClick={()=>this.submitExecution('success')}>Success</button>
                    </div>
                    
                    <div className='i-approve-reject' id='jklm'>
                        <div id='awesome-evil' disabled={true}><img className='success-symbol' src={images.fail} alt></img></div>
                        <button id='oh-me-so-evil' onClick={()=>this.submitExecution('fail')}>Fail</button>
                    </div>
                </div>
            )
        }else{
        return (
            <div className='fun-choices' id='ggg'>
                <div className='i-approve-reject' id='jklm'>
                    <div id='awesome-evil' disabled={true}><img className='success-symbol' src={images.fail} alt></img></div>
                    <button id='oh-me-so-evil' onClick={()=>this.submitExecution('fail')}>Fail</button>
                </div>
                
                <div className='i-approve-reject' id='jklm'>
                <div id='ready-to-beleive-in-good' disabled={true}><img className='success-symbol' src={images.success} alt></img></div>
                    <button onClick={()=>this.submitExecution('success')}>Success</button>
                </div>
            </div>
        )
        }
    }else{
        return (
            <div>
                <h4>Wait while everone on submits their success or fail</h4>
            </div>
        )
    }
}

redirectPropose(){
    if (this.state.redirectPropose){
        return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
redirectVote(){
    if (this.state.redirectVote){
        return <Redirect to={`/castvote/${this.props.match.params.room}/${this.props.match.params.name}`}/>
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
            <h4>Execute</h4>
            {this.state.onQuest?<h2>You are on the quest.  You must submit a success or fail.</h2>:null}
            {this.redirect()}
            {this.displayPertinentInformation()}
            {this.redirectGameDone()}
            {this.redirectHangout()}
            {this.redirectKillMerlin()}
            {this.redirectPropose()}
            {this.redirectVote()}
        </div>
    )
}
}

export default Execute;