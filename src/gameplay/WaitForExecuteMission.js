import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

class WaitForExecuteMission extends Component{

    componentDidMount(){
        socket.emit("join-room",{room:'myroom'});
        }

    render(){
        return(
            <div>
            <h4>WaitForExecuteMission</h4>
            </div>
        )
    }
}

export default WaitForExecuteMission