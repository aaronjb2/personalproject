import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class OpeningMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectHostMatch:false,
            redirectPlayMatch:false
        }
      }

      renderRedirectHostMatch(){
          if (this.state.redirectHostMatch) {
            return <Redirect to={`/setuphostmatch`}/>
          }
    }

    renderRedirectPlayMatch(){
        if (this.state.redirectPlayMatch) {
            return <Redirect to={`/setupplaymatch`}/>
          }
    }


    makeRedirectHostMatchTrue(){
        this.setState({
            redirectHostMatch:true
        })
    }

    makeRedirectPlayMatchTrue(){
        this.setState({
            redirectPlayMatch:true
        })
    }

    render(){
        return(
            <div>
            <h3>This is the Opening Menu</h3>
            {this.renderRedirectPlayMatch()}
            {this.renderRedirectHostMatch()}
            <button onClick = {()=>this.makeRedirectHostMatchTrue()}>Host a Match</button>
            <button onClick = {()=>this.makeRedirectPlayMatchTrue()}>Play a Match</button>
            </div>
        )
    }
}

export default OpeningMenu;