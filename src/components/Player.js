import React, {Component} from 'react';
import './Player.css';
import images from './images.js';
import {connect} from 'react-redux';

class Player extends Component{
constructor(props){
    super(props);

    this.state={

    }
}

componentDidMount(){
    setTimeout(()=>{
        console.log('this.props.playerArray:',this.props.playerArray)
    },1000)
}

render(){
    return (
        <p className = 'Player'>
            <p className='playerNumber'>{this.props.playerNumber}</p>
            <p className='imageHolder'><img className='image' src={images.userIcon} alt/></p>
            <p className='name'>{this.props.playerArray[this.props.playerNumber-1]?this.props.playerArray[this.props.playerNumber-1].name:null}</p>
        </p>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Player)