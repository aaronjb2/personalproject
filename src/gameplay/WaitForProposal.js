import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect();

class WaitForProposal extends Component{

    componentDidMount(){
        socket.emit("join-room",{room:'myroom'});
        }

    render(){
        return(
            <div>
            <h4>WaitForProposal</h4>
            </div>
        )
    }
}

export default WaitForProposal