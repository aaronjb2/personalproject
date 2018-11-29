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
            myTurn:false,
            player1top:false,
            player2top:false,
            player3top:false,
            player4top:false,
            player5top:false,
            player6top:false,
            player7top:false,
            player8top:false,
            player9top:false,
            player10top:false,
            player1bottom:false,
            player2bottom:false,
            player3bottom:false,
            player4bottom:false,
            player5bottom:false,
            player6bottom:false,
            player7bottom:false,
            player8bottom:false,
            player9bottom:false,
            player10bottom:false,
            numberOfPlayersThatCanGoOnCurrentQuest:5,
            goAhead:false,
            playersreceived:0,
            displayCommenceVotingButton:false,
            renderRedirectToVote:false,
            hellokitty:false,
            quest:0 ,
        attempt:0       }
        socket.on("change_of_players_on_quest",data=>{this.setup()})
        socket.on("time-to-vote",data=>{
            this.setState({hellokitty:true});
        })
    }

    async componentDidMount(){
        await this.setup();
        this.setState({goAhead:true})
    }

    renderRedirectToVoteSocket(){
        if (this.state.hellokitty){
            return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    async setup(){
        socket.emit("join-room",{room:'myroom'});
        let allInfo = await axios.get(`/api/getallbasicgameinfo/${this.props.match.params.matchName}`)
        
        console.log(allInfo.data)
        this.setState({allInfo:allInfo.data});
        if (this.state.allInfo.results.currentteamleader == this.props.match.params.playerNumber)this.setState({myTurn:true})
        let numberOfPlayers = this.state.allInfo.players.numberofplayers;
        let questNumber = this.state.allInfo.results.currentquest;
        let amountOfPeopleNeeded = (questNumber == 1 && numberOfPlayers < 8) || (questNumber == 3 && numberOfPlayers == 5)?2:(numberOfPlayers > 7 && questNumber== 1) || (numberOfPlayers < 8 && questNumber == 2) || (numberOfPlayers == 7 && questNumber == 3) || (numberOfPlayers < 7 && questNumber == 4) || (numberOfPlayers == 5 && questNumber == 5)?3: (numberOfPlayers > 7 && questNumber == 2) || (numberOfPlayers > 7 && questNumber == 3) || (numberOfPlayers == 6 && questNumber == 3) || (numberOfPlayers == 7 && questNumber == 4) || (numberOfPlayers == 6 && questNumber == 5) || (numberOfPlayers == 7 && questNumber == 5)?4:5;
        this.setState({numberOfPlayersThatCanGoOnCurrentQuest:amountOfPeopleNeeded});
        this.setState({playersreceived:allInfo.data.results.playersreceived});
        this.setState({displayCommenceVotingButton:false})
        if (this.state.playersreceived == this.state.numberOfPlayersThatCanGoOnCurrentQuest)this.setState({displayCommenceVotingButton:true})
        switch(questNumber){
            case 1:
            if (this.state.allInfo.execution_quest1.playeronquest1 == 1 || this.state.allInfo.execution_quest1.playeronquest2 == 1 || this.state.allInfo.execution_quest1.playeronquest3 == 1) this.setState({player1top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 2 || this.state.allInfo.execution_quest1.playeronquest2 == 2 || this.state.allInfo.execution_quest1.playeronquest3 == 2) this.setState({player2top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 3 || this.state.allInfo.execution_quest1.playeronquest2 == 3 || this.state.allInfo.execution_quest1.playeronquest3 == 3) this.setState({player3top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 4 || this.state.allInfo.execution_quest1.playeronquest2 == 4 || this.state.allInfo.execution_quest1.playeronquest3 == 4) this.setState({player4top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 5 || this.state.allInfo.execution_quest1.playeronquest2 == 5 || this.state.allInfo.execution_quest1.playeronquest3 == 5) this.setState({player5top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 6 || this.state.allInfo.execution_quest1.playeronquest2 == 6 || this.state.allInfo.execution_quest1.playeronquest3 == 6) this.setState({player6top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 7 || this.state.allInfo.execution_quest1.playeronquest2 == 7 || this.state.allInfo.execution_quest1.playeronquest3 == 7) this.setState({player7top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 8 || this.state.allInfo.execution_quest1.playeronquest2 == 8 || this.state.allInfo.execution_quest1.playeronquest3 == 8) this.setState({player8top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 9 || this.state.allInfo.execution_quest1.playeronquest2 == 9 || this.state.allInfo.execution_quest1.playeronquest3 == 9) this.setState({player9top:true});
            if (this.state.allInfo.execution_quest1.playeronquest1 == 10 || this.state.allInfo.execution_quest1.playeronquest2 == 10 || this.state.allInfo.execution_quest1.playeronquest3 == 10) this.setState({player10top:true});
            break;
            case 2:
            if (this.state.allInfo.execution_quest2.playeronquest1 == 1 || this.state.allInfo.execution_quest2.playeronquest2 == 1 || this.state.allInfo.execution_quest2.playeronquest3 == 1 || this.state.allInfo.execution_quest2.playeronquest4 == 1) this.setState({player1top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 2 || this.state.allInfo.execution_quest2.playeronquest2 == 2 || this.state.allInfo.execution_quest2.playeronquest3 == 2 || this.state.allInfo.execution_quest2.playeronquest4 == 2) this.setState({player2top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 3 || this.state.allInfo.execution_quest2.playeronquest2 == 3 || this.state.allInfo.execution_quest2.playeronquest3 == 3 || this.state.allInfo.execution_quest2.playeronquest4 == 3) this.setState({player3top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 4 || this.state.allInfo.execution_quest2.playeronquest2 == 4 || this.state.allInfo.execution_quest2.playeronquest3 == 4 || this.state.allInfo.execution_quest2.playeronquest4 == 4) this.setState({player4top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 5 || this.state.allInfo.execution_quest2.playeronquest2 == 5 || this.state.allInfo.execution_quest2.playeronquest3 == 5 || this.state.allInfo.execution_quest2.playeronquest4 == 5) this.setState({player5top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 6 || this.state.allInfo.execution_quest2.playeronquest2 == 6 || this.state.allInfo.execution_quest2.playeronquest3 == 6 || this.state.allInfo.execution_quest2.playeronquest4 == 6) this.setState({player6top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 7 || this.state.allInfo.execution_quest2.playeronquest2 == 7 || this.state.allInfo.execution_quest2.playeronquest3 == 7 || this.state.allInfo.execution_quest2.playeronquest4 == 7) this.setState({player7top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 8 || this.state.allInfo.execution_quest2.playeronquest2 == 8 || this.state.allInfo.execution_quest2.playeronquest3 == 8 || this.state.allInfo.execution_quest2.playeronquest4 == 8) this.setState({player8top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 9 || this.state.allInfo.execution_quest2.playeronquest2 == 9 || this.state.allInfo.execution_quest2.playeronquest3 == 9 || this.state.allInfo.execution_quest2.playeronquest4 == 9) this.setState({player9top:true});
            if (this.state.allInfo.execution_quest2.playeronquest1 == 10 || this.state.allInfo.execution_quest2.playeronquest2 == 10 || this.state.allInfo.execution_quest2.playeronquest3 == 10 || this.state.allInfo.execution_quest2.playeronquest4 == 10) this.setState({player10top:true});
            break;
            case 3:
            if (this.state.allInfo.execution_quest3.playeronquest1 == 1 || this.state.allInfo.execution_quest3.playeronquest2 == 1 || this.state.allInfo.execution_quest3.playeronquest3 == 1 || this.state.allInfo.execution_quest3.playeronquest4 == 1) this.setState({player1top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 2 || this.state.allInfo.execution_quest3.playeronquest2 == 2 || this.state.allInfo.execution_quest3.playeronquest3 == 2 || this.state.allInfo.execution_quest3.playeronquest4 == 2) this.setState({player2top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 3 || this.state.allInfo.execution_quest3.playeronquest2 == 3 || this.state.allInfo.execution_quest3.playeronquest3 == 3 || this.state.allInfo.execution_quest3.playeronquest4 == 3) this.setState({player3top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 4 || this.state.allInfo.execution_quest3.playeronquest2 == 4 || this.state.allInfo.execution_quest3.playeronquest3 == 4 || this.state.allInfo.execution_quest3.playeronquest4 == 4) this.setState({player4top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 5 || this.state.allInfo.execution_quest3.playeronquest2 == 5 || this.state.allInfo.execution_quest3.playeronquest3 == 5 || this.state.allInfo.execution_quest3.playeronquest4 == 5) this.setState({player5top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 6 || this.state.allInfo.execution_quest3.playeronquest2 == 6 || this.state.allInfo.execution_quest3.playeronquest3 == 6 || this.state.allInfo.execution_quest3.playeronquest4 == 6) this.setState({player6top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 7 || this.state.allInfo.execution_quest3.playeronquest2 == 7 || this.state.allInfo.execution_quest3.playeronquest3 == 7 || this.state.allInfo.execution_quest3.playeronquest4 == 7) this.setState({player7top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 8 || this.state.allInfo.execution_quest3.playeronquest2 == 8 || this.state.allInfo.execution_quest3.playeronquest3 == 8 || this.state.allInfo.execution_quest3.playeronquest4 == 8) this.setState({player8top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 9 || this.state.allInfo.execution_quest3.playeronquest2 == 9 || this.state.allInfo.execution_quest3.playeronquest3 == 9 || this.state.allInfo.execution_quest3.playeronquest4 == 9) this.setState({player9top:true});
            if (this.state.allInfo.execution_quest3.playeronquest1 == 10 || this.state.allInfo.execution_quest3.playeronquest2 == 10 || this.state.allInfo.execution_quest3.playeronquest3 == 10 || this.state.allInfo.execution_quest3.playeronquest4 == 10) this.setState({player10top:true});
            break;
            case 4:
            if (this.state.allInfo.execution_quest4.playeronquest1 == 1 || this.state.allInfo.execution_quest4.playeronquest2 == 1 || this.state.allInfo.execution_quest4.playeronquest3 == 1 || this.state.allInfo.execution_quest4.playeronquest4 == 1 || this.state.allInfo.execution_quest4.playeronquest5 == 1) this.setState({player1top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 2 || this.state.allInfo.execution_quest4.playeronquest2 == 2 || this.state.allInfo.execution_quest4.playeronquest3 == 2 || this.state.allInfo.execution_quest4.playeronquest4 == 2 || this.state.allInfo.execution_quest4.playeronquest5 == 2) this.setState({player2top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 3 || this.state.allInfo.execution_quest4.playeronquest2 == 3 || this.state.allInfo.execution_quest4.playeronquest3 == 3 || this.state.allInfo.execution_quest4.playeronquest4 == 3 || this.state.allInfo.execution_quest4.playeronquest5 == 3) this.setState({player3top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 4 || this.state.allInfo.execution_quest4.playeronquest2 == 4 || this.state.allInfo.execution_quest4.playeronquest3 == 4 || this.state.allInfo.execution_quest4.playeronquest4 == 4 || this.state.allInfo.execution_quest4.playeronquest5 == 4) this.setState({player4top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 5 || this.state.allInfo.execution_quest4.playeronquest2 == 5 || this.state.allInfo.execution_quest4.playeronquest3 == 5 || this.state.allInfo.execution_quest4.playeronquest4 == 5 || this.state.allInfo.execution_quest4.playeronquest5 == 5) this.setState({player5top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 6 || this.state.allInfo.execution_quest4.playeronquest2 == 6 || this.state.allInfo.execution_quest4.playeronquest3 == 6 || this.state.allInfo.execution_quest4.playeronquest4 == 6 || this.state.allInfo.execution_quest4.playeronquest5 == 6) this.setState({player6top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 7 || this.state.allInfo.execution_quest4.playeronquest2 == 7 || this.state.allInfo.execution_quest4.playeronquest3 == 7 || this.state.allInfo.execution_quest4.playeronquest4 == 7 || this.state.allInfo.execution_quest4.playeronquest5 == 7) this.setState({player7top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 8 || this.state.allInfo.execution_quest4.playeronquest2 == 8 || this.state.allInfo.execution_quest4.playeronquest3 == 8 || this.state.allInfo.execution_quest4.playeronquest4 == 8 || this.state.allInfo.execution_quest4.playeronquest5 == 8) this.setState({player8top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 9 || this.state.allInfo.execution_quest4.playeronquest2 == 9 || this.state.allInfo.execution_quest4.playeronquest3 == 9 || this.state.allInfo.execution_quest4.playeronquest4 == 9 || this.state.allInfo.execution_quest4.playeronquest5 == 9) this.setState({player9top:true});
            if (this.state.allInfo.execution_quest4.playeronquest1 == 10 || this.state.allInfo.execution_quest4.playeronquest2 == 10 || this.state.allInfo.execution_quest4.playeronquest3 == 10 || this.state.allInfo.execution_quest4.playeronquest4 == 10 || this.state.allInfo.execution_quest4.playeronquest5 == 10) this.setState({player10top:true});
            break;
            case 5:
            if (this.state.allInfo.execution_quest5.playeronquest1 == 1 || this.state.allInfo.execution_quest5.playeronquest2 == 1 || this.state.allInfo.execution_quest5.playeronquest3 == 1 || this.state.allInfo.execution_quest5.playeronquest4 == 1 || this.state.allInfo.execution_quest5.playeronquest5 == 1) this.setState({player1top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 2 || this.state.allInfo.execution_quest5.playeronquest2 == 2 || this.state.allInfo.execution_quest5.playeronquest3 == 2 || this.state.allInfo.execution_quest5.playeronquest4 == 2 || this.state.allInfo.execution_quest5.playeronquest5 == 2) this.setState({player2top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 3 || this.state.allInfo.execution_quest5.playeronquest2 == 3 || this.state.allInfo.execution_quest5.playeronquest3 == 3 || this.state.allInfo.execution_quest5.playeronquest4 == 3 || this.state.allInfo.execution_quest5.playeronquest5 == 3) this.setState({player3top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 4 || this.state.allInfo.execution_quest5.playeronquest2 == 4 || this.state.allInfo.execution_quest5.playeronquest3 == 4 || this.state.allInfo.execution_quest5.playeronquest4 == 4 || this.state.allInfo.execution_quest5.playeronquest5 == 4) this.setState({player4top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 5 || this.state.allInfo.execution_quest5.playeronquest2 == 5 || this.state.allInfo.execution_quest5.playeronquest3 == 5 || this.state.allInfo.execution_quest5.playeronquest4 == 5 || this.state.allInfo.execution_quest5.playeronquest5 == 5) this.setState({player5top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 6 || this.state.allInfo.execution_quest5.playeronquest2 == 6 || this.state.allInfo.execution_quest5.playeronquest3 == 6 || this.state.allInfo.execution_quest5.playeronquest4 == 6 || this.state.allInfo.execution_quest5.playeronquest5 == 6) this.setState({player6top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 7 || this.state.allInfo.execution_quest5.playeronquest2 == 7 || this.state.allInfo.execution_quest5.playeronquest3 == 7 || this.state.allInfo.execution_quest5.playeronquest4 == 7 || this.state.allInfo.execution_quest5.playeronquest5 == 7) this.setState({player7top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 8 || this.state.allInfo.execution_quest5.playeronquest2 == 8 || this.state.allInfo.execution_quest5.playeronquest3 == 8 || this.state.allInfo.execution_quest5.playeronquest4 == 8 || this.state.allInfo.execution_quest5.playeronquest5 == 8) this.setState({player8top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 9 || this.state.allInfo.execution_quest5.playeronquest2 == 9 || this.state.allInfo.execution_quest5.playeronquest3 == 9 || this.state.allInfo.execution_quest5.playeronquest4 == 9 || this.state.allInfo.execution_quest5.playeronquest5 == 9) this.setState({player9top:true});
            if (this.state.allInfo.execution_quest5.playeronquest1 == 10 || this.state.allInfo.execution_quest5.playeronquest2 == 10 || this.state.allInfo.execution_quest5.playeronquest3 == 10 || this.state.allInfo.execution_quest5.playeronquest4 == 10 || this.state.allInfo.execution_quest5.playeronquest5 == 10) this.setState({player10top:true});
            break;
            default:
            break;
        }
        if (!this.state.player1top) this.setState({player1bottom:true});
        if (!this.state.player2top) this.setState({player2bottom:true});
        if (!this.state.player3top) this.setState({player3bottom:true});
        if (!this.state.player4top) this.setState({player4bottom:true});
        if (!this.state.player5top) this.setState({player5bottom:true});
        if (!this.state.player6top && numberOfPlayers > 5) this.setState({player6bottom:true});
        if (!this.state.player7top && numberOfPlayers > 6) this.setState({player7bottom:true});
        if (!this.state.player8top && numberOfPlayers > 7) this.setState({player8bottom:true});
        if (!this.state.player9top && numberOfPlayers > 8) this.setState({player9bottom:true});
        if (!this.state.player10top && numberOfPlayers > 9) this.setState({player10bottom:true});
    }

    renderRedirectToVote(){
        if (this.state.renderRedirectToVote){
            console.log('this.state.allInfo:',this.state.allInfo)
            return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    async makeRenderRedirectToVoteTrue(){
        console.log('should be 4:',this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest1:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest1:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest1:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest1:this.state.allInfo.execution_quest1.playeronquest1)
        await axios.post(`/api/createvotecolumn`,{attempt:this.state.allInfo.results.currentattempt,quest:this.state.allInfo.results.currentquest,matchName:this.props.match.params.matchName,teamleader:this.props.match.params.playerNumber,playeronquest1:this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest1:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest1:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest1:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest1:this.state.allInfo.execution_quest1.playeronquest1,playeronquest2:this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest2:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest2:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest2:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest2:this.state.allInfo.execution_quest1.playeronquest2,playeronquest3:this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest3:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest3:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest3:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest3:this.state.allInfo.execution_quest1.playeronquest3,playeronquest4:this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest4:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest4:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest4:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest4:this.state.allInfo.execution_quest1.playeronquest4,playeronquest5:this.state.allInfo.execution_quest5?this.state.allInfo.execution_quest5.playeronquest5:this.state.allInfo.execution_quest4?this.state.allInfo.execution_quest4.playeronquest5:this.state.allInfo.execution_quest3?this.state.allInfo.execution_quest3.playeronquest5:this.state.allInfo.execution_quest2?this.state.allInfo.execution_quest2.playeronquest5:this.state.allInfo.execution_quest1.playeronquest5});
        await axios.put(`/api/changephase/${this.props.match.params.matchName}/${'vote'}`)
        socket.emit('time-to-vote');
        this.setState({renderRedirectToVote:true})
    }

    displayPertinentButtonsUpTop(){
        let a;
        return (
            <div>
                {this.displayButton1Top()}
                {this.displayButton2Top()}
                {this.displayButton3Top()}
                {this.displayButton4Top()}
                {this.displayButton5Top()}
                {this.displayButton6Top()}
                {this.displayButton7Top()}
                {this.displayButton8Top()}
                {this.displayButton9Top()}
                {this.displayButton10Top()}
                {()=>{if (this.state.player1top)return(<h4><button onClick = {async ()=>{this.setState({player1top:false, player1bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>1</button></h4>)}}
                {()=>{if (this.state.player2top)return(<h4><button onClick = {async ()=>{this.setState({player2top:false, player2bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>2</button></h4>)}}
                {()=>{if (this.state.player3top)return(<h4><button onClick = {async ()=>{this.setState({player3top:false, player3bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>3</button></h4>)}}
                {()=>{if (this.state.player4top)return(<h4><button onClick = {async ()=>{this.setState({player4top:false, player4bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>4</button></h4>)}}
                {()=>{if (this.state.player5top)return(<h4><button onClick = {async ()=>{this.setState({player5top:false, player5bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>5</button></h4>)}}
                {()=>{if (this.state.player6top)return(<h4><button onClick = {async ()=>{this.setState({player6top:false, player6bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>6</button></h4>)}}
                {()=>{if (this.state.player7top)return(<h4><button onClick = {async ()=>{this.setState({player7top:false, player7bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>7</button></h4>)}}
                {()=>{if (this.state.player8top)return(<h4><button onClick = {async ()=>{this.setState({player8top:false, player8bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>8</button></h4>)}}
                {()=>{if (this.state.player9top)return(<h4><button onClick = {async ()=>{this.setState({player9top:false, player9bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>9</button></h4>)}}
                {()=>{if (this.state.player10top)return(<h4><button onClick = {async ()=>{this.setState({player10top:false, player10bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}>10</button></h4>)}}
            </div>
        )
    }

    displayPertinentButtonsDownBottom(){
        let a;
        
        return (
            <div>
                {this.displayButton1Bottom()}
                {this.displayButton2Bottom()}
                {this.displayButton3Bottom()}
                {this.displayButton4Bottom()}
                {this.displayButton5Bottom()}
                {this.displayButton6Bottom()}
                {this.displayButton7Bottom()}
                {this.displayButton8Bottom()}
                {this.displayButton9Bottom()}
                {this.displayButton10Bottom()}
                {()=>{if (this.state.player1bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player1top:true, player1bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>1</button></h4>)}}}
                {()=>{if (this.state.player2bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player2top:true, player2bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>2</button></h4>)}}}
                {()=>{if (this.state.player3bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player3top:true, player3bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>3</button></h4>)}}}
                {()=>{if (this.state.player4bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player4top:true, player4bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>4</button></h4>)}}}
                {()=>{if (this.state.player5bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player5top:true, player5bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>5</button></h4>)}}}
                {()=>{if (this.state.player6bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player6top:true, player6bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>6</button></h4>)}}}
                {()=>{if (this.state.player7bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player7top:true, player7bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>7</button></h4>)}}}
                {()=>{if (this.state.player8bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player8top:true, player8bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>8</button></h4>)}}}
                {()=>{if (this.state.player9bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player9top:true, player9bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>9</button></h4>)}}}
                {()=>{if (this.state.player10bottom){return(<h4><button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.allInfo.results.playersreceived){this.setState({player10top:true, player10bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change");}}}>10</button></h4>)}}}
            </div>
        )
    }

    displayButton1Bottom(){
        let a;
        if (this.state.player1bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player1top:true, player1bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>1</button>)}
    }

    displayButton2Bottom(){
        let a;
        if (this.state.player2bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player2top:true, player2bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>2</button>)}
    }

    displayButton3Bottom(){
        let a;
        if (this.state.player3bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player3top:true, player3bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>3</button>)}
    }

    displayButton4Bottom(){
        let a;
        if (this.state.player4bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player4top:true, player4bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>4</button>)}
    }

    displayButton5Bottom(){
        let a;
        if (this.state.player5bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player5top:true, player5bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>5</button>)}
    }

    displayButton6Bottom(){
        let a;
        if (this.state.player6bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player6top:true, player6bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>6</button>)}
    }

    displayButton7Bottom(){
        let a;
        if (this.state.player7bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player7top:true, player7bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>7</button>)}
    }

    displayButton8Bottom(){
        let a;
        if (this.state.player8bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player8top:true, player8bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>8</button>)}
    }

    displayButton9Bottom(){
        let a;
        if (this.state.player9bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player9top:true, player9bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>9</button>)}
    }

    displayButton10Bottom(){
        let a;
        if (this.state.player10bottom){return(<button onClick = {async ()=>{if (this.state.numberOfPlayersThatCanGoOnCurrentQuest > this.state.playersreceived){await this.setState({player10top:true, player10bottom:false}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}}>10</button>)}
    }

    displayButton1Top(){
        let a;
        if (this.state.player1top)return(<button onClick = {async ()=>{await this.setState({player1top:false, player1bottom:true}); a = this.packageUpDelivery(); console.log(a); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>1</button>)
    }

    displayButton2Top(){
        let a;
        if (this.state.player2top)return(<button onClick = {async ()=>{await this.setState({player2top:false, player2bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>2</button>)
    }

    displayButton3Top(){
        let a;
        if (this.state.player3top)return(<button onClick = {async ()=>{await this.setState({player3top:false, player3bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>3</button>)
    }

    displayButton4Top(){
        let a;
        if (this.state.player4top)return(<button onClick = {async ()=>{await this.setState({player4top:false, player4bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>4</button>)
    }

    displayButton5Top(){
        let a;
        if (this.state.player5top)return(<button onClick = {async ()=>{await this.setState({player5top:false, player5bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>5</button>)
    }

    displayButton6Top(){
        let a;
        if (this.state.player6top)return(<button onClick = {async ()=>{await this.setState({player6top:false, player6bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>6</button>)
    }

    displayButton7Top(){
        let a;
        if (this.state.player7top)return(<button onClick = {async ()=>{await this.setState({player7top:false, player7bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>7</button>)
    }

    displayButton8Top(){
        let a;
        if (this.state.player8top)return(<button onClick = {async ()=>{await this.setState({player8top:false, player8bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>8</button>)
    }

    displayButton9Top(){
        let a;
        if (this.state.player9top)return(<button onClick = {async ()=>{await this.setState({player9top:false, player9bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>9</button>)
    }

    displayButton10Top(){
        let a;
        if (this.state.player10top)return(<button onClick = {async ()=>{await this.setState({player10top:false, player10bottom:true}); a = this.packageUpDelivery(); await axios.put(`/api/updateplayersonquest/${a.matchName}/${a.questNumber}/${a.questPlayer1}/${a.questPlayer2}/${a.questPlayer3}/${a.questPlayer4}/${a.questPlayer5}`); socket.emit("players-on-quest-change"); this.setup()}}>10</button>)
    }

    packageUpDelivery(){
        let questPlayer1 = this.state.player1top?1:this.state.player2top?2:this.state.player3top?3:this.state.player4top?4:this.state.player5top?5:this.state.player6top?6:this.state.player7top?7:this.state.player8top?8:this.state.player9top?9:this.state.player10top?10:null;
        let questPlayer2 = (this.state.player2top && questPlayer1 != 2)?2:(this.state.player3top && questPlayer1 != 3)?3:(this.state.player4top && questPlayer1 !=4)?4:(this.state.player5top && questPlayer1 != 5)?5:(this.state.player6top && questPlayer1 != 6)?6:(this.state.player7top && questPlayer1 != 7)?7:(this.state.player8top && questPlayer1 != 8)?8:(this.state.player9top && questPlayer1 != 9)?9:(this.state.player10top && questPlayer1 != 10)?10:null;
        let questPlayer3 = (this.state.player3top && questPlayer1 != 3 && questPlayer2 != 3)?3:(this.state.player4top && questPlayer1 !=4 && questPlayer2 != 4)?4:(this.state.player5top && questPlayer1 != 5 && questPlayer2 != 5)?5:(this.state.player6top && questPlayer1 != 6 && questPlayer2 != 6)?6:(this.state.player7top && questPlayer1 != 7 && questPlayer2 != 7)?7:(this.state.player8top && questPlayer1 != 8 && questPlayer2 != 8)?8:(this.state.player9top && questPlayer1 != 9 && questPlayer2 != 9)?9:(this.state.player10top && questPlayer1 != 10 && questPlayer2 != 10)?10:null;
        let questPlayer4 = (this.state.player4top && questPlayer1 !=4 && questPlayer2 != 4 && questPlayer3 != 4)?4:(this.state.player5top && questPlayer1 != 5 && questPlayer2 != 5 && questPlayer3 != 5)?5:(this.state.player6top && questPlayer1 != 6 && questPlayer2 != 6 && questPlayer3 != 6)?6:(this.state.player7top && questPlayer1 != 7 && questPlayer2 != 7 && questPlayer3 != 7)?7:(this.state.player8top && questPlayer1 != 8 && questPlayer2 != 8 && questPlayer3 != 8)?8:(this.state.player9top && questPlayer1 != 9 && questPlayer2 != 9 && questPlayer3 != 9)?9:(this.state.player10top && questPlayer1 != 10 && questPlayer2 != 10 && questPlayer3 != 10)?10:null;
        let questPlayer5 = (this.state.player5top && questPlayer1 != 5 && questPlayer2 != 5 && questPlayer3 != 5 && questPlayer4 != 5)?5:(this.state.player6top && questPlayer1 != 6 && questPlayer2 != 6 && questPlayer3 != 6 && questPlayer4 != 6)?6:(this.state.player7top && questPlayer1 != 7 && questPlayer2 != 7 && questPlayer3 != 7 && questPlayer4 != 7)?7:(this.state.player8top && questPlayer1 != 8 && questPlayer2 != 8 && questPlayer3 != 8 && questPlayer4 != 8)?8:(this.state.player9top && questPlayer1 != 9 && questPlayer2 != 9 && questPlayer3 != 9 && questPlayer4 != 9)?9:(this.state.player10top && questPlayer1 != 10 && questPlayer2 != 10 && questPlayer3 != 10 && questPlayer4 != 10)?10:null;
        return {questPlayer1,questPlayer2,questPlayer3,questPlayer4,questPlayer5,matchName:this.props.match.params.matchName,questNumber:this.state.allInfo.results.currentquest}
    }

    displayPertinentInformation(){
        if (this.state.goAhead){
        if (!this.state.myTurn){
            return (
                <div>
                    <h3>{this.state.allInfo.results.currentteamleader} is the current teamLeader.  Wait for them to propose the quest we will vote on.</h3>
                </div>
            )
        }else{
            return(
                <div>
                    <h3>You are the current team leader.  Select {this.state.numberOfPlayersThatCanGoOnCurrentQuest} players to put on the {this.state.allInfo.results.currentquest == 1?'1st':this.state.allInfo.results.currentquest == 2?'2nd':this.state.allInfo.results.currentquest == 3?'3rd':this.state.allInfo.results.currentquest+'th'} Quest</h3>
                    <h4>On quest:</h4>
                    {this.displayPertinentButtonsUpTop()}
                    <h4>Not on quest:</h4>
                    {this.displayPertinentButtonsDownBottom()}
                    {this.displayCommenceVotingButton()}
                </div>
            )
        }
    }
    }

    displayCommenceVotingButton(){
        if (this.state.displayCommenceVotingButton){
            return(
                <div>
                <button onClick={()=>this.makeRenderRedirectToVoteTrue()}>Commence Voting</button>
                    </div>
            )
        }
    }

    render(){
        return(
            <div>
            <h4>MakeProposal</h4>
            {this.displayPertinentInformation()}
            {this.renderRedirectToVote()}
            {this.renderRedirectToVoteSocket()}
            </div>
        )
    }
}

export default MakeProposal