import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './App.css';
import Home from './views/home/Home';
import About from './views/about/About';
import Contact from './views/contact/Contact';

import componentWithHeaderAndFooter from './utils/ComponentWithHeaderNFooter';
import SearchResult from './views/searchResult/SearchResult';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={componentWithHeaderAndFooter(About)}/>
        <Route exact path='/contact' component={componentWithHeaderAndFooter(Contact)}/>
        <Route exact path='/searchresult' component={componentWithHeaderAndFooter(SearchResult)}/>
      </Switch>
    );
  }
}

export default App;
