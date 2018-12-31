import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect();

class Execute extends Component{
constructor(props){
    super(props);

    this.state={
        onQuest:false,
        redirect:false
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

    
}


componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    socket.emit('am-i-on-this',{room:this.props.match.params.room,name:this.props.match.params.name})
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
        return <div>
            <h4>You are on the quest.  Do you wish to submit a success or a fail?</h4>
            <h4><button onClick = {()=>this.submitExecution('success')}>Success</button></h4>
            <h4><button onClick = {()=>this.submitExecution('fail')}>Fail</button></h4>
        </div>
    }else{
        return (
            <div>
                <h4>Wait while everone on submits their success or fail</h4>
            </div>
        )
    }
}

render(){
    return (
        <div className = 'germany'>
            <div className='a-tiny-bit-of-space'></div>
            <div className='redirect-carrier'><button><Link style={{ textDecoration: 'none' }} to={`/identity/${this.props.match.params.room}/${this.props.match.params.name}`}>Identity</Link></button><button><Link style={{ textDecoration: 'none' }} to={`/history/${this.props.match.params.room}/${this.props.match.params.name}`}>History</Link></button></div>
            <h4>Execute</h4>
            {this.redirect()}
            {this.displayPertinentInformation()}
        </div>
    )
}
}

export default Execute;