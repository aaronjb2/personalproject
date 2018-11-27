import React, {Component} from 'react';
import axios from 'axios'
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect("http://localhost:4000");

class PlayerStartPendingScreen extends Component{
    constructor(props){
        super(props);

        this.state={
            currentNumberOfPlayersInGame:this.props.match.params.playerNumber,
            redirectHome:false,
            redirectToStartGame:false,
            hellokitty:false
        }
        socket.on('player_number_change',data=>{
            if (data.decrease){
                if (data.playerNumber < this.props.match.params.playerNumber){
                    return <Redirect to={`/playerstartpendingscreen/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber-1}`}/>
                }
            }else{
                this.updateCurrentNumberOfPlayers();
            }
        })
        socket.on('game-began', data=>{
            this.setState({hellokitty:true});
        })
    }

    componentDidMount(){
        socket.emit("join-room", {room:'myroom'});
        this.updateCurrentNumberOfPlayers();
    }

    redirecting(){
        if (this.state.hellokitty){
            return <Redirect to={`/playerdescription/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    async makeRedirectHomeTrue(){
        let res = await axios.post('/api/deleteplayer',{matchName:this.props.match.params.matchName,playerNumber:this.props.match.params.playerNumber})
        socket.emit('player_count_change',{decrease:true,playerNumber:this.props.match.params.playerNumber});
        this.setState({
            redirectHome:true
        })
    }

    async makeRedirectToStartGameTrue(){
        let gameData = await axios.get(`/api/getplayers/${this.props.match.params.matchName}`);
        if (gameData.data.numberofplayers < 5 || gameData.data.numberofplayers > 10){
            alert("The game cannot start if there are more than 10 or less than 5 players");
        }else{
            let a = await axios.get(`/api/gamestarted/${this.props.match.params.matchName}`);
            console.log('a.data.gameStarted',a.data.gameStarted)
            if (!a.data.gameStarted){
                await axios.post('/api/gamestartedtrue',{matchName:this.props.match.params.matchName});
                await axios.post('/api/setupidentities',{matchName:this.props.match.params.matchName,merlinassassin:true,percival:true,morgana:true,mordred:true,oberon:true});
                await axios.post('/api/createresultsrow',{matchName:this.props.match.params.matchName,numberOfPlayers:gameData.data.numberofplayers});
                await axios.post('/api/createrowquest1',{matchName:this.props.match.params.matchName});
            }
            socket.emit("game-started");
            this.setState({
                redirectToStartGame:true
            })
        }
    }

    renderRedirectToStartGame(){
        if (this.state.redirectToStartGame){
            return <Redirect to={`/playerdescription/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
        }
    }

    leaveGame(){
        if (this.state.redirectHome){
            return <Redirect to={`/`}/>
        }
    }

    displayStartGameButton(){
        if (this.props.match.params.playerNumber == 1) {
            return (
                <div>
                    <h4>Once you've started, no new people can enter or leave without terminating the game</h4>
                    <button onClick={()=>this.makeRedirectToStartGameTrue()}>Start Game</button>
                </div>
            )
        }
    }

    async updateCurrentNumberOfPlayers(){
        let res = await axios.get(`/api/getplayers/${this.props.match.params.matchName}`);
        console.log('res.data:',res.data)
        this.setState({
            currentNumberOfPlayersInGame:res.data.numberofplayers
        })
        console.log('currentNumberofPlayers:',this.state.currentNumberOfPlayersInGame)
    }

    render(){
        return(
            <div>
                {this.leaveGame()}
<h4>There are currently {this.state.currentNumberOfPlayersInGame} players in the game</h4>
{this.displayStartGameButton()}
{this.renderRedirectToStartGame()}
{this.redirecting()}
<button onClick={()=>this.makeRedirectHomeTrue()}>leave game</button>
            </div>
        )
    }
}

export default PlayerStartPendingScreen;