import React, {Component} from 'react';
import './Player.css';
import images from './images.js';
import {connect} from 'react-redux';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

class Player extends Component{
constructor(props){
    super(props);

    this.state={
        playerArray:[]
    }
}

componentDidMount(){
   
}



render(){
    return (
        <div className='a'>
            <div className='tacosalad'>
                <div className='number-section' id={this.props.teamLead?'number-section-teamLeader':'number-section-normal'}>
                    <div className='number'>{this.props.playerNumber>0?this.props.playerNumber:'?'}</div>
                    <div className='stuff'></div>
                </div>
                <div className='image-section'>
                    <img className='portrait' src={this.props.playerNumber>0?images.userIcon:images.unknownIdentity} alt/>
                </div>
                <div className='name-section' id={this.props.teamLead?'name-section-teamLeader':'name-section-normal'}>
                    <p>{this.props.playerNumber===0?'Unknown':this.props.playerArray.length===0 && this.props.players?this.props.players[this.props.playerNumber-1].name:this.props.playerArray[this.props.playerNumber-1]?this.props.playerArray[this.props.playerNumber-1].name:null}</p>
                </div>
            </div>
        </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Player)