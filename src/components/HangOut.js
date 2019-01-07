import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect();

class HangOut extends Component{
constructor(props){
    super(props);

    this.state={
        redirect:false,
        phase:'',
        redirectPropose:false,
        redirectVote:false,
        redirectExecute:false,
        redirectKillMerlin:false,
        redirectGameDone:false
    }

    socket.on('go-here',data=>{
        this.setState({phase:data.phase});
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
            }
        }
    })
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    setTimeout(()=>{
        socket.emit("is-this-the-place-to-be",{room:this.props.match.params.room,name:this.props.match.params.name})
    },300)
}

redirect(){
    if (this.state.redirect){
        if (this.state.phase=='propose'){
            return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='execute'){
            return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='killMerlin'){
            return <Redirect to={`/killmerlin/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase=='gameDone'){
            return <Redirect to={`/gamedone/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }
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

render(){
    return(<div className = 'germany'>
        <div className='a-tiny-bit-of-space'></div>
        <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
        <h4>Incoming Results</h4>
        {this.redirect()}
        {this.redirectExecute()}
        {this.redirectGameDone()}
        {this.redirectKillMerlin()}
        {this.redirectPropose()}
        {this.redirectVote()}
    </div>)
}
}

export default HangOut;