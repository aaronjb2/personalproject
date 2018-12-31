import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {setValues} from '../dux/reducer.js';
import Board from './Board.js';
import OnQuestTable from './OnQuestTable.js';
import NotOnQuestTable from './NotOnQuestTable.js';
import Player from './Player.js';
import './DisplayGame.css';
import io from 'socket.io-client';
import images from './images.js'
//import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const socket = io.connect();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

class DisplayGame extends Component{
constructor(props){
    super(props)

    this.state={
        phase:'stare',
        numberOfPeopleThatCanGo:3,
        selectedForQuest:[],
        notSelectedForQuest:[],
        displayQuestAndAttempt:false,
        displayQuestResults:false,
        displayAttempt:true,
        votesReceived:[],
        executionsReceived:[],
        randomOrderExecutionsReceived:[],
        voteResult:'',
        displayApproveVotes:false,
        displayRejectVotes:false,
        displayVoteResult:false,
        displayVoteApproveSign:false,
        displayVoteRejectSign:false,
        displayVoteResultSign:false,
        displayNumberOfSuccessesSign:false,
        displayNumberOfSuccesses:false,
        displayNumberOfFailsSign:false,
        displayNumberOfFails:false,
        displayExecutionResultSign:false,
        displayExecutionResult:false,
        numberOfSuccesses:0,
        numberOfFails:0,
        executionResult:'',
        onChoppingBlock:-1,
        redirect:false,
        quantitiesNeededArray:[],
        r:[],
        displayEachPlayerTakeSides:false,
        failsForParticularQuest:0,
        successesForParticularQuest:0,
        performExecution1:false,
        performExecution2:false,
        performExecution3:false,
        performExecution4:false,
        performExecution5:false,
        departExecution1:false,
        departExecution2:false,
        departExecution3:false,
        departExecution4:false,
        departExecution5:false,
        phaseOfExecutionLocation:2,
        madeFinalStab:false,
        showIdentityOfPersonStabbed:false,
        showIdentityOfPeopleNotStabbed:false
    }

    socket.on('request-identities',data=>{
        socket.emit('provide-identities',{playerArray:this.props.playerArray,room:this.props.match.params.room})
        socket.emit('join-room',{data:this.props.match.params.room})
    })

    socket.on('where-do-i-go',data=>{
        socket.emit('go-here',{room:this.props.match.params.room,phase:this.props.phase,name:data.name})
        socket.emit('join-room',{data:this.props.match.params.room})
    })

    socket.on('who-is-team-leader',data=>{
        socket.emit('this-is-team-leader',{room:this.props.match.params.room,teamLeader:this.props.teamLeader,playerArray:this.props.playerArray,name:data.name,numberOfPeopleThatCanGo:this.state.numberOfPeopleThatCanGo})
    })

    socket.on('alter-those-on-quest',data=>{
        this.setState({selectedForQuest:data.selectedForQuest,notSelectedForQuest:data.notSelectedForQuest})
    })

    socket.on('commence-voting',data=>{
        this.setState({phase:'vote'});
        socket.emit('come-vote',{room:this.props.match.params.room})
    })

    socket.on('who-is-on-the-quest',data=>{
        let index = this.props.playerArray.findIndex((element,index,arr)=>element.name==data.name);
        let voted = this.state.votesReceived[index] == 'approve' || this.state.votesReceived[index] == 'reject'?true:false;
        socket.emit('here-are-the-people',{room:this.props.match.params.room,onQuestArray:this.state.selectedForQuest,playerArray:this.props.playerArray,voted})
    })

    socket.on('cast-vote',async data=>{
        let index = this.props.playerArray.findIndex((element,index,arr)=>element.name==data.name);
        let newArr = this.state.votesReceived.slice();
        newArr[index]=data.vote;
        this.setState({votesReceived:newArr})
        socket.emit('here-are-the-people',{name:data.name,room:this.props.match.params.room,onQuestArray:this.state.selectedForQuest,playerArray:this.props.playerArray,voted:true})
        let indexOfMissing = this.state.votesReceived.findIndex(element=>element != 'reject' && element != 'approve');
        if (indexOfMissing == -1){
            let approves = 0;
            let rejects = 0;
            this.state.votesReceived.forEach(element=>{
                if (element == 'approve'){
                    approves++;
                }
                if (element == 'reject'){
                    rejects++;
                }
            })
            this.setState({displayQuestAndAttempt:false,displayQuestResults:false,voteResult:approves>rejects?'approve':'reject',phase:'votefun'})
            setTimeout(()=>{
                socket.emit('hang-out',{room:this.props.match.params.room})
                this.displayVoteOutcome()
                this.setState({displayEachPlayerTakeSides:true})
            },1000)
            
        }
    })

    socket.on('am-i-on-this',data=>{
        let playerIndex = this.props.playerArray.findIndex(element=>element.name == data.name);
        let index = this.state.selectedForQuest.findIndex(element=>element==playerIndex+1);
        if (index != -1){
            if (this.state.executionsReceived[index] == 'success' || this.state.executionsReceived[index] == 'fail'){
                index = -1;
            }
        }
        socket.emit('you-belong-here',{room:this.props.match.params.room,name:data.name,onQuest:index==-1?false:true})
    })

    socket.on('submit-execution',async data=>{
        let playerIndex = this.props.playerArray.findIndex(element=>element.name == data.name);
        let index = this.state.selectedForQuest.findIndex(element=>element==playerIndex+1);
        let arr = this.state.executionsReceived.slice();
        arr[index] = data.execution;
        this.setState({executionsReceived:arr.slice()})
        socket.emit('you-belong-here',{room:this.props.match.params.room,name:data.name,onQuest:false})
        let spot = this.state.executionsReceived.findIndex(element=>element != 'success' && element != 'fail');
        if (spot === -1){
            let shuffle = array => {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;
                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }
                return array;
              }
              this.setState({randomOrderExecutionsReceived:shuffle(this.state.executionsReceived)})
            let fails = 0;
            let successes = 0;
            for (let i = 0; i < this.state.executionsReceived.length; i++){
                if (this.state.executionsReceived[i] == 'success'){
                    successes++;
                }else if (this.state.executionsReceived[i] == 'fail'){
                    fails++;
                }
            }
            this.setState({numberOfFails:fails,numberOfSuccesses:successes,executionResult:fails==0 || (fails < 2 && this.props.quest == 4 && this.props.playerArray.length > 6)?'successful':'failed'})
            socket.emit('hang-out',{room:this.props.match.params.room})
            await this.setState({performExecution1:true})
            this.setState({phase:'executionfun'})
            this.displayResultOutcome()
            
        }
    })

