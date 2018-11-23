import React, { Component } from 'react';
import logo from './logo.svg';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import './App.css';
import OpeningMenu from './components/OpeningMenu.js';
import CreateMatch from './components/CreateMatch.js';
import JoinMatch from './components/JoinMatch.js';
import SetupHostMatch from './components/SetupHostMatch.js';
import FindMatch from './components/FindMatch.js';
import ReenterMatch from './components/ReenterMatch.js';
import SetupPlayMatch from './components/SetupPlayMatch.js';
import DisplayParty from './components/DisplayParty.js';
import PlayerStartPendingScreen from './components/PlayerStartPendingScreen.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false,
      myNumber:0
    }
  }

  renderRedirect(){
    // if (this.state.myNumber < 1){
    //   this.setState({
    //     myNumber:this.state.myNumber+1
    //   })
    //   return <Redirect to={`/openingmenu`}/>
    // }
      
  }

  render() {
    return (
      <HashRouter>
      <div className="App">
      {this.renderRedirect()}
        <Switch>
          <Route exact path = '/' component = {OpeningMenu}/>
          <Route exact path = '/creatematch' component = {CreateMatch}/>
          <Route exact path = '/setuphostmatch' component = {SetupHostMatch}/>
          <Route exact path = '/joinmatch' component = {JoinMatch}/>
          <Route exact path = '/findmatch' component = {FindMatch}/>
          <Route exact path = '/reentermatch' component = {ReenterMatch}/>
          <Route exact path = '/setupplaymatch' component = {SetupPlayMatch}/>
          <Route exact path = '/displayparty/:matchName' component = {DisplayParty}/>
          <Route exact path = '/playerstartpendingscreen/:matchName/:playerName/:playerNumber' component = {PlayerStartPendingScreen}/>
        </Switch>
        
      </div>
      </HashRouter>
    );
  }
}

export default App;
