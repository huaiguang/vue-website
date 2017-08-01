var greeterings = require('../data/greetings.json');

module.exports = function() {
  var Greeter = document.createElement('div');
  Greeter.textContent = greeterings.greetText;
  return Greeter;
}
