import React, { Component } from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';

import Main from './containers/Main';

class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app-root">
          <Switch>
            <Route path='/' component={Main}/>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default Routes; 