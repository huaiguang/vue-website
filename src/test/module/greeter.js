import greeterings from '../../data/greetings.json';

export default function () {
  var Greeter = document.createElement('div');
  Greeter.textContent = greeterings.greetText;
  return Greeter;
}