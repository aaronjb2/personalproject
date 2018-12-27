import React, {Component} from 'react';
import {connect} from 'react-redux';
import Player from './Player.js';
import './NotOnQuestTable.css'

class NotOnQuestTable extends Component{
constructor(props){
    super(props);

    this.state={

    }
}

componentDidMount(){
    console.log('inside this ')
}

displayPertinentThing(index){
    if (this.props.selectedForQuest.findIndex(element=>element===index+1)===-1){
        return (
            <div className = 'playerHolder'>
                <Player className = 'player' playerNumber={index}></Player>
            </div>
        )
    }else{
        return (
            <div className = 'nonplayerHolder'>

            </div>
        )
    }
}

displayTop(){
    if (this.props.playerArray.length === 5){
        return (
            <div className = 'top-row3'>
    
            </div>
            )
    }else if (this.props.playerArray.length === 6){
        return (
            <div className = 'top-row3'>

            </div>
            )
    }else if (this.props.playerArray.length === 7){
        return (
            <div className = 'top-row3'>

            </div>
            )
    }else if (this.props.playerArray.length === 8){
        return (
            <div className = 'top-row4'>

            </div>
            )
    }else if (this.props.playerArray.length === 9){
        return (
            <div className = 'top-row4'>

            </div>
            )
    }else if (this.props.playerArray.length === 10){
        return (
            <div className = 'top-row5'>
                {this.displayPertinentThing(6)}
                {this.displayPertinentThing(7)}
                {this.displayPertinentThing(8)}
                {this.displayPertinentThing(9)}
                {this.displayPertinentThing(10)}
            </div>
            )
    }
}

displayBottom(){
    if (this.props.playerArray.length === 5){
        return (
            <div className = 'bottom-row2'>
    
            </div>
            )
    }else if (this.props.playerArray.length === 6){
        return (
            <div className = 'bottom-row3'>

            </div>
            )
    }else if (this.props.playerArray.length === 7){
        return (
            <div className = 'bottom-row3'>

            </div>
            )
    }else if (this.props.playerArray.length === 8){
        return (
            <div className = 'bottom-row4'>

            </div>
            )
    }else if (this.props.playerArray.length === 9){
        return (
            <div className = 'bottom-row4'>

            </div>
            )
    }else if (this.props.playerArray.length === 10){
        return (
            <div className = 'bottom-row5'>

            </div>
            )
    }
}

render(){
    return (
        <div className = 'NotOnQuestTable'>
            
            {this.displayTop()}
            
            {this.displayBottom()}
        </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NotOnQuestTable);