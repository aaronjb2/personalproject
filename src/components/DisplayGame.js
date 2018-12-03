import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {setValues} from '../dux/reducer.js';
import './DisplayGame.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

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
        voteResult:'',
        displayApproveVotes:false,
        displayRejectVotes:false,
        displayVoteResult:false,
        displayVoteApproveSign:false,
        displayVoteRejectSign:false,
        displayVoteResultSign:false
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
        console.log('inside commence voting')
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
    },5000)
    socket.emit('join-room',{room:this.props.match.params.room})
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
            <h4>Current Considerations</h4>
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
        <h1>Quest #{this.props.quest}{this.state.displayAttempt?`        Attempt#${this.props.attempt}`:``}</h1>
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
            <h3>Execute</h3>
        </div>
            )
    }
}

displayKillMerlin(){
    if (this.state.phase == 'killMerlin'){

    }
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
                                this.setState({phase:this.state.voteResult=='approve'?'execute':'propose'})
                                console.log('this.state.phase:',this.state.phase)
                                let pqa=this.props.proposedQuestsArray.slice();
                                pqa.push({votesArray:this.state.votesReceived.slice(),choicesArray:this.state.selectedForQuest.slice(),quest:this.props.quest,attempt:this.props.attempt,teamLeader:this.props.teamLeader,result:this.state.voteResult});
                                await axios.post(`/api/createvotes`,{room:this.props.match.params.room,quest:this.props.quest,attempt:this.props.attempt,teamLeader:this.props.teamLeader,choice1:this.state.selectedForQuest[0]?this.state.selectedForQuest[0]:null,choice2:this.state.selectedForQuest[1]?this.state.selectedForQuest[1]:null,choice3:this.state.selectedForQuest[2]?this.state.selectedForQuest[2]:null,choice4:this.state.selectedForQuest[3]?this.state.selectedForQuest[3]:null,choice5:this.state.selectedForQuest[4]?this.state.selectedForQuest[4]:null,vote1:this.state.votesReceived[0]?this.state.votesReceived[0]:null,vote2:this.state.votesReceived[1]?this.state.votesReceived[1]:null,vote3:this.state.votesReceived[2]?this.state.votesReceived[2]:null,vote4:this.state.votesReceived[3]?this.state.votesReceived[3]:null,vote5:this.state.votesReceived[4]?this.state.votesReceived[4]:null,vote6:this.state.votesReceived[5]?this.state.votesReceived[5]:null,vote7:this.state.votesReceived[6]?this.state.votesReceived[6]:null,vote8:this.state.votesReceived[7]?this.state.votesReceived[7]:null,vote9:this.state.votesReceived[8]?this.state.votesReceived[8]:null,vote10:this.state.votesReceived[9]?this.state.votesReceived[9]:null,result:this.state.voteResult});
                                this.props.setValues(this.props.match.params.room,this.props.playerArray,this.state.phase=='execute'?this.props.quest+1:this.props.quest,this.state.phase=='propose'?this.props.attempt+1:1,this.props.resultsArray,pqa,this.props.teamLeader==this.props.playerArray.length?1:this.props.teamLeader+1,this.state.phase)
                                this.setState({notSelectedForQuest:this.props.playerArray.length==5?[1,2,3,4,5]:this.props.playerArray.length==6?[1,2,3,4,5,6]:this.props.playerArray.length==7?[1,2,3,4,5,6,7]:this.props.playerArray.length==8?[1,2,3,4,5,6,7,8]:this.props.playerArray.length==9?[1,2,3,4,5,6,7,8,9]:[1,2,3,4,5,6,7,8,9,10]})
                                this.setState({selectedForQuest:[],votesReceived:[],voteResult:'',displayQuestAndAttempt:true,displayAttempt:this.state.phase=='execute'?false:true})
                                setTimeout(()=>{
                                    socket.emit('go-here',{room:this.props.match.params.room,phase:this.props.phase})
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

render(){
    return(<div>
        {this.displayQuestResults()}
        {this.displayQuestAndAttempt()}
        {this.displayPropose()}
        {this.displayVote()}
        {this.displayExecute()}
        {this.displayKillMerlin()}
        {this.displayStare()}
        {this.viewVoteFireworks()}
        </div>)
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setValues})(DisplayGame);