import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './shared/header/Header';
import './App.css';
import Footer from './shared/footer/Footer';
import { AboutMe } from './aboutme/AboutMe';
import { ContactMe } from './contactme/ContactMe';
import {Home} from './home/Home';
import { Search } from './search/Search';
import { Cocktail } from './cocktail/Cocktail';

function App() {
  return (
    <Router>
    <div className="main-container">
      <Header/>
      <div className="content-container">
        <div className="content-area">
          <Switch>
            <Route path="/aboutme" component={AboutMe} />
            <Route path="/contactme" component={ContactMe} />
            <Route path="/search" component={Search} />
            <Route path="/cocktail/:id" component={Cocktail} />
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
