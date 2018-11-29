import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom'

const socket = io.connect("http://localhost:4000");

class WaitForVote extends Component{
    constructor(props){
        super(props);

        this.state = {
            phase:'',
            redirect:false
        }
    }

    async componentDidMount(){
        
        socket.emit("join-room",{room:'myroom'});
        let promise = await axios.get(`/api/getphase/${this.props.match.params.matchName}`);
        console.log('promise:',promise)
        this.setState({phase:promise.data[0].phase})
        setTimeout(() => this.setState({ redirect: true }), 5000)
        //await this.wait(5000);
        //this.setState({redirect:true})
        }


         renderRedirect(){
            if (this.state.redirect){
                console.log('phase:',this.state.phase)
                if (this.state.phase == 'execute'){
                    return <Redirect to={`/executemission/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
                }else if (this.state.phase == 'vote'){
                    return <Redirect to={`/vote/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
                }else if (this.state.phase == 'propose'){
                    return <Redirect to={`/makeproposal/${this.props.match.params.matchName}/${this.props.match.params.playerName}/${this.props.match.params.playerNumber}`}/>
                }
            }
        }
       
        wait(ms){
            var start = new Date().getTime();
            var end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }


    render(){
        return(
            <div>
            <h4>Incoming Results!!!</h4>
            {this.renderRedirect()}
            </div>
        )
    }
}

export default WaitForVote