    socket.on('what-is-my-role',data=>{
        socket.emit('this-is-your-role',{room:this.props.match.params.room,name:data.name,playerArray:this.props.playerArray})
    });

    socket.on('on-chopping-block',data=>{
        this.setState({onChoppingBlock:data.onChoppingBlock});
    })

    socket.on('final-merlin-guess',data=>{
        this.setState({madeFinalStab:true})
        this.setState({onChoppingBlock:data.onChoppingBlock})
        setTimeout(()=>{
            this.setState({showIdentityOfPersonStabbed:true});
            setTimeout(()=>{
                this.setState({showIdentityOfPeopleNotStabbed:true})
                setTimeout(()=>{
                    socket.emit('hang-out',{room:this.props.match.params.room})
                    let evilVictory = this.props.playerArray[this.state.onChoppingBlock].identity == "Merlin"
                    setTimeout(()=>{
                        this.setState({phase:evilVictory?'evilVictory':'goodVictory'})
                        socket.emit(`go-here`,{room:this.props.match.params.room,phase:'gameDone'})
                    },1000);
                },2000)
            },2000)
        },1000)
    })

    socket.on('give-me-history',data=>{
        socket.emit('here-is-history',{room:this.props.match.params.room,name:data.name,playerArray:this.props.playerArray,quest:this.props.quest,attempt:this.props.attempt,resultsArray:this.props.resultsArray,proposedQuestsArray:this.props.proposedQuestsArray})
    })
}

async componentDidMount(){
    socket.emit('join-room',{data:this.props.match.params.room})
    this.setState({quantitiesNeededArray:this.props.playerArray.length===5?[2,3,2,3,3]:this.props.playerArray.length===6?[2,3,4,3,4]:this.props.playerArray.length===7?[2,3,3,4,4]:[3,4,4,5,5]})
    if (this.props.playerArray.length < 5){
        let information = await axios.get(`/api/getinformation/${this.props.match.params.room}`);
        await this.props.setValues(this.props.match.params.room,information.data.playerArray,information.data.quest,information.data.attempt,information.data.resultsArray,information.data.proposedQuestsArray,information.data.teamLeader,information.data.phase)

    }
    socket.emit('come-inside',{room:this.props.match.params.room})
    setTimeout(async ()=>{
        await this.setState({numberOfPeopleThatCanGo:this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length)})
        this.setState({phase:this.props.phase,displayQuestAndAttempt:true,displayQuestResults:true})
        let b = []
        for (let i = 0; i < this.props.playerArray.length; i++){
            b.push(i+1)
        }
        this.setState({notSelectedForQuest:b});
        let y = []
        this.props.playerArray.forEach((element,index,arr)=>{
            y.push('');
        })
        this.setState({votesReceived:y});
        if (this.props.phase == 'execute'){
            this.setState({displayAttempt:false,selectedForQuest:this.props.proposedQuestsArray[this.props.proposedQuestsArray.length-1].choicesArray,phase:'execute'})
            let u = [];
            this.state.selectedForQuest.forEach(element=>{u.push('')});
            this.setState({executionsReceived:u})
        }
        if (this.props.phase =='killMerlin'){
            this.setState({displayQuestAndAttempt:false})
        }
        
    },5000)
    socket.emit('join-room',{room:this.props.match.params.room})
    let v = this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length);
    this.setState({r:v===5?['','','','','']:v===4?['','','','']:v===2?['','']:['','','']})
}

redirect(){
    if (this.state.redirect){
        return <Redirect to={`/`}/>
    }
}

getNumberOfPeopleThatCanGo(quest,players){
    if (players > 7 && quest > 3){
        return 5;
    }else if ((quest > 1 && players > 7) || (players == 7 && quest > 3) || (players == 6 && quest == 3) || (players == 6 && quest == 5)){
        return 4;
    }else if ((quest < 2 && players < 8) || (quest == 3 && players == 5 )){
        return 2;
    }else {
        return 3;
    }
}

