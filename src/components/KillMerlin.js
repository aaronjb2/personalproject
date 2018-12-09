import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class KillMerlin extends Component{
constructor(props){
    super(props);

    this.state={
        playerArray:[],
        myRole:'',
        assassinIndex:-1,
        onChoppingBlock:-1,
        redirect:false
    }
    socket.on('this-is-your-role', data=>{
        if (data.name == this.props.match.params.name){
            this.setState({playerArray:data.playerArray,assassinIndex:data.playerArray.findIndex(element=>element.identity=='Assassin')});
            let a = this.state.playerArray.findIndex(element=>element.name==this.props.match.params.name);
            this.setState({myRole:this.state.assassinIndex==a?'assassin':this.state.playerArray[a].loyalty=='evil'?'evil':'good'})
        }
    })

    socket.on('hang-out',data=>{
        this.setState({redirect:true})
    })
}

componentDidMount(){
    socket.emit('join-room',{room:this.props.match.params.room})
    socket.emit('what-is-my-role',{room:this.props.match.params.room,name:this.props.match.params.name})
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}

displayPertinentStuff(){
    if (this.state.myRole == 'good'){
        return (
            <div>
                <h1>Hide your emotions and hope that Assassin incorrectly guesses who Merlin is</h1>
            </div>
        )
    }else if (this.state.myRole == 'evil') {
        return (
            <div>
                <h1>{this.state.playerArray[this.state.assassinIndex].name} is the Assassin.  Feel free to give them advice but they have the final say which good guy gets pegged as Merlin</h1>
            </div>
        )
    }else if (this.state.myRole == 'assassin'){
        return (
            <div>
                <h1>You are the Assassin.  Feel free to consult the other evil players.  When you are ready, select the good character you think is Merlin</h1>
                <h4>On Chopping Block:</h4>
                {this.displayGoodCharacterOnChoppingBlock()}
                <h4>And the rest:</h4>
                {this.displayGoodCharactersBelow()}
                {this.finalizeChoiceButton()}
            </div>
        )
    }
}

displayGoodCharacterOnChoppingBlock(){
    if (this.state.onChoppingBlock != -1){
        return <h2><button onClick={()=>this.removeFromChoppingBlock()}>{this.state.onChoppingBlock+1} {this.state.playerArray[this.state.onChoppingBlock].name}</button></h2>
    }
}

removeFromChoppingBlock(){
    this.setState({onChoppingBlock:-1});
    socket.emit('on-chopping-block',{room:this.props.match.params.room,onChoppingBlock:-1});
}

putOnChoppingBlock(index){
    if (this.state.onChoppingBlock == -1){
        this.setState({onChoppingBlock:index});
        socket.emit('on-chopping-block',{room:this.props.match.params.room,onChoppingBlock:index});
    }
}

finalizeChoice(){
    socket.emit('final-merlin-guess',{room:this.props.match.params.room,onChoppingBlock:this.state.onChoppingBlock})
}

finalizeChoiceButton(){
    if (this.state.onChoppingBlock != -1){
        return (
            <div>
                <h4><button onClick={()=>this.finalizeChoice()}>Final Choice</button></h4>
            </div>
        )
    }
}

displayGoodCharactersBelow(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (this.state.playerArray[index].loyalty=='good' && index != this.state.onChoppingBlock){ 
            return (
                <div>
                    <h4><button onClick={()=>this.putOnChoppingBlock(index)}>{index+1} {this.state.playerArray[index].name}</button></h4>
                </div>
            )
        }
    })
}

    render(){
        return (
        <div>
            <h1>Kill Merlin</h1>
            {this.displayPertinentStuff()}
            {this.redirect()}
        </div>
        )
    }
}

export default KillMerlin;