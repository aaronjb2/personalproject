import React, {Component} from 'react';
import {connect} from 'react-redux';
import Player from './Player.js';
import './OnQuestTable.css';

class OnQuestTable extends Component{
    constructor(props){
        super(props);

        this.state = {
            numberOfPeopleNeeded:0
        }
    }

    componentDidMount(){
        if (this.props.onQuest){
            let quantitiesArray = this.props.playerArray.length===5?[2,3,2,3,3]:this.props.playerArray.length===6?[2,3,4,3,4]:this.props.playerArray.length===7?[2,3,3,4,4]:this.props.playerArray.length>7?[3,4,4,5,5]:[0,0,0,0,0];
            this.setState({numberOfPeopleNeeded:quantitiesArray[this.props.quest-1]});
        }else{
            if (this.props.top){
                this.setState({numberOfPeopleNeeded:this.props.playerArray.length<7?3:this.props.playerArray.length<9?4:5});
            }else{
                this.setState({numberOfPeopleNeeded:this.props.playerArray.length<6?2:this.props.playerArray.length<8?3:this.props.playerArray.length<10?4:5});
            }
        }
    }

    displayCorrectTable(){
        if (this.state.numberOfPeopleNeeded===2){
            return (
                <div className = 'twoperson'>
                    <p className='twodeal' id = {this.props.selectedForQuest[0]?'selection_2_1':'position_2_1'}></p>
                    <p className='twodeal' id = {this.props.selectedForQuest[1]?'selection_2_2':'position_2_2'}></p>
                    <div className='separator' id='sep1'></div>

                </div>
            )
        }else if (this.state.numberOfPeopleNeeded===3){
            return (
                <div className = 'threeperson'>
                    <p className='threedeal' id = {this.props.selectedForQuest[0]?'selection_3_1':'position_3_1'}></p>
                    <p className='threedeal' id = {this.props.selectedForQuest[1]?'selection_3_2':'position_3_2'}></p>
                    <p className='threedeal' id = {this.props.selectedForQuest[2]?'selection_3_3':'position_3_3'}></p>
                    <div className='separator' id='sep2'></div>
                    <div className='separator' id='sep3'></div>
                </div>
            )
        }else if (this.state.numberOfPeopleNeeded===4){
            return (
                <div className = 'fourperson'>
                    <p className='fourdeal' id = {this.props.selectedForQuest[0]?'selection_4_1':'position_4_1'}></p>
                    <p className='fourdeal' id = {this.props.selectedForQuest[1]?'selection_4_2':'position_4_2'}></p>
                    <p className='fourdeal' id = {this.props.selectedForQuest[2]?'selection_4_3':'position_4_3'}></p>
                    <p className='fourdeal' id = {this.props.selectedForQuest[3]?'selection_4_4':'position_4_4'}></p>
                    <div className='separator' id='sep4'></div>
                    <div className='separator' id='sep5'></div>
                    <div className='separator' id='sep6'></div>
                </div>
            )
        }else if (this.state.numberOfPeopleNeeded===5){
            return (
                <div className = 'fiveperson'>
                    <div className = 'cinco'>
                    <p id = 'taco' className={this.props.selectedForQuest[0]?'cincoproduct':'cincoposition'}>{this.displayPertinentThing(0)}</p>
                    <p className={this.props.selectedForQuest[1]?'cincoproduct':'cincoposition'}>{this.displayPertinentThing(1)}</p>
                    <p className={this.props.selectedForQuest[2]?'cincoproduct':'cincoposition'}>{this.displayPertinentThing(2)}</p>
                    <p className={this.props.selectedForQuest[3]?'cincoproduct':'cincoposition'}>{this.displayPertinentThing(3)}</p>
                    <p className={this.props.selectedForQuest[4]?'cincoproduct':'cincoposition'}>{this.displayPertinentThing(4)}</p>
                    </div>

                    <div className = 'separador5'>
                    <div className = 'separated5'></div><div className = 'separated5'></div><div className = 'separated5'></div><div className = 'separated5'></div>
                    </div>
                </div>
            )
        }
    }

    displayPertinentThing(index){
        if (this.props.selectedForQuest[index]){
            return (
                <div className = 'PlayerContainer'>
                    <Player playerNumber = {this.props.selectedForQuest[index]} className='Player'></Player>
                </div>
            )
        }else{
            return (
                <div>

                </div>
            )
        }
    }

    render(){
        return (
            <div className='OnQuestTable'>
            {this.displayCorrectTable()}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(OnQuestTable);