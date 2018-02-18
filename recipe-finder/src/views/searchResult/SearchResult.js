import React from 'react';
import {Image,Badge, Accordion} from '../../commons';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';

class RecipeDetailModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {showModal : this.props.showModal};
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.showModal !== this.props.showModal){
			this.setState({showModal: nextProps.showModal});
		}
	}
	
	render(){
		let showModalClass = this.state.showModal ? 'in': '';
		return(
			<div className={`modal ${showModalClass}`}>
				<div className="dialog">
					<div className="header">
						<a href="#close" title="Close" className="close" onClick={()=> this.setState({showModal: false}, this.props.recipeModalCloseHandler())}>&times;</a>
						<h2>{this.props.title}</h2>
					</div>	
					<div className="content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
	
}

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
		this.state.recipeList.forEach((receipeHit, i)=> searchResultRowList.push(<SearchResultData key={i} recipe={receipeHit.recipe} showRecipeModal={this.props.showRecipeModal}/>));
		return (
			<div className="search-result-grid">
				{searchResultRowList}
			</div>
		);
	}

}

const SearchResultData =(props)=> {
	const recipe = props.recipe;
	return (
		<div key={recipe.label} className="nv-card search-result-grid-item">
			<Image src={recipe.image} alt={recipe.label} />
			<div className="nv-card-block">
				<a href="" onClick={(event)=>{ props.showRecipeModal(event, recipe)}}>{recipe.label}</a>
			</div>
		</div>
	);
}

class SearchResult extends React.Component{
	constructor(props){
		super(props);
		this.state ={searchData :  RecipeSearchStore.getRecipeSearchObject(), showModal: false, selectedRecipe: {}};
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
		this._onChange = this._onChange.bind(this);
		this.showRecipeModal = this.showRecipeModal.bind(this);
		this.recipeModalCloseHandler = this.recipeModalCloseHandler.bind(this);
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

	showRecipeModal(event,recipe){
		if(recipe!==undefined){
			this.setState({showModal: true, selectedRecipe: recipe});
		}
		event.preventDefault();
	}

	recipeModalCloseHandler(){
		this.setState({showModal: false, selectedRecipe: undefined});
	}

	render(){
		let selectedRecipe = this.state.selectedRecipe;
		let dietLabelItems = [], 
		healthLabelItems = [], ingredientItems = [], 
		totalDailyItems=[], totalNutrientItems= [];
		if(selectedRecipe && selectedRecipe.dietLabels){
			for(const dietKey of Object.keys(selectedRecipe.dietLabels)){
				dietLabelItems.push(<Badge key={dietKey}>{selectedRecipe.dietLabels[dietKey]}</Badge>);
			}
		}
		if(selectedRecipe && selectedRecipe.healthLabels){
			for(const healthKey of Object.keys(selectedRecipe.healthLabels)){
				healthLabelItems.push(<Badge key={healthKey}>{selectedRecipe.healthLabels[healthKey]}</Badge>);
			}
		}
		if(selectedRecipe && selectedRecipe.ingredients){
			ingredientItems = selectedRecipe.ingredients.map((ingredient, idx)=><li key={idx}>{ingredient.text}</li>);
		}
		if(selectedRecipe && selectedRecipe.totalDaily){
			for(const dailyNutrientKey of Object.keys(selectedRecipe.totalDaily)){
				let obj = selectedRecipe.totalDaily[dailyNutrientKey];
				totalDailyItems.push(<tr key={dailyNutrientKey}><td>{obj.label}</td><td>{parseFloat(obj.quantity).toFixed(2)}</td><td>{obj.unit}</td></tr>)
			}
		}
		if(selectedRecipe && selectedRecipe.totalNutrients){
			for(const nutrientKey of Object.keys(selectedRecipe.totalNutrients)){
				let obj = selectedRecipe.totalNutrients[nutrientKey];
				totalNutrientItems.push(<tr key={nutrientKey}><td>{obj.label}</td><td>{parseFloat(obj.quantity).toFixed(2)}</td><td>{obj.unit}</td></tr>)
			}
		}
		
		return(
			<div>
				<SearchResultGrid showRecipeModal={this.showRecipeModal}/>
				{selectedRecipe &&
					<RecipeDetailModal showModal={this.state.showModal} title={selectedRecipe.label} recipeModalCloseHandler={this.recipeModalCloseHandler}>
						<div className="nv-grid">
							<div className="nv-col-4">
									<Image src={selectedRecipe.image} alt={selectedRecipe.label}/>
							</div>
							<div className="nv-col-8">
								<p><strong>Source: </strong><a href={selectedRecipe.url} target="_blank">{selectedRecipe.source}</a></p>
								<p><strong>Number of serving: </strong>{selectedRecipe.yield}</p>
								<p><strong>Total energy, kcal: </strong>{parseFloat(selectedRecipe.calories).toFixed(2)}</p>
								<p><strong>Total weight, g: </strong>{parseFloat(selectedRecipe.totalWeight).toFixed(2)}</p>
								{dietLabelItems.length > 0 &&
									<Accordion title="Diet Label" showPanel={true}>
										{dietLabelItems}
									</Accordion>
								}
								{healthLabelItems.length > 0 && 
									<Accordion title="Health Label" showPanel={true}>
										{healthLabelItems}
									</Accordion>
								}
							</div>
						</div>
						<div className="nv-grid">
							<div className="nv-col-6">
								{selectedRecipe.ingredients	 && 
									<Accordion title="Ingredient" showPanel={true}>
										<ul>{ingredientItems}</ul>
									</Accordion>
								}
								<Accordion title="Total nutrients for the entire recipe" showPanel={true}>
									<table className="table">
										<thead>
											<tr>
												<th>Label</th>
												<th>Qty</th>
												<th>Unit</th>
											</tr>	
										</thead>	
										<tbody>
											{totalNutrientItems}
										</tbody>
									</table>		
								</Accordion>
								
							</div>
							<div className="nv-col-6">
								<Accordion title="% daily value for the entire recipe" showPanel={true}>
									<table className="table">
										<thead>
											<tr>
												<th>Label</th>
												<th>Qty</th>
												<th>Unit</th>
											</tr>	
										</thead>	
										<tbody>
											{totalDailyItems}
										</tbody>	
									</table>	
								</Accordion>
								
							</div>	
						</div>
					</RecipeDetailModal>
				}
			</div>
		);		
	}
}

export default SearchResult;