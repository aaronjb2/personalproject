import React, {Component} from 'react';
import './Board.css';
import './DisplayGame.css';
import {connect} from 'react-redux';

class Board extends Component{
constructor(props){
    super(props);
this.state = {
    needed:[],
    doubleFail:false,
    quantitiesNeededArray:this.props.playerArray.length===5?[2,3,2,3,3]:this.props.playerArray.length===6?[2,3,4,3,4]:this.props.playerArray.length===7?[2,3,3,4,4]:[3,4,4,5,5]
}

}

componentDidMount(){
this.setState({needed:this.props.playerArray.length===5?[2,3,2,3,3]:this.props.playerArray.length===6?[2,3,4,3,4]:this.props.playerArray.length===7?[2,3,3,4,4]:this.props.playerArray.length>7?[3,4,4,5,5]:[]})
this.setState({doubleFail:this.props.playerArray.length>6?true:false})

}


render(){
    return (
        <div className='el-bordo'>
            <div className='el-bordo-top-portion'>
                <div className='most-of-top'>
                    <div className='for-bordo-title'>Quest</div>
                    <div className='for-2-fails'>
                        <div className='jjj'></div>
                        <div className='lll'>{this.props.playerArray.length>6?'2 Fails Needed':null}</div>
                    </div>
                    <div className='for-los-questos'>
                        <div className='el-questo' id={!this.props.resultsArray[0]?'el-questo-unsureo':this.props.resultsArray[0]==='successful'?'el-questo-goodo':'el-questo-bado'}>{!this.props.resultsArray[0]?this.state.quantitiesNeededArray[0]:null}</div>
                        <div className='el-questo' id={!this.props.resultsArray[1]?'el-questo-unsureo':this.props.resultsArray[1]==='successful'?'el-questo-goodo':'el-questo-bado'}>{!this.props.resultsArray[1]?this.state.quantitiesNeededArray[1]:null}</div>
                        <div className='el-questo' id={!this.props.resultsArray[2]?'el-questo-unsureo':this.props.resultsArray[2]==='successful'?'el-questo-goodo':'el-questo-bado'}>{!this.props.resultsArray[2]?this.state.quantitiesNeededArray[2]:null}</div>
                        <div className='el-questo' id={!this.props.resultsArray[3]?'el-questo-unsureo':this.props.resultsArray[3]==='successful'?'el-questo-goodo':'el-questo-bado'}>{!this.props.resultsArray[3]?this.state.quantitiesNeededArray[3]:null}</div>
                        <div className='el-questo' id={!this.props.resultsArray[4]?'el-questo-unsureo':this.props.resultsArray[4]==='successful'?'el-questo-goodo':'el-questo-bado'}>{!this.props.resultsArray[4]?this.state.quantitiesNeededArray[4]:null}</div>
                    </div>
                </div>
                <div className='rest-of-top'><div className='here-for-border-fix'></div><div className='not-here-for-border-fix'></div><div className='here-for-border-fix'></div></div>
            </div>
            <div className='el-bordo-bottom-portion'>
                <div className='for-attempt-title'>Attempt</div>
                <div className='for-los-attemptos'>
                    <div className='el-attempto' id={this.props.attempt===1?'attempto-currento':'attempto-no-currento'}></div>
                    <div className='el-attempto' id={this.props.attempt===2?'attempto-currento':'attempto-no-currento'}></div>
                    <div className='el-attempto' id={this.props.attempt===3?'attempto-currento':'attempto-no-currento'}></div>
                    <div className='el-attempto' id={this.props.attempt===4?'attempto-currento':'attempto-no-currento'}></div>
                    <div className='el-attempto' id={this.props.attempt===5?'attempto-currento':'attempto-no-currento'}></div>
                </div>
            </div>
    </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Board);