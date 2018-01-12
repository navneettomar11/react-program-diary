import React from 'react';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './Home.css';
import SearchResult from './SearchResult';
import HttpClient from '../../utils/HttpClient';
import Parser from '../../utils/Parser';
import {RECEIPE_SEARCH_API_URL,EDAMAM_API_ID, EDAMAM_API_KEY} from '../../config/Constants';

export default class Home extends React.Component {

	
	constructor(props){
		super(props);
		this.state = {
			queryText: '',
			from: 0, 
			to: 9,
			more: false, 
			receipeList : []
		};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.searchReceipe = this.searchReceipe.bind(this);
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
	}

	handleSearchTextChange(event){
		this.setState({
			queryText: event.target.value,
		});
	}

	searchReceipe(){
		let httpClient = new HttpClient();
		if(this.state.queryText === ''){
			return;
		}
		let searchData = {'q':this.state.queryText, app_id : EDAMAM_API_ID, app_key : EDAMAM_API_KEY, from: this.state.from, to: this.state.to};
		//httpClient.get("data/demo2.json", searchData)
		httpClient.ajaxLoader();
		httpClient.get(RECEIPE_SEARCH_API_URL, searchData)
		.then((response) => {
			let edamanObj = Parser.parseResponseToEdamamResponse(response);
			this.setState((prevState, props) => ({
				more: edamanObj.more,
				receipeList : prevState.receipeList.concat(edamanObj.hits || [])
			}),()=>{
				console.log(this.state);
			});
			httpClient.ajaxLoader(true);
		}).catch(function(ex) {
			console.log(ex);
			httpClient.ajaxLoader(true);
		});
		return false;
	}

	loadMoreRecipes(event){
		let fromIdx = this.state.to;
		let toIdx = fromIdx + 9;
		this.setState({
			from: fromIdx,
			to: toIdx
		},this.searchReceipe);
		return false;
	}

	render(){
		return(
			<React.Fragment>
				<form action="#" className="recipeSearchForm mdl-grid">
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--11-col">
						<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
						<label className="mdl-textfield__label" htmlFor="searchText">SEARCH BY INGREDIENTS</label>
					</div>
					
					<div className="mdl-cell--1-col mdl-cell--middle">	
						<button className="mdl-button mdl-js-button mdl-button--colored  nv-search-button" onClick={this.searchReceipe}>
							<i className="material-icons">search</i>
						</button>
					</div>
				</form>	
				<SearchResult data={this.state.receipeList}/>
				{ this.state.more &&
					(<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--12-col text-center">
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.loadMoreRecipes}>Load More</button>
						</div>
					</div>)
				}
			</React.Fragment>	
		);
	}

}
