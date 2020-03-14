import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCocktail}  from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  return (
      <header className="header header-6">
          <div className="branding">
            <a href="/" className="nav-link">
                <FontAwesomeIcon icon={faCocktail} size="2x"/>
                <span className="title">Cocktail Repo</span>
            </a>
          </div>
          <div className="header-actions">
            <Link to="/aboutme" className="nav-link" aria-label="aboutme">
                About Me
            </Link>
            <Link to="/contactme" className="nav-link" aria-label="aboutme">
                Contact Me
            </Link>
          </div>
      </header>
  );
}

export default Header;
