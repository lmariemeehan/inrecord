import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    inr_profiles: [],
    profile: {
      name: '',
      email: '',
      low_inr: 2,
      high_inr: 3
    }
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

  addProfile = _ => {
    const { profile } = this.state;
    fetch(`http://localhost:4000/inr_profiles/add?name=${profile.name}&email=${profile.email}&low_inr=${profile.low_inr}&high_inr=${profile.high_inr}`)
      .then(response => response.json())
      .then(response => this.getProfiles)
      .catch(err => console.error(err))
  }

  renderProfile = ({ person_id, name, email, low_inr, high_inr }) =>
    <ul key={person_id}>
      <li>{name}</li>
      <li>{email}</li>
      <li>{low_inr}</li>
      <li>{high_inr}</li>
    </ul>

  render() {
    const { inr_profiles, profile } = this.state;

    return (
      <div className="App">
        {inr_profiles.map(this.renderProfile)}

        <div>
          <input
            value={profile.name}
            onChange={e => this.setState({ profile: { ...profile, name: e.target.value }})}
          />
          <input
            value={profile.email}
            onChange={e => this.setState({ profile: { ...profile, email: e.target.value }})}
          />
          <input
            value={profile.low_inr}
            onChange={e => this.setState({ profile: { ...profile, low_inr: e.target.value }})}
          />
          <input
            value={profile.high}
            onChange={e => this.setState({ profile: { ...profile, high_inr: e.target.value }})}
          />
          <button onClick={this.addProfile}>Add Profile</button>
        </div>
      </div>
    );
  }
}

export default App;
