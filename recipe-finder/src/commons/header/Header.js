import React, { Component } from 'react';


export default class Header extends Component{

	constructor(props){
		super(props);
	}


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
						<li className="mdl-menu__item">About Me</li>
						<li className="mdl-menu__item">Contact me</li>
					</ul>
				</div>
  			</header>	
		);
	}
}