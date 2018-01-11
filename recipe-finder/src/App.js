import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/home/Home';
import About from './views/about/About';
import Contact from './views/contact/Contact';
import { Header } from './commons/index';

class App extends Component {

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header searchSubmitCallback={this.searchDataSubmitted}/>
        <main className="mdl-layout__content">
          <div className="page-content container">
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact}/>
          </Switch>
          </div>
        </main>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer__left-section">
            <div className="mdl-logo">&copy; Copyright</div>
           
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
