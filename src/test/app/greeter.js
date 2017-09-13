var greeterings = require('../../../data/greetings.json');

module.exports = function() {
  var Greeter = document.createElement('div');
  // Greeter.textContent = 'Hi there and greetings!';
  Greeter.textContent = greeterings.greetText;
  return Greeter;
}
