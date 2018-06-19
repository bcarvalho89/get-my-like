import React, { Component } from 'react';

import { auth, providerFaceboook, providerGoogle } from '../helpers/firebase';

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  login = (provider) => {
    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;

        this.setState({ user });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        <div>
          <h4>Login</h4>

          { this.state.user ?
            <div>
              <p>{ this.state.user.displayName || this.state.user.email }</p>
              <button onClick={this.logout}>Sair</button>
            </div> :
            <div>
              <button onClick={() => this.login(providerGoogle)}>Entrar com o Google</button>
              <button onClick={() => this.login(providerFaceboook)}>Entrar com o Facebook</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Dashboard;
