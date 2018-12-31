import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import './History.css';
import io from 'socket.io-client';
import images from './images.js';

const socket = io.connect('http://localhost:4000');
class History extends Component{
    constructor(props){
        super(props);

        this.state = {
            playerArray:[],
            quest:1,
            attempt:1,
            resultsArray:[],
            proposedQuestsArray:[],
            b:[],
            c:['','','','',''],
            redirect:false,
            phase:''
        }
//choicesArray,votesArray,teamLeader,attempt,quest,result
        socket.on('here-is-history',data=>{
            if (this.props.match.params.name === data.name){
                this.setState({playerArray:data.playerArray,quest:data.quest,attempt:data.attempt,resultsArray:data.resultsArray,proposedQuestsArray:data.proposedQuestsArray})
                this.setState({b:this.state.quest===1?['']:this.state.quest===2?['','']:this.state.quest===3?['','','']:this.state.quest===4?['','','','']:['','','','','']})
            }
        })

        socket.on('go-here',data=>{
            setTimeout(()=>{
                if (data.name == this.props.match.params.name){
                    this.setState({phase:data.phase})
                    this.setState({redirect:true})
                }
            },200)
        })
    }

    componentDidMount(){
        socket.emit("join-room",{room:this.props.match.params.room})
        socket.emit('give-me-history',{room:this.props.match.params.room,name:this.props.match.params.name})
        
    }

    displaySelectionLabels(){
        return(
            <div className='holder-of-all-selection-divs'>
                <div className='selection-div'>
                    <h2 className='Selection-word'>Selection</h2>
                </div>
                <div className='selection-div'>
                    <h2 className='Selection-word'>Selection</h2>
                </div>
                <div className='selection-div'>
                    <h2 className='Selection-word'>Selection</h2>
                </div>
                <div className='selection-div'>
                    <h2 className='Selection-word'>Selection</h2>
                </div>
                <div className='selection-div'>
                    <h2 className='Selection-word'>Selection</h2>
                </div>
            </div>
        )
    }

    displayVoteLabels(){
        return(
            <div className='holder-of-all-vote-divs'>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[0]?`${1} ${this.state.playerArray[0].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[1]?`${2} ${this.state.playerArray[1].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[2]?`${3} ${this.state.playerArray[2].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[3]?`${4} ${this.state.playerArray[3].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[4]?`${5} ${this.state.playerArray[4].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[5]?`${6} ${this.state.playerArray[5].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[6]?`${7} ${this.state.playerArray[6].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[7]?`${8} ${this.state.playerArray[7].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[8]?`${9} ${this.state.playerArray[8].name} vote`:null}</h3>
                </div>
                <div className='vote-label'>
                    <h3 className='player-name-for-vote'>{this.state.playerArray[9]?`${10} ${this.state.playerArray[9].name} vote`:null}</h3>
                </div>
                <div  className='vote-label' id='el-resulto'>
                    <h3 className='player-name-for-vote'>Result</h3>
                </div>
            </div>
        )
    }

    displayAllAttempts(quest){
        return this.state.proposedQuestsArray.map((element,index,arr)=>{
            if (element.quest === quest){
                return (
                    <div className='attempt-stuff'>
                        <div className='the-attempt'>
                            <h1 className='gh'>{element.attempt}</h1>
                        </div>
                        <div className='teamLeader'>
                            <h3 className='jh'>{this.state.playerArray[element.teamLeader-1].name}</h3>
                        </div>
                        <div className='selection'>
                            <h3 className='hij'>{element.choicesArray[0]?this.state.playerArray[element.choicesArray[0]-1].name:null}</h3>
                        </div>
                        <div className='selection'>
                            <h3 className='hij'>{element.choicesArray[1]?this.state.playerArray[element.choicesArray[1]-1].name:null}</h3>
                        </div>
                        <div className='selection'>
                            <h3 className='hij'>{element.choicesArray[2]?this.state.playerArray[element.choicesArray[2]-1].name:null}</h3>
                        </div>
                        <div className='selection'>
                            <h3 className='hij'>{element.choicesArray[3]?this.state.playerArray[element.choicesArray[3]-1].name:null}</h3>
                        </div>
                        <div className='selection'>
                            <h3 className='hij'>{element.choicesArray[4]?this.state.playerArray[element.choicesArray[4]-1].name:null}</h3>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[0]?null:element.votesArray[0]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[1]?null:element.votesArray[1]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[2]?null:element.votesArray[2]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[3]?null:element.votesArray[3]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[4]?null:element.votesArray[4]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[5]?null:element.votesArray[5]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[6]?null:element.votesArray[6]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[7]?null:element.votesArray[7]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[8]?null:element.votesArray[8]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='the-vote'>
                            <img className='me-me-i-am-vote' src={!element.votesArray[9]?null:element.votesArray[9]==='approve'?images.checkMark:images.redX}/>
                        </div>
                        <div className='result'>
                            <h2 className='plk'>{element.result=='approve'?'Approved':'Rejected'}</h2>
                        </div>
                    </div>
                )
            } 
        })
    }

    displayHistory(){
        if (this.state.quest > 1 || this.state.attempt > 1){
            return this.state.b.map((element,index,arr)=>{
                return (
                    <div className='whole-quest-div'>
                        <div className='quest-number-div'>
                            <h1>Quest #{index+1}</h1>
                        </div>
                        <div className='attempt-labels-div'>
                            <div className='attempt-number-div'>
                                <h2 className='attempto'>Attempt</h2>
                            </div>
                            <div className='team-leader-div'>
                                <h2 className='Selection-word'>TeamLeader</h2>
                            </div>
                            {this.displaySelectionLabels()}
                            {this.displayVoteLabels()}
                            <div className='black-bar'>

                            </div>
                        </div>
                        {this.displayAllAttempts(index+1)}
                    </div>
                )
            })
        }else{
            return (
                <div>
                    <h1>There is no data yet</h1>
                </div>
            )
        }
    }

    redirect(){
        if (this.state.redirect){
            console.log('inside redirect with phase equal to ',this.state.phase)
            if (this.state.phase == 'propose'){
                return <Redirect to={`/propose/${this.props.match.params.room}/${this.props.match.params.name}`}/>
            }
        else if (this.state.phase == 'vote'){
            return <Redirect to={`/castvote/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase == 'execute'){
            return <Redirect to={`/execute/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase == 'killMerlin'){
            return <Redirect to={`/killmerlin/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }else if (this.state.phase == 'stare'){

        }else{
            return <Redirect to={`/hangout/${this.props.match.params.room}/${this.props.match.params.name}`}/>
        }
    }
    }

    emit(){
        socket.emit('where-do-i-go',{room:this.props.match.params.room,name:this.props.match.params.name})
    }

    render(){
        return (
            <div>
                <div className='a-tiny-bit-of-space'></div>
                <button onClick={()=>this.emit()}>Continue</button>
                {this.displayHistory()}
                {this.redirect()}
            </div>
        )
    }
}

export default History;