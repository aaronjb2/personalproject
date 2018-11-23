import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class SetupHostMatch extends Component{
constructor(props){
    super(props);
    this.state = {
        redirectCreate: false,
        redirectFind: false,
        redirectBack: false
    }
}
renderRedirectCreate(){
    if (this.state.redirectCreate) {
      return <Redirect to={`/creatematch`}/>
    }
}

renderRedirectFind(){
  if (this.state.redirectFind) {
      console.log('made it here')
      return <Redirect to={`/findmatch`}/>
    }
}

renderRedirectBack(){
    if (this.state.redirectBack){
        return <Redirect to={`/`}/>
    }
}

makeRedirectCreateTrue(){
  this.setState({
      redirectCreate:true
  })
}

makeRedirectFindTrue(){
  this.setState({
      redirectFind:true
  })
}

makeRedirectBackTrue(){
    this.setState({
        redirectBack:true
    })
}

    render(){
        return (
            
            <div>
                {this.renderRedirectFind()}
                {this.renderRedirectCreate()}
                {this.renderRedirectBack()}
            <h4><button onClick = {()=>this.makeRedirectFindTrue()}>Find Existing Match</button>
            <button onClick= {()=>this.makeRedirectCreateTrue()}>Create New Match</button></h4>
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
            </div>
        )
    }
}

export default SetupHostMatch;