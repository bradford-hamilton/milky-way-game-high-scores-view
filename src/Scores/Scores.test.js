import React from 'react';
import ReactDOM from 'react-dom';
import Scores from './Scores';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Scores />, div);
});
