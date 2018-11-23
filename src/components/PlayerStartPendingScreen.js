import React, {Component} from 'react';
import axios from 'axios'
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

class PlayerStartPendingScreen extends Component{
    constructor(props){
        super(props);

        this.state={
            currentNumberOfPlayersInGame:this.props.match.params.playerNumber
        }
        socket.on('player_number_change',data=>{
            this.updateCurrentNumberOfPlayers();
        })
    }


    async updateCurrentNumberOfPlayers(){
        let res = await axios.get('/api/getplayers/:matchName');
        this.setState({
            currentNumberOfPlayersInGame:res.data.numberofplayers
        })
    }

    render(){
        return(
            <div>
<h4>There are currently {this.state.currentNumberOfPlayersInGame} players in the game</h4>

            </div>
        )
    }
}

export default PlayerStartPendingScreen;