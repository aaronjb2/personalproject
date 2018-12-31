import React, {Component} from 'react';
import io from 'socket.io-client';
import {Link, Redirect} from 'react-router-dom'

const socket = io.connect();

class CastVote extends Component{
constructor(props){
    super(props);

    this.state={
        playerArray:[],
        onQuestArray:[],
        voted:false,
        redirect:false
    }

    socket.on('here-are-the-people',data=>{
        if (data.name == this.props.match.params.name){
            this.setState({onQuestArray:data.onQuestArray,playerArray:data.playerArray,voted:data.voted})
        }
    })

    socket.on('hang-out',data=>{
        console.log('inside hangout')
        this.setState({redirect:true})
    })

}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    socket.emit('who-is-on-the-quest',{room:this.props.match.params.room,name:this.props.match.params.name});
}

displayOnQuestArray(){
    if (this.state.onQuestArray.length>0){
        return this.state.onQuestArray.map((element,index,arr)=>{
            return <h4>{element} {this.state.playerArray[element-1].name}</h4>
        })
    }
}

castVote(vote){
    socket.emit("cast-vote",{room:this.props.match.params.room,name:this.props.match.params.name,vote})
}

displayVotingOptions(){
    if (this.state.voted){
        return <h4>Wait till everyone is done voting</h4>
    }else{
        return (
            <div>
            <h4><button onClick={()=>this.castVote('approve')}>Approve</button></h4>
            <h4><button onClick={()=>this.castVote('reject')}>Reject</button></h4>
            </div>
        )
    }
}

render(){
    return (
    <div className = 'germany'>
        <div className='a-tiny-bit-of-space'></div>
        <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
        <h4>Do you approve or reject the following individuals going on a quest?</h4>
        {this.displayOnQuestArray()}
        {this.displayVotingOptions()}
        {this.redirect()}
    </div>)
}
}

export default CastVote