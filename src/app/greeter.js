// var greetings = require('../data/greetings.json');

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = greetings.greetText;
//   return greet;
// }

import { greetings } from '../data/greetings.json'
import React, {Component} from 'react'

class greeter extends Component{
  render() {
    return (
      <div>
        {greetings.greetText}
      </div>
    );
  }
}

export default greeter