import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './dux/store.js'
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
import PlayerDescription from './gameplay/PlayerDescription.js';
import ExecuteMission from './gameplay/ExecuteMission.js';
import MakeProposal from './gameplay/MakeProposal.js';
import Vote from './gameplay/Vote.js';
import WaitForExecuteMission from './gameplay/WaitForExecuteMission.js';
import WaitForProposal from './gameplay/WaitForProposal.js';
import WaitForVoteResults from './gameplay/WaitForVoteResults.js';
import Other from './components/Other.js';
import Other2 from './components/Other2.js';
import AwaitPlayer from './components/AwaitPlayer.js';
import PlayerAwait from './components/PlayerAwait.js';
import DisplayGame from './components/DisplayGame.js';
import Identity from './components/Identity.js';
import Propose from './components/Propose.js';
import CastVote from './components/CastVote.js';
import HangOut from './components/HangOut.js';

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
      <Provider store = {store}>
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
          <Route exact path = '/playerdescription/:matchName/:playerName/:playerNumber' component = {PlayerDescription}/>
          <Route exact path = '/waitforproposal/:matchName/:playerName/:playerNumber' component = {WaitForProposal}/>
          <Route exact path = '/makeproposal/:matchName/:playerName/:playerNumber' component = {MakeProposal}/>
          <Route exact path = '/executemission/:matchName/:playerName/:playerNumber' component = {ExecuteMission}/>
          <Route exact path = '/waitforexecutemission/:matchName/:playerName/:playerNumber' component = {WaitForExecuteMission}/>
          <Route exact path = '/vote/:matchName/:playerName/:playerNumber' component = {Vote}/>
          <Route exact path = '/waitforvoteresults/:matchName/:playerName/:playerNumber' component = {WaitForVoteResults}/>
          <Route exact path = '/other' component = {Other}/>
          <Route exact path = '/other2' component = {Other2}/>
          <Route exact path = '/awaitplayer/:room' component = {AwaitPlayer}/>
          <Route exact path = '/playerawait/:room/:name' component = {PlayerAwait}/>
          <Route exact path = '/displaygame/:room' component = {DisplayGame}/>
          <Route exact path = '/identity/:room/:name' component = {Identity}/>
          <Route exact path = '/propose/:room/:name' component = {Propose}/>
          <Route exact path = '/castvote/:room/:name' component = {CastVote}/>
          <Route exact path = '/hangout/:room/:name' component = {HangOut}/>
        </Switch>
        
      </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
