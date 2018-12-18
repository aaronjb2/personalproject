import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './dux/store.js'
import './App.css';
import OpeningMenu from './components/OpeningMenu.js';
import Play from './components/Play.js';
import Host from './components/Host.js';
import AwaitPlayer from './components/AwaitPlayer.js';
import PlayerAwait from './components/PlayerAwait.js';
import DisplayGame from './components/DisplayGame.js';
import Identity from './components/Identity.js';
import Propose from './components/Propose.js';
import CastVote from './components/CastVote.js';
import HangOut from './components/HangOut.js';
import Execute from './components/Execute.js';
import KillMerlin from './components/KillMerlin.js';
import GameDone from './components/GameDone.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false,
      myNumber:0
    }
  }

  render() {
    return (
      <Provider store = {store}>
      <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {OpeningMenu}/>
          <Route exact path = '/play' component = {Play}/>
          <Route exact path = '/host' component = {Host}/>
          <Route exact path = '/awaitplayer/:room' component = {AwaitPlayer}/>
          <Route exact path = '/playerawait/:room/:name' component = {PlayerAwait}/>
          <Route exact path = '/displaygame/:room' component = {DisplayGame}/>
          <Route exact path = '/identity/:room/:name' component = {Identity}/>
          <Route exact path = '/propose/:room/:name' component = {Propose}/>
          <Route exact path = '/castvote/:room/:name' component = {CastVote}/>
          <Route exact path = '/hangout/:room/:name' component = {HangOut}/>
          <Route exact path = '/execute/:room/:name' component = {Execute}/>
          <Route exact path = '/killmerlin/:room/:name' component = {KillMerlin}/>
          <Route exact path = '/gamedone/:room/:name' component = {GameDone}/>        
        </Switch>
        
      </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
