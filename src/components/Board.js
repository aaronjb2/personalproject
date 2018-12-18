import React, {Component} from 'react';
import './Board.css';
import {connect} from 'react-redux';

class Board extends Component{
constructor(props){
    super(props);
this.state = {
    needed:[],
    doubleFail:false
}

}

componentDidMount(){
this.setState({needed:this.props.playerArray.length===5?[2,3,2,3,3]:this.props.playerArray.length===6?[2,3,4,3,4]:this.props.playerArray.length===7?[2,3,3,4,4]:this.props.playerArray.length>7?[3,4,4,5,5]:[]})
this.setState({doubleFail:this.props.playerArray.length>6?true:false})

}

displayDoubleFail(){
    if (this.state.doubleFail){
        return(
            <p className='doubleFail'>2 Fails Needed</p>
        )
    }
}

render(){
    return (
    <div className = 'board'>
        <div className = 'quest'>
        <div className = 'questTitle'><p>Quest</p></div>
        <div id = 'quest1' className = {this.props.resultsArray[0]==='successful'?'successful':this.props.resultsArray[0]==='failed'?'failed':'quests'}><p className={this.props.resultsArray[0]==='successful'?'success':this.props.resultsArray[0]==='failed'?'fail':'questNumber'}>{this.props.resultsArray[0]==='successful'?'Successful':this.props.resultsArray[0]==='failed'?'Failed':this.state.needed[0]}</p></div>
        <div id = 'quest2' className = {this.props.resultsArray[1]==='successful'?'successful':this.props.resultsArray[1]==='failed'?'failed':'quests'}><p className={this.props.resultsArray[1]==='successful'?'success':this.props.resultsArray[1]==='failed'?'fail':'questNumber'}>{this.props.resultsArray[1]==='successful'?'Successful':this.props.resultsArray[1]==='failed'?'Failed':this.state.needed[1]}</p></div>
        <div id = 'quest3' className = {this.props.resultsArray[2]==='successful'?'successful':this.props.resultsArray[2]==='failed'?'failed':'quests'}><p className={this.props.resultsArray[2]==='successful'?'success':this.props.resultsArray[2]==='failed'?'fail':'questNumber'}>{this.props.resultsArray[2]==='successful'?'Successful':this.props.resultsArray[2]==='failed'?'Failed':this.state.needed[2]}</p></div>
        <div id = 'quest4' className = {this.props.resultsArray[3]==='successful'?'successful':this.props.resultsArray[3]==='failed'?'failed':'quests'}><p className={this.props.resultsArray[3]==='successful'?'success':this.props.resultsArray[3]==='failed'?'fail':'questNumber'}>{this.props.resultsArray[3]==='successful'?'Successful':this.props.resultsArray[3]==='failed'?'Failed':this.state.needed[3]}</p>{this.displayDoubleFail()}</div>
        <div id = 'quest5' className = {this.props.resultsArray[4]==='successful'?'successful':this.props.resultsArray[4]==='failed'?'failed':'quests'}><p className={this.props.resultsArray[4]==='successful'?'success':this.props.resultsArray[4]==='failed'?'fail':'questNumber'}>{this.props.resultsArray[4]==='successful'?'Successful':this.props.resultsArray[4]==='failed'?'Failed':this.state.needed[4]}</p></div>
        
        <div className='finishBorder' id = 'finishBorder1'></div>
        <div className='finishBorder' id = 'finishBorder2'></div>
        </div>
        <div className = 'attempt'>
        <div className = 'attemptTitle'><p>Attempt</p></div>
        <div id = 'attempt1' className = {this.props.attempt===1?'helloKitty':'attempts'}></div>
        <div id = 'attempt2' className = {this.props.attempt===2?'helloKitty':'attempts'}></div>
        <div id = 'attempt3' className = {this.props.attempt===3?'helloKitty':'attempts'}></div>
        <div id = 'attempt4' className = {this.props.attempt===4?'helloKitty':'attempts'}></div>
        <div id = 'attempt5' className = {this.props.attempt===5?'helloKitty':'attempts'}></div>
        </div>
    </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Board);