displayTeamLeader(){
    return (
        <div className='goodtime'>
        <Player className='teamleader' teamLead={true} playerNumber = {this.props.teamLeader}></Player>
        </div>
    )
}

displayAfterTeamLeader(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (index+1 > this.props.teamLeader){
            return (
            <div className='averagetime'>
            <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
            </div>
            )
        }
    })
}

displayBeforeTeamLeader(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (index+1 < this.props.teamLeader){
            return (
                <div className='averagetime'>
                <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                </div>
                )
        }
    })
}

displayQuesters(){
    return this.state.r.map((element,index,arr)=>{
        return (
            <div className='averagetime'>
                {this.state.selectedForQuest[index]?<Player className='regular' teamLead={false} playerNumber = {this.state.selectedForQuest[index]}></Player>:null}
                
            </div>
                )
    })
}

displayStare(){
    if (this.state.phase=='stare'){
        return <div>
            <h1>Stare at your device for a few seconds</h1>
            <h1>Know who you are</h1>
        </div>
    }
}

displayPropose(){
    if (this.state.phase == 'propose'){
        return (<div>
            <div className = 'page-splitter'>
                <div className = 'lineup'>
                    {this.displayTeamLeader()}
                    <div className='non-team-leaders'>
                        {this.displayAfterTeamLeader()}
                        {this.displayBeforeTeamLeader()}
                    </div>
                </div>
                <div className = 'stats'>
                    <div className='stats-center'>
                        <div className='top-bottom-space'></div>
                        <div className='questers'>{this.displayQuesters()}</div>
                        <div className='btween-space'></div>
                        <Board></Board>
                        <div className='btween-space'></div>
                        <div className='play-top'><div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===1)===-1?<Player playerNumber={1}/>:null}</div><div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===2)===-1?<Player playerNumber={2}/>:null}</div><div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===3)===-1?<Player playerNumber={3}/>:null}</div>{this.props.playerArray.length>6?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===4)===-1?<Player playerNumber={4}/>:null}</div>:null}{this.props.playerArray.length>8?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===5)===-1?<Player playerNumber={5}/>:null}</div>:null}</div>
                        <div className='play-bottom'>{this.props.playerArray.length<7?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===4)===-1?<Player playerNumber={4}/>:null}</div>:null}{this.props.playerArray.length<9?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===5)===-1?<Player playerNumber={5}/>:null}</div>:null}{this.props.playerArray[5]?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===6)===-1?<Player playerNumber={6}/>:null}</div>:null}{this.props.playerArray[6]?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===7)===-1?<Player playerNumber={7}/>:null}</div>:null}{this.props.playerArray[7]?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===8)===-1?<Player playerNumber={8}/>:null}</div>:null}{this.props.playerArray[8]?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===9)===-1?<Player playerNumber={9}/>:null}</div>:null}{this.props.playerArray[9]?<div className='averagetime'>{this.state.selectedForQuest.findIndex((element,index,arr)=>element===10)===-1?<Player playerNumber={10}/>:null}</div>:null}</div>
                        <div className='top-bottom-space'></div>
                    </div>
                </div>
            </div>
        </div>)
    }
}



displayQuestAndAttempt(){
    if (this.state.displayQuestAndAttempt){
        return <div>
        <h1>Quest #{this.props.quest}{this.state.displayAttempt?`        Attempts left after this: ${5-this.props.attempt}`:``}</h1>
            </div>
    }
}

displayQuestResults(){
    if (this.state.displayQuestResults){
        return <div>
            <h5>Quest #1: {!this.props.resultsArray[0]?'TBD':this.props.resultsArray[0]=='successful'?'Successful':'Failed'}   Quest #2: {!this.props.resultsArray[1]?'TBD':this.props.resultsArray[1]=='successful'?'Successful':'Failed'}   Quest #3: {!this.props.resultsArray[2]?'TBD':this.props.resultsArray[2]=='successful'?'Successful':'Failed'}   Quest #4: {!this.props.resultsArray[3]?'TBD':this.props.resultsArray[3]=='successful'?'Successful':'Failed'}   Quest #5: {!this.props.resultsArray[4]?'TBD':this.props.resultsArray[4]=='successful'?'Successful':'Failed'}</h5>
        </div>
    }
}

displayVote(){
    if (this.state.phase == 'vote'){
        return (
        <div className='votamos'>
            <h1 id='r'>It Is Proposed that the following Individuals go on the Quest.</h1>
            <div id='y' className='questers'>{this.displayQuesters()}</div>
            <div id = 'u'></div>
            <Board></Board>
            <h2>The Following individuals have yet to vote</h2>
            <div className='tienen-que-votar'>
                {this.displayTienenQueVotar()}
            </div>
        </div>
        )
    }
}

displayTienenQueVotar(){
    return this.state.votesReceived.map((element,index,arr)=>{
        if (element != 'approve' && element != 'reject'){
            return (
                <div className='averagetime'>
                <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                </div>
            )
        }
    })
}

displayPlayersThatNeedToVoteStill(){
    return this.state.votesReceived.map((element,index,arr)=>{
        if (element != 'approve' && element != 'reject'){
            return <h5>{index+1} {this.props.playerArray[index].name}</h5>
        }
    })
}

