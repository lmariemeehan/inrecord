import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    inr_profiles: []
  }

  componentDidMount() {
    this.getProfiles();
  }

  getProfiles = _ => {
    fetch('http://localhost:4000/inr_profiles')
    .then(response => response.json())
    .then(response => this.setState({ inr_profiles: response.data }))
    .catch(err => console.error(err))
  }

  renderProfile = ({ person_id, name }) => <div key={person_id}>{name}</div>

  render() {
    const { inr_profiles } = this.state;

    return (
      <div className="App">
        {inr_profiles.map(this.renderProfile)}
      </div>
    );
  }
}

export default App;
