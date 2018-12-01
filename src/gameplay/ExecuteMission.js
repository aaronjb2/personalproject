import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect('http://localhost:4000');

class ExecuteMission extends Component{
    constructor(props){
        super(props);

        this.state={
            executingQuest:false,
            quest:0,
            playersOnQuestArray:[],
            executionsArray:[],
            position:-1,
            randomNumber:0,
            redirectToResults:false,
            hellokitty:false
        }
        socket.on("done-executing",data=>{
            this.setState({hellokitty:true});
        })
    }

    async componentDidMount(){
        this.setup();
        }

        async setup(){
            socket.emit("join-room",{room:'myroom'});
            let quest = await axios.get(`/api/getquest/${this.props.match.params.matchName}`);
            this.setState({quest:quest.data.currentquest});
            let a = await axios.get(`/api/getcurrentexecution/${this.props.match.params.matchName}/${quest.data.currentquest}`);
            this.setState({playersOnQuestArray:a.data.playersOnQuestArray,executionsArray:a.data.executionsArray,randomNumber:Math.random()})
            this.setState({executingQuest:this.state.playersOnQuestArray[this.props.match.params.playerNumber - 1] == "on quest" && this.state.executionsArray[this.props.match.params.playerNumber - 1] != "success" && this.state.executionsArray[this.props.match.params.playerNumber - 1] != "fail"?true:false})
            let j = 0;
            if (a.data.playersOnQuestArray[this.props.match.params.playerNumber - 1] == "on quest"){ 
                for (let i = 0; i < a.data.playersOnQuestArray.length; i++){
                    if (a.data.playersOnQuestArray[i] == "on quest"){ j++;}
                    if (this.props.match.params.playerNumber == i + 1){ this.setState({position:j})}
                }
            }
        }

        makeRedirectToResultsTrue(){
            this.setState({redirectToResults:true});
        }

        renderPertinentInformation(){
            if (this.state.executingQuest){ 
                if (this.state.randomNumber == 0) {
                    return (
                        <div>
                            <h4>Whether you choose to succeed or fail the quest will be anonymous.</h4>
                            <h4><button onClick = {()=>this.submitSuccessOrFail('fail')}>Fail</button></h4>
                            <h4><button onClick = {()=>this.submitSuccessOrFail('success')}>Success</button></h4>
                        </div>
                    )
                }else{
                    return (
                        <div>
                            <h4>Whether you choose to succeed or fail the quest will be anonymous.</h4>
                            <h4><button onClick = {()=>this.submitSuccessOrFail('success')}>Success</button></h4>
                            <h4><button onClick = {()=>this.submitSuccessOrFail('fail')}>Fail</button></h4>
                        </div>
                    )
                }
            }else{
                return (<div>
                    <h4>wait while everyone on the quests submits their success or fail</h4>
                </div>)
            }
        }

        async submitSuccessOrFail(execution){
            let promise = await axios.put(`/api/submitquestexecution/${this.state.quest}/${execution}/${this.state.position}/${this.props.match.params.matchName}`);
            this.setState({executingQuest:false})
            if (promise.data){
                socket.emit('done-executing');
                this.makeRedirectToResultsTrue();
            }
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

    render(){
        return(
            <div>
            <h4>ExecuteMission</h4>
            {this.renderPertinentInformation()}
            {this.renderRedirectToResults()}
            {this.redirectToResults()}
            </div>
        )
    }
}

export default ExecuteMission