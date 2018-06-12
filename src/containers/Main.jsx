/* Main */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Pool from './Pool';
import Dashboard from './Dashboard';
import Header from '../components/layout/header';

class Main extends Component {
  
  render() {    
    return (
      <div className="app-wrapper">
        <main className="main-content">
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/pool/:id' component={Pool}/>
          <Redirect to="/" />
        </Switch>
        </main>
      </div>
    )
  }
}


export default Main;