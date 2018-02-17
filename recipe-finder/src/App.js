import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './App.css';
import Header from './commons/header/Header.js';
import Home from './views/home/Home';
import About from './views/about/About';
import Contact from './views/contact/Contact';

import componentWithHeaderAndFooter from './utils/ComponentWithHeaderNFooter';
import SearchResult from './views/searchResult/SearchResult';

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Header/>
        <main className="content">
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
