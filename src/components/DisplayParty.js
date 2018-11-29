import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect();

class DisplayParty extends Component{
constructor(props){
    super(props);

    this.state = {
        playerArray:[],
        data:{},
        room:'myroom'
    }
    socket.on('player_number_change',data=>{
        console.log('inside player_number_change')
        this.obtainPlayerArray();
    })
}

async obtainPlayerArray(){
    let res = await axios.get(`/api/getplayers/${this.props.match.params.matchName}`);
    let arr = []
    console.log('res.data.numberofplayers:',res.data.numberofplayers)
    console.log('res.data.player1name:',res.data.player1name)
    arr[0] = res.data.numberofplayers>0?{name:res.data.player1name,hash:res.data.player1hash,image:res.data.player1image}:null;
    arr[1] = res.data.numberofplayers>1?{name:res.data.player2name,hash:res.data.player2hash,image:res.data.player2image}:null;
    arr[2] = res.data.numberofplayers>2?{name:res.data.player3name,hash:res.data.player3hash,image:res.data.player3image}:null;
    arr[3] = res.data.numberofplayers>3?{name:res.data.player4name,hash:res.data.player4hash,image:res.data.player4image}:null;
    arr[4] = res.data.numberofplayers>4?{name:res.data.player5name,hash:res.data.player5hash,image:res.data.player5image}:null;
    arr[5] = res.data.numberofplayers>5?{name:res.data.player6name,hash:res.data.player6hash,image:res.data.player6image}:null;
    arr[6] = res.data.numberofplayers>6?{name:res.data.player7name,hash:res.data.player7hash,image:res.data.player7image}:null;
    arr[7] = res.data.numberofplayers>7?{name:res.data.player8name,hash:res.data.player8hash,image:res.data.player8image}:null;
    arr[8] = res.data.numberofplayers>8?{name:res.data.player9name,hash:res.data.player9hash,image:res.data.player9image}:null;
    arr[9] = res.data.numberofplayers>9?{name:res.data.player10name,hash:res.data.player10hash,image:res.data.player10image}:null;
    for (let i = 0; i < 10 - res.data.numberofplayers; i++){ arr.pop()}
    this.setState({playerArray:arr})
}

async componentDidMount(){
    socket.emit("join-room", { room: this.state.room });
    console.log('just emitted join-room')
    await this.obtainPlayerArray();
}


displayPartyJoinersArray(){
    return this.state.playerArray.map((element,index,arr)=>{
        return <div><h4>{index + 1} {element.name}</h4></div>
    })
}

joinRoom(){
    socket.emit("join-room", { room: this.state.room });
}

render(){
    return(
        <div>
            <h4>5-10 people can play</h4>
            <h2>Here are all the people that have joined the party named {this.props.match.params.matchName}</h2>
            {this.displayPartyJoinersArray()}
            <button onClick = {()=>this.joinRoom()}>join room</button>
        </div>
    )
}
}

export default DisplayParty;