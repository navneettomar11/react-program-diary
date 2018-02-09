import React from 'react';
import {Image} from '../../commons/Image';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';


class SearchResultGrid extends React.Component {
	constructor(props){
		super(props);
		this.state ={ recipeList :  RecipeSearchStore.getRecipeList()};
		this._onChange = this._onChange.bind(this);
	}

	_onChange(){
		this.setState({ recipeList :  RecipeSearchStore.getRecipeList()});
	}

	componentWillMount(){
		RecipeSearchStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		RecipeSearchStore.removeChangeListener(this._onChange);
	}

	render(){
		let searchResultRowList = [];
		this.state.recipeList.forEach((receipeHit, i)=> searchResultRowList.push(<SearchResultData key={i} recipe={receipeHit.recipe}/>));
		if(searchResultRowList.length === 0){
			return(
				<p>No Recipe Founds</p>
			);
		}
		return (
			<ul className="mdl-cell--12-col recipe-search-result">
				{searchResultRowList}
			</ul>
		);
	}

}

const SearchResultData = (props) => {
	const recipe = props.recipe;
	return (
		<li>
		<div key={recipe.label} className="receipe-finder-card-square mdl-card mdl-shadow--2dp">
			<div className="mdl-card__title mdl-card--expand">
				<h2 className="mdl-card__title-text">{recipe.label}</h2>
			</div>
			<div className="mdl-card__media">
				<Image src={recipe.image} alt={recipe.label} />
			</div>
			<div className="mdl-card__actions">
			</div>
			<div className="mdl-card__menu">
				<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i className="material-icons">share</i>
				</button>
			</div>
		</div>
		</li>
	);
}

class SearchResult extends React.Component{
	constructor(props){
		super(props);
		this.state ={searchData :  RecipeSearchStore.getRecipeSearchObject()};
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	_onChange(){
		this.setState({ searchData :  RecipeSearchStore.getRecipeSearchObject()});
	}

	componentWillMount(){
		RecipeSearchStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		RecipeSearchStore.removeChangeListener(this._onChange);
	}

	loadMoreRecipes(event){
		RecipeSearchAction.loadMoreReceipes(this.state.searchData);
		return false;
	}


	render(){
		return(
			<div>
				<SearchResultGrid />
				{ this.state.searchData.more &&
					(<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--12-col text-center">
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.loadMoreRecipes}>Load More</button>
						</div>
					</div>)
				}
			</div>
		);		
	}
}

export default SearchResult;