displayExecute(){
    if (this.state.phase == 'execute'){
        return (<div className='fullness'>
        <div className='more-spacious'></div>
        <div className='bh'>
            <Board></Board>
        </div>
        <div className='success-fail-symbol'>
            <img className='success-symbol' src={images.success} alt></img>
            <img className='success-symbol' src={images.fail} alt></img>
        </div>
            <h3 className='success-fail-instruction'>The Following Players need to submit either a success or a fail.  The results will be anonymous:</h3>
            <div className='x'>
                {this.displaySelectedForQuest()}
            </div>
        </div>
            )
    }
}

displaySelectedForQuest(){
    return this.state.selectedForQuest.map((element,index,arr)=>{
        if (this.state.executionsReceived[index] != 'success' && this.state.executionsReceived[index] != 'fail'){
            return (
                <div className='averagetime'>
                    <Player className='regular' teamLead={false} playerNumber = {element}></Player>
                </div>
            )
        }
    })
}

displayKillMerlin(){
    if (this.state.phase == 'killMerlin'){
        return (
            <div className='killin-merlin-man'>
                <div className='gonna-win'>
                    <div className='el-spaceo-topo'>
                        <h1 className='evil-wins-if'>Evil Wins if Assassin correctly guesses who Merlin is</h1>
                    </div>
                    {/* <h1>Kill Merlin</h1>
                    <h3>Evil has one last chance for victory.  If Assassin correctly guesses which good character is Merlin, evil wins!</h3>
                    <h3>On Chopping Block:</h3>
                    {this.displayOnChoppingBlock()}
                    <h3>Not On Chopping Block:</h3>
                    {this.displayNotOnChoppingBlock()} */}
                    <div className='el-spaceo-middleo'>
                        {this.displayAllGoodPeople()}
                    </div>
                    <div className='el-spaceo-bottomo'>
                        {this.displayAllBadPeople()}
                    </div>
                </div>
            </div>
        )
    }
}

displayAllGoodPeople(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (element.loyalty==='good'){
            if (index != this.state.onChoppingBlock){
                return <div className='nonteamleader-and-space'>
                            <div className='nonteamleader-image-room'>
                                <div className='averagetime'>
                                    <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                                </div>
                            <div className='box-for-displayer-of-identity-nonteamleader'>
                                <img className='displayer-of-identity-nonteamleader' src={!this.state.showIdentityOfPeopleNotStabbed?images.unknownIdentity:element.identity==='Merlin'?images.merlin:element.identity==='Percival'?images.percival:images.loyalServantOfKingArthur}></img>
                            </div>
                    </div>
                </div>
            }else{
                return <div className='teamleader-and-space'>
                    <div className='teamleader-image-room'>
                        <div className='goodtime'>
                            <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                        </div>
                        <div className='box-for-displayer-of-identity-teamleader'>
                            <img className='displayer-of-identity-teamleader' src={!this.state.showIdentityOfPersonStabbed?images.unknownIdentity:element.identity==='Merlin'?images.merlin:element.identity==='Percival'?images.percival:images.loyalServantOfKingArthur}></img>
                        </div>
                        <div className='tmcb'>
                        
                        </div>
                        <div className='knife-div'  id={!this.state.madeFinalStab?'stationary':'thrown'}>
                            <img src={images.knife} className='throwing-knife'></img>
                        </div>
                        <div className='goodtime'>
                            <Player className='regular' teamLead={false} playerNumber = {this.props.playerArray.findIndex(element=>element.identity==='Assassin')+1}></Player>
                        </div>
                        <div className='box-for-displayer-of-identity-teamleader'>
                            <img id='me-so-evil' className='displayer-of-identity-teamleader' src={images.assassin}></img>
                        </div>
                    </div>
                </div>
            }
        }
    })
}

displayAllBadPeople(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (element.loyalty==='evil'){
            if (element.identity != 'Assassin' || this.state.onChoppingBlock === -1){
                return (
                    <div className='jkb'>
                        <div className='averagetime'>
                            <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                        </div>
                        <div className='box-for-displayer-of-identity-nonteamleader'>
                            <img className='displayer-of-identity-nonteamleader' id='me-so-evil' src={element.identity==='Assassin'?images.assassin:element.identity==='Morgana'?images.morgana:element.identity==='Mordred'?images.mordred:element.identity==='Oberon'?images.oberon:images.unknownIdentity} alt={images.unknownIdentity}></img>
                        </div>
                    </div>
                )
            }
        }
    })
}

displayAllBadPeopleFinal(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (element.loyalty==='evil'){
            return (
                <div className='esc'>
                    <div className='averagetime'>
                        <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                    </div>
                    <div className='box-for-displayer-of-identity-nonteamleader'>
                        <img className='displayer-of-identity-nonteamleader' id='me-so-evil' src={element.identity==='Assassin'?images.assassin:element.identity==='Morgana'?images.morgana:element.identity==='Mordred'?images.mordred:element.identity==='Oberon'?images.oberon:images.unknownIdentity} alt={images.unknownIdentity}></img>
                    </div>
                </div>
            )
            
        }
    })
}

