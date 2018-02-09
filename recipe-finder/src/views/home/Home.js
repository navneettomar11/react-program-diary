import React from 'react';
import './Home.css';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {searchData : {}, redirect: false};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.callSearchRecipeApi = this.callSearchRecipeApi.bind(this);
		console.log(this.state);
	}

	handleSearchTextChange(event){
		this.setState({searchData: {queryText: event.target.value, from: RecipeSearchStore.getFromIdx(), to: RecipeSearchStore.getToIdx()}});
	}

	callSearchRecipeApi(){
		console.log(this.state);
		RecipeSearchAction.callRecipeSearchApi(this.state.searchData);
		this.setState({redirect : true});
		
		
	}

	render(){
		if(this.state.redirect){
			return <Redirect to={ {pathname : "/searchresult"}} />
		}
		return(
			<form action="#" className="recipeSearchForm mdl-grid" onSubmit={this.callSearchRecipeApi}>
				<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--11-col">
					<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
					<label className="mdl-textfield__label" htmlFor="searchText">SEARCH BY INGREDIENTS</label>
				</div>
				
				<div className="mdl-cell--1-col mdl-cell--middle">	
					<button className="mdl-button mdl-js-button mdl-button--colored  nv-search-button">
						<i className="material-icons">search</i>
					</button>
				</div>
			</form>	
		);
	}

}
