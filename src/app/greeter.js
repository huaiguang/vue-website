// var greetings = require('../data/greetings.json');

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = greetings.greetText;
//   return greet;
// }

import { greetings } from '../data/greetings.json'
import React from 'react';
import ReactDOM from 'react-dom';

class Greeter extends React.Component {
  render() {
    return <div>{greetings.greetText}</div>
  }
}

export default Greeter