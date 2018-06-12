import React, { Component } from 'react';

class Poll extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      categoryId: null
    };
  }

  componentWillMount() {
    this.setState({
      categoryId: this.props.match.params.id
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Pool #{this.state.categoryId}</h1>
        </div>
        <div>
          asdasd
        </div>
      </div>
    )
  }
}

export default Poll;