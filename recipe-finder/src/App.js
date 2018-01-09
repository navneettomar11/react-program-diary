import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/home/Home';
import About from './views/about/About';
import { Header } from './commons/index';

class App extends Component {

  searchDataSubmitted =(searchText) => {
    alert(searchText);
  }
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header searchSubmitCallback={this.searchDataSubmitted}/>
        <main className="mdl-layout__content">
          <div className="page-content container">
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
