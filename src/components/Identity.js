import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import io from 'socket.io-client';
import images from './images.js';
import Player from './Player.js';
import './Identity.css';

const socket = io.connect();

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
if (this.state.playerArray[this.state.myIndex]){this.setState({identity:this.state.playerArray[this.state.myIndex].identity})}
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
    socket.emit("join-room",{room:this.props.match.params.room})
    setTimeout(()=>{
        socket.emit('request-identities',{room:this.props.match.params.room});
    },1500)
}

displayMerlinKnowledge(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.loyalty=='evil' && element.identity != 'Mordred'){
            return (<div className='averagetime'>
                <Player players={this.state.playerArray} playerNumber = {index+1}></Player>
            </div>)
        }
    })
}

displayMordredForMerlin(){
    if (this.state.mordredIndex != -1){
        return (<div className='jkb'>
        <div className='averagetime'>
            <Player players={this.state.playerArray} playerNumber = {0}></Player>
        </div>
        <div className='box-for-displayer-of-identity-nonteamleader'>
            <img className='displayer-of-identity-nonteamleader' id='me-so-evil' src={images.mordred}></img>
        </div>
    </div>)
    }
}

displayPercivalKnowledge(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.identity == 'Merlin' || element.identity == 'Morgana'){
            return (
                <div className='jkb'>
                    <div className='averagetime'>
                        <Player players={this.state.playerArray} playerNumber = {index+1}></Player>
                    </div>
                    <div className='box-for-displayer-of-identity-nonteamleader'>
                        <img className='displayer-of-identity-nonteamleader' src={images.merlin}></img>
                    </div>
                </div>
        )
        }
    })
}

displayOberonForEvil(){
if (this.state.oberonIndex != -1){
    return (<div className='jkb'>
        <div className='averagetime'>
            <Player playerNumber = {0}></Player>
        </div>
        <div className='box-for-displayer-of-identity-nonteamleader'>
            <img className='displayer-of-identity-nonteamleader' id='me-so-evil' src={images.oberon}></img>
        </div>
    </div>)
}
}

displayEvilForEvil(){
    return this.state.playerArray.map((element,index,arr)=>{
        if (element.loyalty=='evil' && element.identity != 'Oberon' && index != this.state.myIndex){
            return (
            <div className='jkb'>
                <div className='averagetime'>
                    <Player players={this.state.playerArray} playerNumber = {index+1}></Player>
                </div>
                <div className='box-for-displayer-of-identity-nonteamleader'>
                    <img className='displayer-of-identity-nonteamleader' id='me-so-evil' src={element.identity==='Mordred'?images.mordred:element.identity==='Morgana'?images.morgana:element.identity==='Assassin'?images.assassin:images.unknownIdentity}></img>
                </div>
            </div>
    )
        }
    })
}

displayIdentityInformation(){
    if (this.state.identity == 'Loyal Servant Of King Arthur'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder' id='super-loyal-servant'>
                Loyal Servant Of King Arthur
            </div>
                <div className='identity-image-holder'>
                    <img className='b' src={images.loyalServantOfKingArthur} alt/>
                </div>
                <h1 id='loyal-servant'>Starts Knowledgeless</h1>
            </div>
            <h3>Your Loyalty: Good</h3>
            <h4>You want 3 out of 5 quests to succeed.  You also want the evil characters to incorrectly guess who Merlin is.</h4>
        </div>
    }else if (this.state.identity == 'Merlin'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Merlin
            </div>
                <div className='identity-image-holder'>
                    <img className='b' src={images.merlin} alt/>
                </div>
                <h1>Knows Evil</h1>
            </div>
            <h2>Your Loyalty: Good</h2>
            <h4>You get to know the evil character, except Mordred when he's playing.</h4>
            <h4>If the Assassin correctly guesses which good character is Merlin at the end of the game, evil wins.</h4>
            <h3>The evil characters are as follows:</h3>
            {this.displayMerlinKnowledge()}
            {this.displayMordredForMerlin()}
        </div>
    }else if (this.state.identity == 'Percival'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Percival
            </div>
                <div className='identity-image-holder'>
                    <img className='b' src={images.percival} alt/>
                </div>
                <h1>Knows Merlin</h1>
            </div>
            <h3>Your Loyalty: Good</h3>
            <h4>You're supposed to know who Merlin is.  However if Morgana is playing, she will try to trick you into thinking she is Merlin</h4>
            <h4>You want the evil characters to incorrectly guess who Merlin is.</h4>
            <h3>Merlin or Merlin and Morgana is as follows:</h3>
            {this.displayPercivalKnowledge()}
        </div>
    }else if (this.state.identity == 'Assassin'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Assassin
            </div>
                <div className='identity-image-holder' id='me-so-evil'>
                    <img className='b' src={images.assassin} alt/>
                </div>
                <h1>Seeks Merlin</h1>
            </div>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>You win by either having 3 out of 5 quests fail or by correctly guessing who Merlin is at the end of the game.</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Morgana'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Morgana
            </div>
                <div className='identity-image-holder' id='me-so-evil'>
                    <img className='b' src={images.morgana} alt/>
                </div>
                <h1>Appears as Merlin</h1>
            </div>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>Your advantage is that whatever character is Percival thinks you might be Merlin</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Mordred'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Mordred
            </div>
                <div className='identity-image-holder' id='me-so-evil'>
                    <img className='b' src={images.mordred} alt/>
                </div>
                <h1>Unknown to Merlin</h1>
            </div>
            <h3>Your Loyalty: Evil</h3>
            <h4>You want to sabatoge and fail the quests of the Loyal Servants Of King Arthur</h4>
            <h4>Your advantage is that you are the one evil character Merlin is unaware of</h4>
            <h3>The other evil characters you get to know are as follows:</h3>
            {this.displayEvilForEvil()}
            {this.displayOberonForEvil()}
        </div>
    }else if (this.state.identity == 'Oberon'){
        return <div className='a'>
            <h1>Your Identity:</h1>
            <div className='identity-holder'>
            <div className='identity-name-holder'>
                Oberon
            </div>
                <div className='identity-image-holder' id='me-so-evil'>
                    <img className='b' src={images.oberon} alt/>
                </div>
                <h1>Unknown to Evil</h1>
            </div>
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
    else if (this.state.phase == 'vote'){
        return <Redirect to={`/castvote/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }else if (this.state.phase == 'execute'){
        return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }else if (this.state.phase == 'killMerlin'){
        return <Redirect to={`/killmerlin/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }else if (this.state.phase == 'stare'){
    }else{
        return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
    }
}
}

makeRedirectTrue(){
    socket.emit('where-do-i-go',{room:this.props.match.params.room,name:this.props.match.params.name})
}

render(){
    return(
        <div>
            <div className='a-tiny-bit-of-space'></div>
            <button onClick={()=>this.makeRedirectTrue()}>Continue</button>
        {this.displayIdentityInformation()}
        {this.redirect()}
        </div>
    )
}

}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Identity);