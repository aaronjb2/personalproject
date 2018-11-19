import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class OpeningMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectCreateMatch:false,
            redirectJoinMatch:false
        }
      }

      renderRedirectCreateMatch(){
          if (this.state.redirectCreateMatch) {
            return <Redirect to={`/creatematch`}/>
          }
    }

    renderRedirectJoinMatch(){
        if (this.state.redirectJoinMatch) {
            return <Redirect to={`/joinmatch`}/>
          }
    }

    makeRedirectCreateMatchTrue(){
        this.setState({
            redirectCreateMatch:true
        })
    }

    makeRedirectJoinMatchTrue(){
        this.setState({
            redirectJoinMatch:true
        })
    }

    render(){
        return(
            <div>
            <h3>This is the Opening Menu</h3>
            {this.renderRedirectJoinMatch()}
            {this.renderRedirectCreateMatch()}
            <button onClick = {()=>this.makeRedirectCreateMatchTrue()}>Create a Match</button>
            <button onClick = {()=>this.makeRedirectJoinMatchTrue()}>Join a Match</button>
            </div>
        )
    }
}

export default OpeningMenu;