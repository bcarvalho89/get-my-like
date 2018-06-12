import React, { Component } from 'react';
import firebase from '../helpers/firebase';
import moment from 'moment';

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

  timeLeft(expireIn) {
    const now = moment();
    const to = moment(expireIn);
    const isBefore = now.isBefore(to);

    if (isBefore) {
      const diffTime = moment.duration(to.diff(now));
      const dayLabel = diffTime.days() > 1 ? 'dias' : 'dia';

      /* TODO: Update de view in interval of 1 sec*/
      return (
        <span>Tempo restante: {`${diffTime.days()} ${dayLabel} ${diffTime.hours()}:${diffTime.minutes()}:${diffTime.seconds()}`}</span>
      )
    } else {
      return (
        <span>Votação expirada</span>
      )
    }
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
                  <h3>{pool.title} - <small>Expira em {moment(pool.expireIn).format('DD/MM/YYYY [às] HH:mm:ss')} - {this.timeLeft(pool.expireIn)}</small></h3>
                  <ul>
                    {pool.options.map(option => {
                      return (
                        <li key={option.title}>{option.title} - Likes {option.likes}</li>
                      )
                    })}
                  </ul>
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
