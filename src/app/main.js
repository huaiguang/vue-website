// var greeter = require('./greeter.js');
// document.getElementById('root').appendChild(greeter());

import React from 'react';
import ReactDOM from 'react-dom';
// import Greeter from './Greeter.js';
// import { greetings } from '../data/greetings.json'

class Greeter extends React.Component {
  render() {
    return <div>Hi there and greetings !</div>
  }
}

ReactDOM.render(
  <Greeter />,
  document.getElementById('root')
);