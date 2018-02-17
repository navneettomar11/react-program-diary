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
		return (
			<div className="search-result-grid">
				{searchResultRowList}
			</div>
		);
	}

}

const SearchResultData = (props) => {
	const recipe = props.recipe;
	return (
		<div key={recipe.label} className="nv-card search-result-grid-item">
			<Image src={recipe.image} alt={recipe.label} />
			<div className="nv-card-block">
				<p>{recipe.label}</p>
			</div>
		</div>
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
					(<div className="nv-grid">
							<button className="btn btn-default" onClick={this.loadMoreRecipes}>Load More</button>
					</div>)
				}
			</div>
		);		
	}
}

export default SearchResult;