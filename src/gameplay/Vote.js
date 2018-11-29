import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect();

class Vote extends Component{
    constructor(props){
        super(props);

        this.state={
            voted:false,
            playerOnQuestArray:[],
            quest:0,
            attempt:0,
            randomNumber:0,
            redirectToResults:false,
            hellokitty:false
        }
        socket.on("done-voting",data=>{
            this.setState({hellokitty:true});
        })
    }

    async componentDidMount(){
            this.setup();
        }

    async setup(){
            socket.emit("join-room",{room:'myroom'});
            let questAndAttempt = await axios.get(`/api/getquestandattempt/${this.props.match.params.matchName}`);
            let {currentquest,currentattempt} = questAndAttempt.data;
            let proposedQuest = await axios.get(`/api/getproposedquest/${this.props.match.params.matchName}/${currentquest}/${currentattempt}`);
            let myVote = this.getMyVote(proposedQuest.data);
            if (myVote == "approve" || myVote == "reject")this.setState({voted:true});
            this.setState({quest:currentquest,attempt:currentattempt});
            let playersOnQuest = [proposedQuest.data.proposedplayer1,proposedQuest.data.proposedplayer2];
            if (proposedQuest.data.proposedplayer3){playersOnQuest.push(proposedQuest.data.proposedplayer3)};
            if (proposedQuest.data.proposedplayer4){playersOnQuest.push(proposedQuest.data.proposedplayer4)};
            if (proposedQuest.data.proposedplayer5){playersOnQuest.push(proposedQuest.data.proposedplayer5)};
            this.setState({playerOnQuestArray:playersOnQuest,randomNumber:Math.random()});
        }

    getMyVote(proposedQuest){
        let {player1vote,player2vote,player3vote,player4vote,player5vote,player6vote,player7vote,player8vote,player9vote,player10vote} = proposedQuest;
        if (this.props.match.params.playerNumber == 1){
            return player1vote;
        }else if (this.props.match.params.playerNumber == 2){
            return player2vote;
        }else if (this.props.match.params.playerNumber == 3){
            return player3vote;
        }else if (this.props.match.params.playerNumber == 4){
            return player4vote;
        }else if (this.props.match.params.playerNumber == 5){
            return player5vote;
        }else if (this.props.match.params.playerNumber == 6){
            return player6vote;
        }else if (this.props.match.params.playerNumber == 7){
            return player7vote;
        }else if (this.props.match.params.playerNumber == 8){
            return player8vote;
        }else if (this.props.match.params.playerNumber == 9){
            return player9vote;
        }else if (this.props.match.params.playerNumber == 10){
            return player10vote;
        }else {}
    }

    renderNamesOfPeoplePutOnQuest(){
        return this.state.playerOnQuestArray.map(element=>{
            return (
                <div>
                    <h4>{element}</h4>
                </div>
            )
        })
    }

    renderRedirectToResults(){
        if (this.state.redirectToResults){
            return <Redirect to={`/waitforvoteresults/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    redirectToResults(){
        if (this.state.hellokitty){
            return <Redirect to={`/waitforvoteresults/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    renderInformation(){
        if (this.state.voted){
            return (
                <div>
                    <h3>Wait while everyone else is voting</h3>
                </div>
            )
        }else if (this.state.randomNumber == 1){
            return (
                <div>
                    <h3>What is your vote?</h3>
                    <h3><button onClick = {()=>this.makeVotedTrue("approve")}>Approve This Team</button></h3>
                    <h3><button onClick = {()=>this.makeVotedTrue("reject")}>Reject This Team</button></h3>
                </div>
            )
        }else{
            return (
                <div>
                    <h3>What is your vote?</h3>
                    <h3><button onClick = {()=>this.makeVotedTrue("reject")}>Reject This Team</button></h3>
                    <h3><button onClick = {()=>this.makeVotedTrue("approve")}>Approve This Team</button></h3>
                </div>
            )
        }
    }

    async makeVotedTrue(vote){
        this.setState({voted:true})
        await axios.post(`/api/castvote`,{matchName:this.props.match.params.matchName,playerNumber:this.props.match.params.playerNumber,quest:this.state.quest,attempt:this.state.attempt,vote});
        let lastVote = await axios.get(`/api/getvoteevaluationnumbers/${this.props.match.params.matchName}`);
        if (lastVote.data){
            await axios.put(`/api/switchoverwhendonevoting/${this.props.match.params.matchName}/${this.state.quest}/${this.state.attempt}`)
            socket.emit('done-voting');
            this.makeRedirectToResultsTrue();
        }
    }

    makeRedirectToResultsTrue(){
        this.setState({redirectToResults:true});
    }

    render(){
        return(
            <div>
            <h4>Voting Phase for Quest #{this.state.quest} Attempt #{this.state.attempt}</h4>
            <h3>It is proposed that the following individuals be put on the quest:</h3>
            {this.renderNamesOfPeoplePutOnQuest()}
            {this.renderInformation()}
            {this.renderRedirectToResults()}
            {this.redirectToResults()}
            </div>
        )
    }
}

export default Vote

/*
The following code is used to reset the whole vote thing

update avalon_votes_quest1_proposal1 set player3vote = null where matchname = 'funmatch';
update avalon_results set votesreceived = 9 where matchname = 'funmatch';
update avalon_results set currentattempt = 1 where matchname = 'funmatch';
update avalon_execution_quest1 set playeronquest1 = 3, playeronquest2 = 0, playeronquest3 = 10 where matchname = 'funmatch';

*/