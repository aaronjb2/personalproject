import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect();

class PlayerAwait extends Component{
constructor(props){
    super(props);

    this.state = {
        redirect:false,
        redirectPropose:false,
        redirectVote:false,
        redirectExecute:false,
        redirectKillMerlin:false,
        redirectHangout:false,
        redirectGameDone:false
    }
    socket.on("come-inside",data=>{
        console.log('inside come inside')
        this.setState({redirect:true})
    })

    socket.on('this-is-the-place-to-be',data=>{
        if (data.name === this.props.match.params.name){
            if (data.phase === 'propose'){
                this.setState({redirectPropose:true})
            }else if (data.phase === 'vote'){
                this.setState({redirectVote:true})
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
    })
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
redirect(){
    if (this.state.redirect){
        return <Redirect to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

makeRedirectTrue(){
    this.setState({redirect:true})
}

componentDidMount(){
    socket.emit("join-room",{room:this.props.match.params.room})
    setTimeout(()=>{
        socket.emit("is-this-the-place-to-be",{room:this.props.match.params.room,name:this.props.match.params.name})
    },300)
}

render(){
    return (
        <div><h4>Have the host press to start when the 5-10 players are in</h4>{this.redirect()}
        {this.redirectExecute()}
        {this.redirectGameDone()}
        {this.redirectHangout()}
        {this.redirectKillMerlin()}
        {this.redirectPropose()}
        {this.redirectVote()}
        </div>
        
    )
}
}

export default PlayerAwait;