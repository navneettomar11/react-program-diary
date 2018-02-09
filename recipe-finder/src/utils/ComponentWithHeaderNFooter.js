import React from 'react';
import { Header } from '../commons/index';

const componentWithHeaderAndFooter = (WrappedContainer) => {
	return class extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
			return(
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<Header searchSubmitCallback={this.searchDataSubmitted}/>
					<main className="mdl-layout__content">
						<div className="page-content container">
							<WrappedContainer/>
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
}

export default componentWithHeaderAndFooter;