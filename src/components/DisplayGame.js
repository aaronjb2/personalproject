import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {setValues} from '../dux/reducer.js';
import Board from './Board.js';
import OnQuestTable from './OnQuestTable.js';
import Player from './Player.js';
import './DisplayGame.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

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
        redirect:false
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

    socket.on('submit-execution',data=>{
        let playerIndex = this.props.playerArray.findIndex(element=>element.name == data.name);
        let index = this.state.selectedForQuest.findIndex(element=>element==playerIndex+1);
        let arr = this.state.executionsReceived.slice();
        arr[index] = data.execution;
        this.setState({executionsReceived:arr.slice()})
        socket.emit('you-belong-here',{room:this.props.match.params.room,name:data.name,onQuest:false})
        let spot = this.state.executionsReceived.findIndex(element=>element != 'success' && element != 'fail');
        if (spot == -1){
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
        this.setState({onChoppingBlock:data.onChoppingBlock})
        this.setState({phase:'killMerlinfun'})
        socket.emit('hang-out',{room:this.props.match.params.room})
        let evilVictory = this.props.playerArray[this.state.onChoppingBlock].identity == "Merlin"
        setTimeout(()=>{
            this.setState({phase:evilVictory?'evilVictory':'goodVictory'})
            socket.emit(`go-here`,{room:this.props.match.params.room,phase:'gameDone'})
        },5000);
    })
}

async componentDidMount(){
    socket.emit('join-room',{data:this.props.match.params.room})
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
            <Board className = 'board'></Board>
            <OnQuestTable className = 'OnQuestTable' selectedForQuest={this.state.selectedForQuest} onQuest={true} top={false}></OnQuestTable>
            <Player className='Player' playerNumber = {10}></Player>
            <div>{this.displayChoicesForQuest()}</div>
            <div class = 'teamLeader'>{this.displayTeamLeader()}</div>
            <div class='notSelected'>{this.displayNotChosen()}</div>
            <div class='playerLineup'><h1>Player Lineup</h1>{this.displayPlayerLineup()}{this.displayPlayerLineup2()}</div>

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
        return <div>
            <h2>It Is Proposed that the following Individuals go on the Quest.</h2>
            {this.displayProposal()}
            <h3>The Following individuals have yet to vote</h3>
            {this.displayPlayersThatNeedToVoteStill()}
        </div>
    }
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
        return (<div>
            <h3>The Following Players need to submit either a success or a fail.  The results will be anonymous:</h3>
            {this.displaySelectedForQuest()}
        </div>
            )
    }
}

displaySelectedForQuest(){
    return this.state.selectedForQuest.map((element,index,arr)=>{
        if (this.state.executionsReceived[index] != 'success' && this.state.executionsReceived[index] != 'fail'){
            return <h2>{element} {this.props.playerArray[element-1].name}</h2>
        }
    })
}

