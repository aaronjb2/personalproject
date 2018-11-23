import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class FindMatch extends Component{
    constructor(props){
        super(props);

        this.state={
            redirectBack:false,
            desiredName:'',
            currentName:'',
            provideNavigateToMatch:false,
            redirectToMatch:false,
            room:'myroom'
        }
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/setuphostmatch`}/>
        }
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    handleDesiredNameChange(e){
        this.setState({
            desiredName:e.target.value
        })
    }

    async findMatch(){
        let res = await axios.get(`/api/getmatch/${this.state.desiredName}`);
        if (res.data.message==='Match Found'){
            this.setState({
                currentName:this.state.desiredName
            })
            this.setState({
                provideNavigateToMatch:true
            })
        }else{
            alert("The match you typed in does not exist");
        }
    }

    showNavigateToMatch(){
        if (this.state.provideNavigateToMatch){
            return(
                <div>
                    <h4>The match exists</h4>
                    <h3><button onClick = {()=>this.makeRedirectToMatchTrue()}>host {this.state.currentName}</button></h3>
                </div>
            )
        }
    }

    makeRedirectToMatchTrue(){
        this.setState({
            redirectToMatch:true
        })
    }

    renderRedirectToMatch(){
        console.log('inside render redirect to match function')
        if (this.state.redirectToMatch){
            return <Redirect to={`/displayparty/${this.state.currentName}`}/>
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                {this.renderRedirectBack()}
                {this.renderRedirectToMatch()}
            <h4>Type the name of the already existing match you want to host</h4>
            <h3>Name of Match to Host:<input value={this.state.desiredName} onChange={e=>this.handleDesiredNameChange(e)}/><button onClick={()=>this.findMatch()}>Find Game</button></h3>
            {this.showNavigateToMatch()}
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
            </div>
        )
    }
}

export default FindMatch;