displayAllGoodPeopleFinal(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (element.loyalty==='good'){
            return (
                <div className='esc'>
                    <div className='averagetime'>
                        <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                    </div>
                    <div className='box-for-displayer-of-identity-nonteamleader'>
                        <img className='displayer-of-identity-nonteamleader' src={element.identity==='Merlin'?images.merlin:element.identity==='Percival'?images.percival:element.identity==='Loyal Servant Of King Arthur'?images.loyalServantOfKingArthur:images.unknownIdentity} alt={images.unknownIdentity}></img>
                    </div>
                </div>
            )
            
        }
    })
}

displayOnChoppingBlock(){
if (this.state.onChoppingBlock != -1){
    return <h2>{this.state.onChoppingBlock+1} {this.props.playerArray[this.state.onChoppingBlock].name}</h2>
}
}

displayNotOnChoppingBlock(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (this.props.playerArray[index].loyalty=='good' && index != this.state.onChoppingBlock){
            return (
                <h2>{index+1} {this.props.playerArray[index].name}</h2>
            )
        }
    })
}

displayPlayerLineup(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (index + 1 > this.props.teamLeader){
            return(
                <h1 class='teamName'>{index+1} {this.props.playerArray[index].name}</h1>
            )
        }
    })
}

displayPlayerLineup2(){
    return this.props.playerArray.map((element,index,arr)=>{
        if (index + 1 < this.props.teamLeader){
            return(
                <h1>{index+1} {this.props.playerArray[index].name}</h1>
            )
        }
    })
}


displayProposal(){
    return this.state.selectedForQuest.map((element,index,arr)=>{
        return <h2>{element} {this.props.playerArray[element-1].name}</h2>
    })
}

displayNotChosen(){
    return this.state.notSelectedForQuest.map((element,index,arr)=>{
        return <div class>
        {this.props.playerArray[element-1].name}
        </div>
    })
}

displayApproveVotes(){
    if (this.state.displayApproveVotes){
        return this.state.votesReceived.map((element,index,arr)=>{
            if (element == 'approve'){
                return <h2>{index + 1} {this.props.playerArray[index].name}</h2>
            }
        })
    }
}

displayRejectVotes(){
    if (this.state.displayRejectVotes){
        return this.state.votesReceived.map((element,index,arr)=>{
            if (element == 'reject'){
                return <h2>{index + 1} {this.props.playerArray[index].name}</h2>
            }
        })
    }
}

displayVoteApproveSign(){
    if (this.state.displayVoteApproveSign){
        return <div class = 'approveSign'><h2>Approves:</h2></div>
    }
}

displayVoteRejectSign(){
    if (this.state.displayVoteApproveSign){
        return <div class = 'rejectSign'><h2>Rejects</h2></div>
    }
}

displayVoteResultSign(){
if (this.state.displayVoteResultSign){
    return <div class = 'voteResultSign'><h1>Result:</h1></div>
}
}

displayVoteResult(){
if (this.state.displayVoteResult){
    return <div class = 'vote'><h1>{this.state.voteResult==='approve'?'Approved!':'Rejected!'}</h1></div>
}
}

displaySuccessesAndFails(){
    let randomArray = shuffle(this.state.executionsReceived);
    if (this.state.executionsReceived.length == 2){

    }
    else if (this.state.executionsReceived.length == 3){

    }
    else if (this.state.executionsReceived.length == 4){

    }else if (this.state.executionsReceived.length == 5){

    }
}

displayNumberOfSuccessesSign(){
    if (this.state.displayNumberOfSuccessesSign){
        return <div>
        <h1>Successes:</h1>
        </div>
    }
}

displayNumberOfSuccesses(){
    if (this.state.displayNumberOfSuccesses){
        return <div>
            <h1>{this.state.numberOfSuccesses}</h1>
        </div>
    }
}

displayNumberOfFailsSign(){
    if (this.state.displayNumberOfFailsSign){
        return <div>
        <h1>Fails:</h1>
        </div>
    }
}

displayNumberOfFails(){
    if (this.state.displayNumberOfFails){
        return <div>
            <h1>{this.state.numberOfFails}</h1>
        </div>
    }
}

displayExecutionResultSign(){
    if (this.state.displayExecutionResultsSign){
        return <div>
        <h1>Result:</h1>
        </div>
    }
}

displayExecutionResult(){
    if (this.state.displayExecutionResult){
        return <div>
        <h1 className='el-execution-o-resulto'>{this.state.executionResult==='failed'?'Failed!!!':'Successful!!!'}</h1>
        </div>
    }
}

async returnHome(){
    socket.emit('go-here',{room:this.props.match.params.room,phase:'home'})
    await axios.delete(`/api/deletegame/${this.props.match.params.room}`)
    this.setState({redirect:true})
}


displayWins(){
    if (this.state.phase == 'evilVictory' || this.state.phase == 'goodVictory'){
        return (
            <div className = 'this-is-the-end'>
                <div className='for-realsies'>
                <h1>{this.state.phase==='evilVictory'?'Evil Wins!':'Good Wins!'}</h1>
                <div className='give-the-board-some-space'>
                    <Board></Board>
                </div>
                <div className='hbll'>
                    <div className='clyde'>
                        {this.displayAllBadPeopleFinal()}
                    </div>
                    <div className='marb'></div>
                    <div className='lsb'>
                        {this.displayAllGoodPeopleFinal()}
                    </div>
                </div>
                <button onClick={()=>this.returnHome()}>Main Menu</button>
                </div>
            </div>
        )
    }
}




