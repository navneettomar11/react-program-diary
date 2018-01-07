import React from 'react';
import './Home.css';
import SearchResult from './SearchResult';
import HttpClient from '../../utils/HttpClient';
import Parser from '../../utils/Parser';
import {RECEIPE_SEARCH_API_URL,EDAMAM_API_ID, EDAMAM_API_KEY} from '../../config/Constants';
import { EdamanResponse } from '../../config/EdamamResponse';

export default class Home extends React.Component {

	
	constructor(props){
		super(props);
		this.state = {queryText: '', receipeList : undefined};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.searchReceipe = this.searchReceipe.bind(this);
	}

	handleSearchTextChange(event){
		this.setState({queryText: event.target.value, receipeList : undefined});
	}

	searchReceipe(event){
		event.preventDefault();
		let httpClient = new HttpClient();
		let searchData = {'q':this.state.queryText, app_id : EDAMAM_API_ID, app_key : EDAMAM_API_KEY};
		//httpClient.get(RECEIPE_SEARCH_API_URL, searchData)
		httpClient.get("data/demo.json", searchData)
		.then((response) => {
			let edamanObj = Parser.parseResponseToEdamamResponse(response);
			this.setState({queryText: this.state.queryText, receipeList : edamanObj});
		}).catch(function(ex) {
			console.log(ex);
		});
	}

	render(){
		const recipeSearchResults = this.state.receipeList ? this.state.receipeList.hits : [];
		return(
			<React.Fragment>
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--12-col">
						<form action="#">
						<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
							<label className="mdl-textfield__label" htmlFor="searchText">Search by ingridents</label>
						</div>
						<button className="serchButton" href="#" onClick={this.searchReceipe}>
							<i className="material-icons">search</i>
						</button>	
						</form>
					</div>
				</div>	
				<SearchResult data={recipeSearchResults}/>
			</React.Fragment>	
		);
	}

}
