import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'material-design-lite/material.css';
import 'material-design-lite/dist/material.orange-green.min.css';
import 'material-design-lite/material.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
	<App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