async displayResultOutcome(){
    setTimeout(()=>{
        this.setState({phaseOfExecutionLocation:1});
    },200)
    setTimeout(async ()=>{
        this.setState({successesForParticularQuest:this.state.randomOrderExecutionsReceived[0]==='success'?this.state.successesForParticularQuest+1:this.state.successesForParticularQuest,failsForParticularQuest:this.state.randomOrderExecutionsReceived[0]==='fail'?this.state.failsForParticularQuest+1:this.state.failsForParticularQuest})
        await this.setState({performExecution1:false,departExecution1:true})
        setTimeout(()=>{
            this.setState({phaseOfExecutionLocation:2});
        },200)
        setTimeout(async ()=>{
            this.setState({departExecution1:false})
            await this.setState({performExecution2:true});
            setTimeout(()=>{
                this.setState({phaseOfExecutionLocation:1});
            },200)
            setTimeout(async ()=>{
                this.setState({successesForParticularQuest:this.state.randomOrderExecutionsReceived[1]==='success'?this.state.successesForParticularQuest+1:this.state.successesForParticularQuest,failsForParticularQuest:this.state.randomOrderExecutionsReceived[1]==='fail'?this.state.failsForParticularQuest+1:this.state.failsForParticularQuest})
                await this.setState({performExecution2:false,departExecution2:true})
                setTimeout(()=>{
                    this.setState({phaseOfExecutionLocation:2});
                },200)
                setTimeout(async ()=>{
                    this.setState({departExecution2:false});
                    if (this.state.randomOrderExecutionsReceived.length===2){
                        this.wrapItUp();
                    }else{
                        await this.setState({performExecution3:true});
                        setTimeout(()=>{
                            this.setState({phaseOfExecutionLocation:1});
                        },200)
                        setTimeout(async ()=>{
                            this.setState({successesForParticularQuest:this.state.randomOrderExecutionsReceived[2]==='success'?this.state.successesForParticularQuest+1:this.state.successesForParticularQuest,failsForParticularQuest:this.state.randomOrderExecutionsReceived[2]==='fail'?this.state.failsForParticularQuest+1:this.state.failsForParticularQuest})
                            await this.setState({performExecution3:false,departExecution3:true})
                            setTimeout(()=>{
                                this.setState({phaseOfExecutionLocation:2});
                            },200)
                            // this.setState({phaseOfExecutionLocation:1});
                            setTimeout(async ()=>{
                                this.setState({departExecution3:false});
                                if (this.state.randomOrderExecutionsReceived.length===3){
                                    this.wrapItUp()
                                }else{
                                    await this.setState({performExecution4:true});
                                    setTimeout(()=>{
                                        this.setState({phaseOfExecutionLocation:1});
                                    },200)
                                    setTimeout(async ()=>{
                                        this.setState({successesForParticularQuest:this.state.randomOrderExecutionsReceived[3]==='success'?this.state.successesForParticularQuest+1:this.state.successesForParticularQuest,failsForParticularQuest:this.state.randomOrderExecutionsReceived[3]==='fail'?this.state.failsForParticularQuest+1:this.state.failsForParticularQuest})
                                        await this.setState({performExecution4:false,departExecution4:true})
                                        setTimeout(()=>{
                                            this.setState({phaseOfExecutionLocation:2});
                                        },200)
                                        //this.setState({phaseOfExecutionLocation:1});
                                        setTimeout(async ()=>{
                                            this.setState({departExecution4:false});
                                            if (this.state.randomOrderExecutionsReceived.length===4){
                                                this.wrapItUp();
                                            }else{
                                                await this.setState({performExecution5:true});
                                                setTimeout(()=>{
                                                    this.setState({phaseOfExecutionLocation:1});
                                                },200)
                                                setTimeout(async ()=>{
                                                    this.setState({successesForParticularQuest:this.state.randomOrderExecutionsReceived[4]==='success'?this.state.successesForParticularQuest+1:this.state.successesForParticularQuest,failsForParticularQuest:this.state.randomOrderExecutionsReceived[4]==='fail'?this.state.failsForParticularQuest+1:this.state.failsForParticularQuest})
                                                    await this.setState({performExecution5:false,departExecution5:true})
                                                    setTimeout(()=>{
                                                        this.setState({phaseOfExecutionLocation:2});
                                                    },200)
                                                    // this.setState({phaseOfExecutionLocation:1});
                                                    setTimeout(()=>{
                                                        this.setState({departExecution5:false});
                                                        //this.setState({performExecution5:false});
                                                        this.wrapItUp();
                                                    },1000)
                                                },2000)
                                            }
                                        },1000)
                                    },2000)
                                }
                            },1000)
                        },2000)
                    }
                },1000)
            },2000)
        },1000)
    },2000)
}

