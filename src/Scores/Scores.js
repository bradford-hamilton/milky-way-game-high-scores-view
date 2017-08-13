import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Scores.css';

class Scores extends Component {
  constructor() {
    super();

    this.state = { highScores: [] };
  }

  componentDidMount() {
    this.pollForNewScores();
  }

  pollForNewScores() {
    return axios.get('https://milky-way-scoreboard-api.herokuapp.com/api/v1/high-scores')
      .then((results) => {
        if (results.data === this.state.highScores) {
          this.keepPolling();
        } else {
          this.setState({ highScores: results.data });
          this.keepPolling();
        }
      })
      .catch(err => console.log(err));
  }

  keepPolling() {
    setTimeout(() => this.pollForNewScores(), 3000);
  }

  populateScores() {
    return this.state.highScores.map(scoreObj => (
      <li key={scoreObj.id} className="score-list-item">
        <h3><span className="name">{`${scoreObj.name}`}</span> with a score of</h3>
        <span className="score">{`${scoreObj.score}`}</span>
        <span className="date">{this.formatCreatedAtTime(scoreObj.created_at)}</span>
      </li>
    ));
  }

  formatCreatedAtTime(created_at) {
    return moment(created_at).tz(moment.tz.guess()).calendar();
  }

  render() {
    return (
      <div className="Scores">
        <ol className="unordered-list">
          {this.populateScores()}
        </ol>
      </div>
    );
  }
}

export default Scores;
