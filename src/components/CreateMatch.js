import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class CreateMatch extends Component {
    constructor(props){
        super(props);
        this.state = {
          redirectHost:false,
          desiredName:'',
          currentName:'',
          redirectBack:false,
        }
      }

    
    handleDesiredNameChange(e){
        this.setState({
            desiredName:e.target.value
        })
    }

    makeRedirectHostTrue(){
        this.setState({
            redirectHost:true
        })
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/setuphostmatch`}/>
        }
    }

    createMatch(){
        this.setState({
            currentName:this.state.desiredName
        })
        axios.post('/api/creatematch',{matchName:this.state.desiredName}).then(res=>{
            console.log('res.data:',res.data)
            if (res.data.message === 'Match Created'){
                this.setState({
                    redirectHost:true
                })
            }else{
                alert(res.data.message);
            }
        })
    }

    showNavigateToHostOption(){
        if (this.state.redirectHost){
            return(<div>
                <h4>The game was successfully created</h4>
                <h4><button>Proceed To Host {this.state.currentName}</button></h4>
            </div>)
        }
    }

render(){
    return(
        <div>
            {this.renderRedirectBack()}
            <h3>Welcome to CreateMatch</h3>
            <h3>Name of Match to be Created:<input value={this.state.desiredName} onChange={e=>this.handleDesiredNameChange(e)}/><button onClick={()=>this.createMatch()}>Create Game</button></h3>
            {this.showNavigateToHostOption()}
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
            </div>
    )
}
}

export default CreateMatch;