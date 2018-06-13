import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../helpers/firebase';
import { poolExpiration } from '../helpers/timeManipulation';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      pools: []
    };
  }

  componentWillMount() {
    const poolsRef = firebase.database().ref('pools');

    poolsRef.on('value', snapshot => {
      let pools = snapshot.val();
      let newPools = [];

      for (let pool in pools) {
        newPools.push({
          id: pool,
          title: pools[pool].title,
          options: pools[pool].options,
          expireIn: pools[pool].expireIn
        });
      }

      this.setState({
        pools: newPools
      });
    });
  }

  summarizeLikes(options) {
    let amount = 0;
    for (let option in options) {
      amount += options[option].likes;
    }

    return (<h5>Quantidade de likes: {amount}</h5>);
  }

  render() {
    return (
      <div>
        <h1>Votações em aberto</h1>

        { this.state.pools.length > 0 ?
          <div>
            {this.state.pools.map(pool => {
              return (
                <div key={pool.id}>
                  <h3>{pool.title} - <small>{poolExpiration(pool.expireIn)}</small></h3>
                  {this.summarizeLikes(pool.options)}
                  <Link to={`/pool/${pool.id}`}>Mais detalhes</Link>
                </div>
              )
            })}
          </div> :
          <div>
            Nenhuma votação disponível
          </div>
        }
      </div>
    )
  }
}

export default Home;
