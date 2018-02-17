import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const Header = (props) =>{
	return(
		<header className="header">
			<div className="brand-text">
				Recipe Finder
			</div>
			<nav className="navbar">
				<ul>
					<li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
					<li><NavLink exact to="/about" activeClassName="active">About Me</NavLink></li>
					<li><NavLink exact to="/contact" activeClassName="active">Contact me</NavLink></li>
				</ul>
			</nav>
		</header>	
	);
}
export default Header;