async wrapItUp(){
    this.setState({displayExecutionResult:true});
    await axios.post(`/api/createexecutions/${this.props.match.params.room}`,{quest:this.props.quest,choice1:this.state.selectedForQuest[0],choice2:this.state.selectedForQuest[1],choice3:this.state.selectedForQuest[2]?this.state.selectedForQuest[2]:null,choice4:this.state.selectedForQuest[3]?this.state.selectedForQuest[3]:null,choice5:this.state.selectedForQuest[4]?this.state.selectedForQuest[4]:null,result:this.state.executionResult});
    let a = this.props.resultsArray.slice();
    a.push(this.state.executionResult);
    let successCount = 0;
    let failCount = 0;
    a.forEach((element,index,arr)=>{if (element == 'successful'){successCount++;}else if (element == 'failed'){failCount++;}})
    let phase = successCount===3?'killMerlin':failCount===3?'evilVictory':'propose';
    this.props.setValues(this.props.match.params.room,this.props.playerArray,this.props.quest+1,1,a,this.props.proposedQuestsArray,this.props.teamLeader,phase);
    setTimeout(async ()=>{
        this.setState({phase:successCount==3?'killMerlin':failCount==3?'evilVictory':'propose'});
        this.setState({displayExecutionResult:false,successesForParticularQuest:0,failsForParticularQuest:false});
        this.setState({numberOfPeopleThatCanGo:this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length)})
        let b = [];
        for (let i = 0; i < this.state.numberOfPeopleThatCanGo; i++){
            b.push('');
        }
        this.setState({executionsReceived:b,selectedForQuest:[],executionResult:'',numberOfFails:0,numberOfSuccesses:0,displayAttempt:true,displayQuestResults:true})
        let v = this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length);
        this.setState({r:v===5?['','','','','']:v===4?['','','','']:v===2?['','']:['','','']})
        socket.emit('go-here',{room:this.props.match.params.room,phase:this.state.phase!='evilVictory'?this.props.phase:'gameDone'})
    },2000)
}

displayVoteOutcome(){
    setTimeout(()=>{
        this.setState({displayVoteResult:true})
        setTimeout(async ()=>{
            this.setState({phase:this.state.voteResult=='approve'?'execute':this.props.attempt==5?'evilVictory':'propose'})
            let pqa=this.props.proposedQuestsArray.slice();
            pqa.push({votesArray:this.state.votesReceived.slice(),choicesArray:this.state.selectedForQuest.slice(),quest:this.props.quest,attempt:this.props.attempt,teamLeader:this.props.teamLeader,result:this.state.voteResult});
            await axios.post(`/api/createvotes`,{room:this.props.match.params.room,quest:this.props.quest,attempt:this.props.attempt,teamLeader:this.props.teamLeader,choice1:this.state.selectedForQuest[0]?this.state.selectedForQuest[0]:null,choice2:this.state.selectedForQuest[1]?this.state.selectedForQuest[1]:null,choice3:this.state.selectedForQuest[2]?this.state.selectedForQuest[2]:null,choice4:this.state.selectedForQuest[3]?this.state.selectedForQuest[3]:null,choice5:this.state.selectedForQuest[4]?this.state.selectedForQuest[4]:null,vote1:this.state.votesReceived[0]?this.state.votesReceived[0]:null,vote2:this.state.votesReceived[1]?this.state.votesReceived[1]:null,vote3:this.state.votesReceived[2]?this.state.votesReceived[2]:null,vote4:this.state.votesReceived[3]?this.state.votesReceived[3]:null,vote5:this.state.votesReceived[4]?this.state.votesReceived[4]:null,vote6:this.state.votesReceived[5]?this.state.votesReceived[5]:null,vote7:this.state.votesReceived[6]?this.state.votesReceived[6]:null,vote8:this.state.votesReceived[7]?this.state.votesReceived[7]:null,vote9:this.state.votesReceived[8]?this.state.votesReceived[8]:null,vote10:this.state.votesReceived[9]?this.state.votesReceived[9]:null,result:this.state.voteResult});
            this.props.setValues(this.props.match.params.room,this.props.playerArray,this.props.quest,this.state.phase=='propose'?this.props.attempt+1:1,this.props.resultsArray,pqa,this.props.teamLeader==this.props.playerArray.length?1:this.props.teamLeader+1,this.state.phase)
            this.setState({notSelectedForQuest:this.props.playerArray.length==5?[1,2,3,4,5]:this.props.playerArray.length==6?[1,2,3,4,5,6]:this.props.playerArray.length==7?[1,2,3,4,5,6,7]:this.props.playerArray.length==8?[1,2,3,4,5,6,7,8]:this.props.playerArray.length==9?[1,2,3,4,5,6,7,8,9]:[1,2,3,4,5,6,7,8,9,10]})
            let a = this.props.playerArray.length;
            this.setState({selectedForQuest:this.state.phase=='propose'?[]:this.state.selectedForQuest,votesReceived:a==5?['','','','','']:a==6?['','','','','','']:a==7?['','','','','','','']:a==8?['','','','','','','','']:a==9?['','','','','','','','','']:['','','','','','','','','',''],voteResult:'',displayQuestAndAttempt:true,displayAttempt:this.state.phase=='execute'?false:true})
            let otherArr = [];
            this.state.selectedForQuest.forEach(element=>{
                otherArr.push('')
            });
            this.setState({executionsReceived:this.state.phase=='propose'?[]:otherArr.slice()})
            setTimeout(()=>{
                let v = this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length);
                this.setState({r:v===5?['','','','','']:v===4?['','','','']:v===2?['','']:['','','']})
                if (this.state.phase == 'evilVictory'){this.setState({displayQuestAndAttempt:false})}
                this.setState({displayEachPlayerTakeSides:false});
                socket.emit('go-here',{room:this.props.match.params.room,phase:this.state.phase!='evilVictory'?this.props.phase:'gameDone'})
                this.setState({displayVoteResult:false})
            },1000)
        },2000)
    },2000)
}

