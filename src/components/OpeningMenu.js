import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class OpeningMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectHostMatch:false,
            redirectPlayMatch:false,
            redirectOther:false,
            redirectOther2:false
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

    redirectOther(){
        if (this.state.redirectOther){
            return <Redirect to={`/other`}/>
        }
    }

    redirectOther2(){
        if (this.state.redirectOther2){
            return <Redirect to = {'/other2'}/>
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

    makeRedirectOtherTrue(){
        this.setState({
            redirectOther:true
        })
    }

    makeRedirectOther2True(){
        this.setState({
            redirectOther2:true
        })
    }

    render(){
        return(
            <div>
            <h3>This is the Opening Menu</h3>
            {this.renderRedirectPlayMatch()}
            {this.renderRedirectHostMatch()}
            {this.redirectOther()}
            {this.redirectOther2()}
            {/* <button onClick = {()=>this.makeRedirectHostMatchTrue()}>Host a Match</button>
            <button onClick = {()=>this.makeRedirectPlayMatchTrue()}>Play a Match</button> */}
            <button onClick = {()=>this.makeRedirectOtherTrue()}>Play</button>
            <button onClick = {()=>this.makeRedirectOther2True()}>Host</button>
            </div>
        )
    }
}

export default OpeningMenu;