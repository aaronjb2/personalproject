import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SetupPlayMatch extends Component{
    constructor(props){
        super(props);

        this.state={
            redirectJoin:false,
            redirectReenter:false,
            redirectBack:false
        }
    }

    renderRedirectJoin(){
        if (this.state.redirectJoin) {
          return <Redirect to={`/joinmatch`}/>
        }
    }
    
    renderRedirectReenter(){
      if (this.state.redirectReenter) {
          return <Redirect to={`/reentermatch`}/>
        }
    }
    
    makeRedirectJoinTrue(){
      this.setState({
          redirectJoin:true
      })
    }
    
    makeRedirectReenterTrue(){
      this.setState({
          redirectReenter:true
      })
    }

    makeRedirectBackTrue(){
        this.setState({
            redirectBack:true
        })
    }

    renderRedirectBack(){
        if (this.state.redirectBack){
            return <Redirect to={`/`}/>
        }
    }

    render(){
        return(<div>
            {this.renderRedirectJoin()}
            {this.renderRedirectReenter()}
            {this.renderRedirectBack()}
            <h4>Me Me I'm a SetupPlayMatch</h4>
            <h4><button onClick={()=>this.makeRedirectJoinTrue()}>Join Match</button>
            <button onClick={()=>this.makeRedirectReenterTrue()}>Reenter Match</button></h4>
            <h4><button onClick={()=>this.makeRedirectBackTrue()}>Back</button></h4>
        </div>)
    }
}

export default SetupPlayMatch;