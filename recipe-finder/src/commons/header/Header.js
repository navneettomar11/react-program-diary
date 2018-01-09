import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Header extends Component{
	render(){
		return(
			<header className="mdl-layout__header">
    			<div className="mdl-layout__header-row">
    				<span className="mdl-layout-title">Unique Recipe's</span>
					<div className="mdl-layout-spacer"></div>
					<button id="demo-menu-lower-left" className="mdl-button mdl-js-button mdl-button--icon">
					<i className="material-icons">more_vert</i>
					</button>
					<ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"	htmlFor="demo-menu-lower-left">
						<li className="mdl-menu__item"><Link to="/about">About Me</Link></li>
						<li className="mdl-menu__item">Contact me</li>
					</ul>
				</div>
  			</header>	
		);
	}
}