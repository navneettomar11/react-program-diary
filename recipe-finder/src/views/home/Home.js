import React from 'react';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './Home.css';
import SearchResult from './SearchResult';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';

export default class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = this.getSearchStateObject();
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.callSearchRecipeApi = this.callSearchRecipeApi.bind(this);
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	getSearchStateObject(){
		return { 
			queryText: '', 
			from: RecipeSearchStore.getFromIdx(),  
			to: RecipeSearchStore.getToIdx(), 
			more : RecipeSearchStore.isMore()}
	}

	handleSearchTextChange(event){
		this.setState({queryText: event.target.value});
	}

	callSearchRecipeApi(){
		RecipeSearchAction.callRecipeSearchApi(this.state);
		return false;
	}

	loadMoreRecipes(event){
		RecipeSearchAction.loadMoreReceipes(this.state);
		return false;
	}

	_onChange(){
		this.setState({
			more : RecipeSearchStore.isMore(),
			from: RecipeSearchStore.getFromIdx(),  
			to: RecipeSearchStore.getToIdx()
		});
	}

	componentWillMount(){
		RecipeSearchStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		RecipeSearchStore.removeChangeListener(this._onChange);
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
						<button className="mdl-button mdl-js-button mdl-button--colored  nv-search-button" onClick={this.callSearchRecipeApi}>
							<i className="material-icons">search</i>
						</button>
					</div>
				</form>	
				<SearchResult />
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
