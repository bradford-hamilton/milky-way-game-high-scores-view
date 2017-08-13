import React, { Component } from 'react';

import Scores from './Scores/Scores'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          Milky Way Battles Top 10 High Scores!
        </div>
        <Scores />
      </div>
    );
  }
}

export default App;
