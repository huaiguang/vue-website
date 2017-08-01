// var greeter = require('./greeter.js');
// document.getElementById('root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import greeter from './greeter.js';

render(<greeter />, document.getElementById('root'));