import React, { Component } from 'react';

import firebase from '../helpers/firebase';
import { poolExpiration } from '../helpers/timeManipulation';

class Poll extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      poll: null
    };
  }

  componentDidMount() {
    const poolId = this.props.match.params.id;
    const poolRef = firebase.database().ref('/pools/' + poolId);

    poolRef.on('value', snapshot => {
      let poll = snapshot.val();
      
      if (poll) {
        this.setState({ poll });
      }
    });
  }

  getMyLike(option) {
    const poolId = this.props.match.params.id;
    const poolClone = this.state.poll;
    poolClone.options[option].likes = poolClone.options[option].likes + 1;

    const newPool = {...this.state.poll, ...poolClone};

    firebase.database().ref('/pools/' + poolId).set(newPool);
  }

  renderOptions() {
    const options = this.state.poll.options;

    return Object.keys(options).map(option => {
      return (
        <li key={option}>{options[option].title} - Likes count {options[option].likes} - <button onClick={() => this.getMyLike(option)}>Get my like</button></li>
      )
    })
  }

  render() {
    return (
      <div>
        { this.state.poll ?
          <div>
            <h1>{this.state.poll.title}</h1>
            <p>{poolExpiration(this.state.poll.expireIn)}</p>
            <ul>
              {this.renderOptions()}
              {/* {this.state.poll.options.map(option => {
                return (
                  <li key={option.title}>{option.title} - Likes count {option.likes} - <button onClick={this.getMyLike(option)}>Get my like</button></li>
                )
              })} */}
            </ul>
          </div> :
          <div>
            Votação inválida
          </div>
        }
      </div>
    )
  }
}

export default Poll;