import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Identity extends Component{
constructor(props){
    super(props);
    this.state = {
        playerArray:[],
        myIndex:-1,
        identity:'',
        mordredIndex:-1,
        oberonIndex:-1,
        redirect:false,
        phase:''
    }
socket.on('provide-identities',data=>{
this.setState({playerArray:data.playerArray,myIndex:data.playerArray.findIndex(element=>element.name==this.props.match.params.name)})
console.log('this.state.playerArray',this.state.playerArray)
console.log('this.state.playerArray[this.state.myIndex:',this.state.playerArray[this.state.myIndex])
this.setState({identity:this.state.playerArray[this.state.myIndex].identity})
this.setState({mordredIndex:this.state.playerArray.findIndex(element=>element.identity=='Mordred'),oberonIndex:this.state.playerArray.findIndex(element=>element.identity=='Oberon')})

})

socket.on('go-here',data=>{
    if (data.name == this.props.match.params.name){
        this.setState({phase:data.phase})
        this.setState({redirect:true})
    }
})
}

componentDidMount(){
    setTimeout(()=>{
        socket.emit("join-room",{room:this.props.match.params.room})
        socket.emit('request-identities',{room:this.props.match.params.room});
    },1500)
}

displayMerlinKnowledge(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.loyalty=='evil' && element.identity != 'Mordred'){
            return (<div>
                <h4>{index + 1} {element.name}</h4>
            </div>)
        }
    })
}

displayMordredForMerlin(){
    if (this.state.mordredIndex != -1){
        return (<div>
            <h4>? Some Unknown Player</h4>
        </div>)
    }
}

displayPercivalKnowledge(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.identity == 'Merlin' || element.identity == 'Morgana'){
            return (<div>
                <h4>{index + 1} {element.name}</h4>
            </div>)
        }
    })
}

displayOberonForEvil(){
if (this.state.oberonIndex != -1){
    return (<div>
        <h4>? Some Unknown Player Oberon</h4>
    </div>)
}
}

displayEvilForEvil(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.loyalty=='evil' && element.identity != 'Oberon' && index != this.state.myIndex){
            return (<div>
                <h4>{index + 1} {element.name} {element.identity}</h4>
            </div>)
        }
    })
}

displayIdentityInformation(){
    if (this.state.identity == 'Loyal Servant Of King Arthur'){
        return <div>
            <h1>Your Identity: Loyal Servant Of King Arthur</h1>
            <h3>Your Loyalty: Good</h3>
            <h4>You want 3 out of 5 quests to succeed.  You also want the evil characters to incorrectly guess who Merlin is.</h4>
        </div>
    }else if (this.state.identity == 'Merlin'){
        return <div>
            <h1>Your Identity: Merlin</h1>
            <h3>Your Loyalty: Good</h3>
            <h4>You get to know the evil character, except Mordred when he's playing.</h4>
            <h4>If the Assassin correctly guesses which good character is Merlin at the end of the game, evil wins.</h4>
            <h3>The evil characters are as follows:</h3>
            {this.displayMerlinKnowledge()}
            {this.displayMordredForMerlin()}
        </div>
    }else if (this.state.identity == 'Percival'){
        return <div>
            <h1>Your Identity: Percival</h1>
            <h3>Your Loyalty: Good</h3>
            <h4>You're supposed to know who Merlin is.  However if Morgana is playing, she will try to trick you into thinking she is Merlin</h4>
            <h4>You want the evil characters to incorrectly guess who Merlin is.</h4>
            <h3>Merlin or Merlin and Morgana is as follows:</h3>
            {this.displayPercivalKnowledge()}
        </div>
    }else if (this.state.identity == 'Assassin'){
        return <div>
            <h1>Your Identity: Assassin</h1>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>You win by either having 3 out of 5 quests fail or by correctly guessing who Merlin is at the end of the game.</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Morgana'){
        return <div>
            <h1>Your Identity: Morgana</h1>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>Your advantage is that whatever character is Percival thinks you might be Merlin</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Mordred'){
        return <div>
            <h1>Your Identity: Mordred</h1>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>Your advantage is that you are the one evil character Merlin is unaware of</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Oberon'){
        return <div>
            <h1>Your Identity: Oberon</h1>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>Your disadvantage is that you are unaffiliated with the rest of the evil characters</h4>
            <h3>You start the game knowing nothing</h3>
        </div>
    }
}

redirect(){
    if (this.state.redirect){
        if (this.state.phase == 'propose'){
            return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }
    }
}

makeRedirectTrue(){
    socket.emit('where-do-i-go',{room:this.props.match.params.room,name:this.props.match.params.name})
}

render(){
    return(
        <div>
        {this.displayIdentityInformation()}
        {this.redirect()}
        <button onClick={()=>this.makeRedirectTrue()}>Enter Game</button>
        </div>
    )
}

}

export default Identity;