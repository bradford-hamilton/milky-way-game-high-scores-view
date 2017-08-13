import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import tz from 'moment-timezone';
import _ from 'lodash';

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
    if (!this.state.highScores.length > 0) return null;

    const highScoresClone = _.cloneDeep(this.state.highScores);
    const sortedHighScores = this.sortHighScores(highScoresClone);

    return sortedHighScores.map(scoreObj => (
      <li key={scoreObj.id} className="score-list-item">
        <h3><span className="name">{`${scoreObj.name}`}</span> with a score of</h3>
        <span className="score">{`${scoreObj.score}`}</span>
        <span className="date">{this.formatCreatedAtTime(scoreObj.created_at)}</span>
      </li>
    ));
  }

  sortHighScores(highScores) {
    return _.sortBy(highScores, [function (obj) { return Number(obj.score); }]);
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
