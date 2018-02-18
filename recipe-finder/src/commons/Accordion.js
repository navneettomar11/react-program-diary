import React from 'react';

export default class Accordion extends React.Component {
	constructor(props){
		super(props);
		this.state = {showPanel : props.showPanel};
		this.toggleAccordian = this.toggleAccordian.bind(this);
	}

	toggleAccordian(event){
		this.setState({showPanel: !this.state.showPanel});
	}
	render(){
		let panelClass = 'panel '+(this.state.showPanel ? 'in' : '');
		let buttonAccordianClass = 'accordion '+(this.state.showPanel ? 'active' : '');
		return(
			<div className="accordian-panel">
				<button className={buttonAccordianClass} onClick={this.toggleAccordian}>{this.props.title}</button>
				<div className={panelClass}>
					{this.props.children}
				</div>
			</div>	
		)
	}

}