displayEachPlayerTakeSides(){
        return this.props.playerArray.map((element,index,arr)=>{
            return (
                <div className='averagetime' id={!this.state.displayEachPlayerTakeSides?'thinker':this.state.votesReceived[index]==='approve'?'approver':'rejecter'}>
                    <Player className='regular' teamLead={false} playerNumber = {index+1}></Player>
                </div>
            )
        })
    
}

viewVoteFireworks(){
    if (this.state.phase == 'votefun'){
        return(<div className='los-votos'>
            <div className='approve-reject-thumbs'>
                <img className='thumb' src={images.thumbUp} alt/>
                <img className='thumb' id='downer' src={images.thumbDown} alt/>
            </div>
            {this.displayEachPlayerTakeSides()}
            <div class = 'approves'>{this.displayApproveVotes()}</div>
            
            <div class = 'rejects'>{this.displayRejectVotes()}</div>
            {this.displayVoteResult()}
        </div>)
    }
}

viewExecutionFireworks(){
    if (this.state.phase == 'executionfun'){
        return (
            <div className='fullness'>
                <div className='more-spacious'></div>
                <div className='bh'>
                    <Board></Board>
                </div>
                <div className='success-fail-symbol'>
                    <img className='success-symbol' src={images.success} alt></img>
                    <img className='fail-symbol' src={images.fail} alt></img>
                </div>
                <div className={!this.state.performExecution1?'oh':'ah'}></div>
                <div className='p'><h1 id='m'>Successes: {this.state.successesForParticularQuest}</h1><h1 id='m'> Fails: {this.state.failsForParticularQuest}</h1></div>
                {this.performExecution1()}
                {this.departExecution1()}
                {this.performExecution2()}
                {this.departExecution2()}
                {this.performExecution3()}
                {this.departExecution3()}
                {this.performExecution4()}
                {this.departExecution4()}
                {this.performExecution5()}
                {this.departExecution5()}
                {this.displayExecutionResult()}
            </div>
        )
    }
}

performExecution1(){
    if(this.state.performExecution1){
        return (
            <button id={this.state.randomOrderExecutionsReceived[0]==='success'?'not-that-cool':'awesome-evil'} className='ah' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[0]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

departExecution1(){
    if (this.state.departExecution1){
        return (
            <button id={this.state.randomOrderExecutionsReceived[0]==='success'?'not-that-cool':'awesome-evil'} className='oh' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[0]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

performExecution2(){
    if(this.state.performExecution2){
        return (
            <button id={this.state.randomOrderExecutionsReceived[1]==='success'?'not-that-cool':'awesome-evil'} className='ah' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[1]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

departExecution2(){
    if (this.state.departExecution2){
        return (
            <button id={this.state.randomOrderExecutionsReceived[1]==='success'?'not-that-cool':'awesome-evil'} className='oh' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[1]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

performExecution3(){
    if(this.state.performExecution3){
        return (
            <button id={this.state.randomOrderExecutionsReceived[2]==='success'?'not-that-cool':'awesome-evil'} className='ah' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[2]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

departExecution3(){
    if (this.state.departExecution3){
        return (
            <button id={this.state.randomOrderExecutionsReceived[2]==='success'?'not-that-cool':'awesome-evil'} className='oh' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[2]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

performExecution4(){
    if(this.state.performExecution4){
        return (
            <button id={this.state.randomOrderExecutionsReceived[3]==='success'?'not-that-cool':'awesome-evil'} className='ah' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[3]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

departExecution4(){
    if (this.state.departExecution4){
        return (
            <button id={this.state.randomOrderExecutionsReceived[3]==='success'?'not-that-cool':'awesome-evil'} className='oh' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[3]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

performExecution5(){
    if(this.state.performExecution5){
        return (
            <button id={this.state.randomOrderExecutionsReceived[4]==='success'?'not-that-cool':'awesome-evil'} className='ah' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[4]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

departExecution5(){
    if (this.state.departExecution5){
        return (
            <button id={this.state.randomOrderExecutionsReceived[4]==='success'?'not-that-cool':'awesome-evil'} className='oh' disabled={this.state.phaseOfExecutionLocation===2}><img className='success-symbol' src={this.state.randomOrderExecutionsReceived[4]==='success'?images.success:images.fail} alt></img></button>
        )
    }
}

viewKillMerlinFireworks(){
    if (this.state.phase == 'killMerlinfun'){
        return (
            <div>
                <h1>Assassin stabbed {this.props.playerArray[this.state.onChoppingBlock].name}</h1>
                <h1>{this.props.playerArray[this.props.playerArray.findIndex(element=>element.identity=="Merlin")].name} is Merlin</h1>
            </div>
        )
    }
}

displayAllGameStuff(){

}


render(){
    return(<div>
        {this.displayPropose()}
        {this.displayVote()}
        {this.displayExecute()}
        {this.displayKillMerlin()}
        {this.displayStare()}
        {this.viewVoteFireworks()}
        {this.viewExecutionFireworks()}
        {this.viewKillMerlinFireworks()}
        {this.displayWins()}
        {this.redirect()}
        </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setValues})(DisplayGame);