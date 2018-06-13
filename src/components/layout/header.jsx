import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <header>
        <NavLink to="/" exact activeClassName="is-active">Home</NavLink>
        <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
      </header>
    )
  }
}

export default withRouter(Header);
