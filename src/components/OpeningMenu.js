import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './OpeningMenu.css';

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
            <div className = 'top'><h1 className='title'>Project AA</h1></div>
            {this.renderRedirectPlayMatch()}
            {this.renderRedirectHostMatch()}
            {this.redirectOther()}
            {this.redirectOther2()}
            {/* <button onClick = {()=>this.makeRedirectHostMatchTrue()}>Host a Match</button>
            <button onClick = {()=>this.makeRedirectPlayMatchTrue()}>Play a Match</button> */}
            <div className = 'holder-of-menu-options'>
            <div className = 'menu-option'>
                <img className='menu-option-icon' src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv4oVQkrkUhmJRbSXzWjJNAJSgyfntvBZRqNUilnVdc0Pzr5bi' alt/>
                <h4 className = 'a'><button className='choice-button' onClick = {()=>this.makeRedirectOtherTrue()}>Play</button></h4>
            </div>
            <div className = 'menu-option'>
                <img className='menu-option-icon' src = 'https://image.freepik.com/free-icon/black-iscreen-computer_318-9552.jpg' alt/>
            <h4 className = 'a'><button className='choice-button' onClick = {()=>this.makeRedirectOther2True()}>Host</button></h4>
            </div>
            </div>
            </div>
        )
    }
}

export default OpeningMenu;