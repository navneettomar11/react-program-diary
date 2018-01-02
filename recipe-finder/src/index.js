import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'material-design-lite/material.css';
import 'material-design-lite/material.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
