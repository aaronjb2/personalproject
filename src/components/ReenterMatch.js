import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class ReenterMatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectBack:false,
            redirectToMatch:false,
            desiredMatchName:'',
            currentMatchName:'',
            desiredName:'',
            desiredPassword:'',
            desiredPlayerIndex:0,
            showNavigateToPlay:false,
            gameStarted:false
        }
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    async makeRedirectToMatchTrue(){
        let res = await axios.get(`/api/gamestarted/${this.state.currentMatchName}`);
        if (res.data.gameStarted){
            this.setState({
                gameStarted:true
            })
        }
        this.setState({
            redirectToMatch:true
        })
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/setupplaymatch`}/>
        }
    }

    renderRedirectToMatch(){
        if (this.state.redirectToMatch){
            if (this.state.gameStarted){
                return <Redirect to={`/playerdescription/${this.state.currentMatchName}/${this.state.desiredName}/${this.state.desiredPlayerIndex}`}/>
            }
                return <Redirect to={`/playerstartpendingscreen/${this.state.currentMatchName}/${this.state.desiredName}/${this.state.desiredPlayerIndex}`}/>
        }
    }

    async makeShowNavigateToPlayTrue(){
        this.setState({
            currentMatchName:this.state.desiredMatchName
        })
        //let res = await axios.post(`/api/getplayers/${this.state.currentMatchName}`)
        this.setState({
            showNavigateToPlay:true
        })
        console.log('made it here')
    }

    showNavigateToPlay(){
        if (this.state.showNavigateToPlay){
            return (
                <div>
                <h4><button onClick = {()=>this.makeRedirectToMatchTrue()}>Proceed to {this.state.currentMatchName}</button></h4>
                </div>
            )
        }
    }

    handleUpdateMatchName(e){
        this.setState({
            desiredMatchName:e.target.value
        })
    }

    handleUpdateDesiredName(e){
        this.setState({
            desiredName:e.target.value
        })
    }

    handleUpdateDesiredPassword(e){
        this.setState({
            desiredPassword:e.target.value
        })
    }

    handleUpdatePlayerIndex(e){
        this.setState({
            desiredPlayerIndex:e.target.value
        })
    }

    render(){
        return(
            <div>
                {this.renderRedirectBack()}
                <h4>this is Reenter Match</h4>
                <h4>matchName:<input value = {this.state.desiredMatchName} onChange={e=>this.handleUpdateMatchName(e)}/></h4>
                <h4>name:<input value = {this.state.desiredName} onChange={e=>this.handleUpdateDesiredName(e)}/></h4>
                <h4>password:<input value = {this.state.desiredPassword} onChange={e=>this.handleUpdateDesiredPassword(e)}/></h4>
                <h4>playerNumber:<input value = {this.state.desiredPlayerIndex} onChange={e=>this.handleUpdatePlayerIndex(e)}/></h4>
                <h4><button onClick={()=>this.makeShowNavigateToPlayTrue()}>Find</button></h4>
                {this.showNavigateToPlay()}
                {this.renderRedirectToMatch()}
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
            </div>
        )
    }
}

export default ReenterMatch;