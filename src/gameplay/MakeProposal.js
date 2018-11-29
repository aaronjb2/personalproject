import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect("http://localhost:4000");

class MakeProposal extends Component{
    constructor(props){
        super(props);
        this.state = {
            allInfo:'',
            playerArray:[],
            playerforquest1:0,
            playerforquest2:0,
            playerforquest3:0,
            playerforquest4:0,
            playerforquest5:0,
            numberOfPlayersThatCanGoOnCurrentQuest:5,
            goAhead:false,
            playersreceived:0,
            displayCommenceVotingButton:false,
            renderRedirectToVote:false,
            hellokitty:false,
            quest:0 ,
        attempt:0,
        teamleader:0,
    numberOfPlayers:0       }
        socket.on("change_of_players_on_quest",data=>{this.setup()})
        socket.on("time-to-vote",data=>{
            this.setState({hellokitty:true});
        })
    }

    async componentDidMount(){
        for (let i = 0; i < 10; i++){
            console.log(Math.floor(Math.random() * 5)+1)
        }
        await this.setup();
    }

    async setup(){
        socket.emit("join-room",{room:'myroom'});
        let a = await axios.get(`/api/questattemptteamleader/${this.props.match.params.matchName}`);
        console.log(a.data)
        console.log('made it right here')
        await this.setState({quest:a.data.currentquest,attempt:a.data.currentattempt,numberOfPlayers:a.data.numberofplayers,teamleader:a.data.currentteamleader})
        console.log('then right here')
        console.log('a.data.currentquest:',a.data.currentquest)
        let b = await axios.get(`api/getcurrentexecution/${this.props.match.params.matchName}/${a.data.currentquest}`);
        console.log('but what about here')
        b.data.playersOnQuestArray.length = a.data.numberofplayers;
        this.setState({playerArray:b.data.playersOnQuestArray,numberOfPlayersThatCanGoOnCurrentQuest:(this.state.quest == 1 && this.state.numberOfPlayers < 8) || (this.state.quest == 3 && this.state.numberOfPlayers == 5)?2:(this.state.numberOfPlayers > 7 && this.state.quest== 1) || (this.state.numberOfPlayers < 8 && this.state.quest == 2) || (this.state.numberOfPlayers == 7 && this.state.quest == 3) || (this.state.numberOfPlayers < 7 && this.state.quest == 4) || (this.state.numberOfPlayers == 5 && this.state.quest == 5)?3: (this.state.numberOfPlayers > 7 && this.state.quest == 2) || (this.state.numberOfPlayers > 7 && this.state.quest == 3) || (this.state.numberOfPlayers == 6 && this.state.quest == 3) || (this.state.numberOfPlayers == 7 && this.state.quest == 4) || (this.state.numberOfPlayers == 6 && this.state.quest == 5) || (this.state.numberOfPlayers == 7 && this.state.quest == 5)?4:5});
        let count = 0;
        this.state.playerArray.forEach((element,index)=>{if (element == 'on quest'){count++; if (this.state.playerforquest1 == 0){this.setState({playerforquest1:index+1})}else if (this.state.playerforquest2 == 0){this.setState({playerforquest2:index+1})}else if (this.state.playerforquest3 == 0){this.setState({playerforquest3:index+1})}else if (this.state.playerforquest4 == 0){this.setState({playerforquest4:index+1})}else if (this.state.playerforquest5 == 0){this.setState({playerforquest5:index+1})}} })
        if (count < 5){this.setState({playerforquest5:null})}; if (count < 4){this.setState({playerforquest4:null})}; if (count < 3){this.setState({playerforquest3:null})};if (count < 2){this.setState({playerforquest2:null})}; if (count < 1){this.setState({playerforquest1:null})};
        this.setState({displayCommenceVotingButton:count==this.state.numberOfPlayersThatCanGoOnCurrentQuest?true:false})
    }

    displayPertinentInformation(){
        if (this.state.teamleader == this.props.match.params.playerNumber){
            return (
                <div>
                    <h3>You are the current team leader.  Select {this.state.numberOfPlayersThatCanGoOnCurrentQuest} players for quest #{this.state.quest} attempt #{this.state.attempt}</h3>
                    <h4>On Quest:</h4>
                    <h4>{this.displayOnQuest()}</h4>
                    <h4>Not On Quest:</h4>
                    <h4>{this.displayNotOnQuest()}</h4>
                    <h4>{this.displayCommenceVotingButton()}</h4>
                </div>
            )
        }else{
            return (
                <div>
                    <h4>{this.state.teamleader} is the current teamleader.  They must select the team we vote on.</h4>
                </div>
            )
        }
    }

    displayCommenceVotingButton(){
        if (this.state.displayCommenceVotingButton){
            return (
                <button onClick={()=>this.makeRenderRedirectToVoteTrue()}>Let's Vote</button>
            )
        }
    }

    async makeRenderRedirectToVoteTrue(){
        await axios.post(`/api/createvotecolumn`,{attempt:this.state.attempt,quest:this.state.quest,matchName:this.props.match.params.matchName,teamleader:this.props.match.params.playerNumber,playeronquest1:this.state.playerforquest1,playeronquest2:this.state.playerforquest2,playeronquest3:this.state.playerforquest3,playeronquest4:this.state.playerforquest4,playeronquest5:this.state.playerforquest5})
        await axios.put(`/api/changephase/${this.props.match.params.matchName}/${'vote'}`)
        socket.emit('time-to-vote');
        this.setState({renderRedirectToVote:true})
    }

    renderRedirectToVote(){
        if (this.state.renderRedirectToVote){
            return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    displayOnQuest(){
        return this.state.playerArray.map((element,index,arr)=>{
            if (element == "on quest"){
                 return (
                     <button onClick ={()=>this.movePlayer(index+1,true)}>Player{index+1}</button>
                 )
             }
         })
    }

    displayNotOnQuest(){
        return this.state.playerArray.map((element,index,arr)=>{
           if (element == "not on quest"){
                return (
                    <button onClick ={()=>this.movePlayer(index+1,false)}>Player{index+1}</button>
                )
            }
        })
    }

    renderRedirectToVoteSocket(){
        if (this.state.hellokitty){
            return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    async movePlayer(playerNumber,a){
        let onArray = [];
        if (this.state.playerArray[playerNumber - 1] == "not on quest"){
            for (let i = 0; i < this.state.playerArray.length; i++){
                if (i + 1 == playerNumber || this.state.playerArray[i] == "on quest"){
                    onArray.push(i+1);
                }
            }
        }else{
            for (let i = 0; i < this.state.playerArray.length; i++){
                if (i + 1 != playerNumber && this.state.playerArray[i] == "on quest"){
                    onArray.push(i+1);
                }
            }
        }
        if (this.state.numberOfPlayersThatCanGoOnCurrentQuest + 1 != onArray.length || a){
            await axios.put(`/api/adjustquest/${this.props.match.params.matchName}/${onArray}/${this.state.quest}`);
            this.setup();
            
        }
        
    }

    render(){
        return(
            <div>
                <h4>Make a Proposal</h4>
                {this.displayPertinentInformation()}
                {this.renderRedirectToVote()}
            {this.renderRedirectToVoteSocket()}
            </div>
        )
    }
}



export default MakeProposal;