// var greeterings = require('../../../data/greetings.json');
import greeterings from '../../../data/greetings.json';

module.exports = function() {
  var Greeter = document.createElement('div');
  Greeter.textContent = greeterings.greetText;
  return Greeter;
}