displayKillMerlin(){
    if (this.state.phase == 'killMerlin'){
        return (
            <div>
                <h1>Kill Merlin</h1>
                <h3>Evil has one last chance for victory.  If Assassin correctly guesses which good character is Merlin, evil wins!</h3>
                <h3>On Chopping Block:</h3>
                {this.displayOnChoppingBlock()}
                <h3>Not On Chopping Block:</h3>
                {this.displayNotOnChoppingBlock()}
            </div>
        )
    }
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

displayTeamLeader(){
    if (this.props.teamLeader && this.props.teamLeader > 0){
        return <div>
    <h3>Current Team Leader:</h3>
    <h1>{this.props.teamLeader} {this.props.playerArray[this.props.teamLeader-1].name}</h1>
</div>
    }
}

displayChoicesForQuest(){
    return this.state.selectedForQuest.map((element,index,arr)=>{
        return <div class = 'selected'>
        {this.props.playerArray[element-1].name}
        </div>
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
    return <div class = 'vote'><h1>{this.state.voteResult}</h1></div>
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
        <h1>{this.state.executionResult}</h1>
        </div>
    }
}

async returnHome(){
    socket.emit('go-here',{room:this.props.match.params.room,phase:'home'})
    await axios.delete(`/api/deletegame/${this.props.match.params.room}`)
    this.setState({redirect:true})
}


displayEvilWins(){
    if (this.state.phase == 'evilVictory'){
        return (
            <div>
                <h1>Evil Wins!</h1>
                <button onClick={()=>this.returnHome()}>Main Menu</button>
                </div>
        )
    }
}

displayGoodWins(){
    if (this.state.phase == 'goodVictory'){
        return (
            <div>
            <h1>Good Wins!</h1>
            <button onClick={()=>this.returnHome()}>Main Menu</button>
            </div>
        )
    }
}

displayResultOutcome(){
    setTimeout(()=>{
        this.setState({displayNumberOfSuccessesSign:true})
        setTimeout(()=>{
            this.setState({displayNumberOfSuccesses:true})
            setTimeout(()=>{
                this.setState({displayNumberOfFailsSign:true})
                setTimeout(()=>{
                    this.setState({displayNumberOfFails:true})
                    setTimeout(()=>{
                        this.setState({displayExecutionResultsSign:true})
                        setTimeout(()=>{
                            this.setState({displayExecutionResult:true})
                            setTimeout(async()=>{
                                this.setState({displayNumberOfSuccessesSign:false,displayNumberOfSuccesses:false,displayNumberOfFailsSign:false,displayNumberOfFails:false,displayExecutionResultsSign:false,displayExecutionResult:false})
                                await axios.post(`/api/createexecutions/${this.props.match.params.room}`,{quest:this.props.quest,choice1:this.state.selectedForQuest[0],choice2:this.state.selectedForQuest[1],choice3:this.state.selectedForQuest[2]?this.state.selectedForQuest[2]:null,choice4:this.state.selectedForQuest[3]?this.state.selectedForQuest[3]:null,choice5:this.state.selectedForQuest[4]?this.state.selectedForQuest[4]:null,result:this.state.executionResult})
                                let a = this.props.resultsArray.slice();
                                a.push(this.state.executionResult);
                                let successCount = 0;
                                let failCount = 0;
                                a.forEach((element,index,arr)=>{if (element == 'successful'){successCount++;}else if (element == 'failed'){failCount++;}})
                                this.setState({phase:successCount==3?'killMerlin':failCount==3?'evilVictory':'propose'});
                                if (this.state.phase == 'evilVictory'){this.setState({displayQuestAndAttempt:false});}
                                this.props.setValues(this.props.match.params.room,this.props.playerArray,this.props.quest+1,1,a,this.props.proposedQuestsArray,this.props.teamLeader,this.state.phase);
                                setTimeout(()=>{
                                    this.setState({numberOfPeopleThatCanGo:this.getNumberOfPeopleThatCanGo(this.props.quest,this.props.playerArray.length)})
                                    let b = [];
                                    for (let i = 0; i < this.state.numberOfPeopleThatCanGo; i++){
                                        b.push('');
                                    }
                                    this.setState({executionsReceived:b,selectedForQuest:[],executionResult:'',numberOfFails:0,numberOfSuccesses:0,displayAttempt:true,displayQuestResults:true})
        
                                    socket.emit('go-here',{room:this.props.match.params.room,phase:this.state.phase!='evilVictory'?this.props.phase:'gameDone'})
                                },1000)
                            },2000)
                        },1000)
                    },1000)
                },1000)
            },1000)
        },1000)
    },1000)
}

displayVoteOutcome(){
    setTimeout(()=>{
        this.setState({displayVoteApproveSign:true})
        setTimeout(()=>{
            this.setState({displayApproveVotes:true})
            setTimeout(()=>{
                this.setState({displayVoteRejectSign:true})
                setTimeout(()=>{
                    this.setState({displayRejectVotes:true})
                    setTimeout(()=>{
                        this.setState({displayVoteResultSign:true})
                        setTimeout(()=>{
                            this.setState({displayVoteResult:true})
                            setTimeout(async ()=>{
                                this.setState({displayVoteApproveSign:false,displayVoteRejectSign:false,displayApproveVotes:false,displayRejectVotes:false,displayVoteResultSign:false,displayVoteResult:false})
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
                                    this.setState({displayQuestResults:true})
                                    if (this.state.phase == 'evilVictory'){this.setState({displayQuestAndAttempt:false})}
                                    socket.emit('go-here',{room:this.props.match.params.room,phase:this.state.phase!='evilVictory'?this.props.phase:'gameDone'})
                                },1000)
                            },2000)
                        },2000)
                    },2000)
                },2000)
            },2000)
        },2000)
    },2000)
}

viewVoteFireworks(){
    if (this.state.phase == 'votefun'){
        return(<div>
            {this.displayVoteApproveSign()}
            <div class = 'approves'>{this.displayApproveVotes()}</div>
            {this.displayVoteRejectSign()}
            <div class = 'rejects'>{this.displayRejectVotes()}</div>
            {this.displayVoteResultSign()}
            {this.displayVoteResult()}
        </div>)
    }
}

viewExecutionFireworks(){
    if (this.state.phase == 'executionfun'){
        return (<div>
            {this.displayNumberOfSuccessesSign()}
            {this.displayNumberOfSuccesses()}
            {this.displayNumberOfFailsSign()}
            {this.displayNumberOfFails()}
            {this.displayExecutionResultSign()}
            {this.displayExecutionResult()}
        </div>)
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
        {this.displayEvilWins()}
        {this.displayGoodWins()}
        {this.redirect()}
        </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setValues})(DisplayGame);