import React, { Component } from 'react';
import logo from './logo.svg';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import './App.css';
import OpeningMenu from './components/OpeningMenu.js';
import CreateMatch from './components/CreateMatch.js';
import JoinMatch from './components/JoinMatch.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false
    }
  }

  renderRedirect(){
      return <Redirect to={`/openingmenu`}/>
  }

  render() {
    return (
      <HashRouter>
      <div className="App">
      {this.renderRedirect()}
        <Switch>
          <Route exact path = '/openingmenu' component = {OpeningMenu}/>
          <Route exact path = '/creatematch' component = {CreateMatch}/>
          <Route exact path = '/joinmatch' component = {JoinMatch}/>
        </Switch>
        
      </div>
      </HashRouter>
    );
  }
}

export default App;
