import React from 'react';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';
import {DIETS, HEALTHS, NUTRIENTS, PER_PAGE_LIMIT} from '../../config/Constants';
import SearchResult from '../searchResult/SearchResult';
import {Spinner} from '../../commons';

export default class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			ingredient: '',
			diet:  '',
			lowCalories: '',
			highCalories: '',
			health: '',
			minNutrient: '',
			maxNutrient : '',
			nutrientCode: '',
			from: 0,
			to: PER_PAGE_LIMIT,
			more: false,
			error: '',
			loading: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.callSearchRecipeApi = this.callSearchRecipeApi.bind(this);
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
		this.clearSearchForm = this.clearSearchForm.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	_onChange(){
		this.setState({ more :  RecipeSearchStore.isMore(), loading: false});
	}

	componentWillMount(){
		RecipeSearchStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		RecipeSearchStore.removeChangeListener(this._onChange);
		RecipeSearchAction.clearData();
		
	}

	handleInputChange(event){
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value, error: ''});
	}

	validate(){
		if(this.state.ingredient === undefined || this.state.ingredient === null || /^\s*$/.test(this.state.ingredient)){
			this.setState({error: "please enter ingredient."});
			return false;
		}else if((!isNaN(parseInt(this.state.minNutrient,10)) || !isNaN(parseInt(this.state.maxNutrient,10))) && /^\s*$/.test(this.state.nutrientCode)){
			this.setState({error: "please select nutrient code."});
			return false;
		}
		return true;
	}

	callSearchRecipeApi(event){
		if(this.validate()){
			this.setState({loading: true},()=>{
				RecipeSearchAction.callRecipeSearchApi(this.state);
			});
		}
		event.preventDefault();
	}

	loadMoreRecipes(){
		let fromIdx = this.state.to;
		let toIdx = fromIdx + PER_PAGE_LIMIT;
		this.setState({from: fromIdx, to:toIdx, loading: true},()=>{
			RecipeSearchAction.callRecipeSearchApi(this.state);
		});
	}

	clearSearchForm(event){
		this.setState({
			ingredient: '',
			diet:  '',
			lowCalories: '',
			highCalories: '',
			health: '',
			minNutrient: '',
			maxNutrient : '',
			nutrientCode: '',
			from: 0,
			to: PER_PAGE_LIMIT,
			more: false,
			error: '',
			loading: false
		},()=> RecipeSearchAction.clearData());
	}

	hasError(){
		return this.state.error !== '' && !/^\s*$/.test(this.state.error);
	}

	render(){
		const dietOptins = DIETS.map((diet)=> <option key={diet.value} value={diet.value}>{diet.text}</option>);
		const healthOptions = HEALTHS.map((health)=> <option key={health.value} value={health.value}>{health.text}</option>);
		const nutrientOptions = NUTRIENTS.map((nutrient)=><option key={nutrient.code} value={nutrient.code}>{nutrient.name+'('+nutrient.unit+')'}</option>);
		return(
			<div className="container">
				{this.hasError() && <div className="error">{this.state.error}</div>}
				<form action="#" method="POST" onSubmit={this.callSearchRecipeApi}>
					<div className="nv-grid">
						<div className="nv-col-4"><input type="text" className="form-control" name="ingredient"  placeholder="Ingredients" value={this.state.ingredient} onChange={this.handleInputChange}/></div>
						<div className="nv-col-4">
							<select className="form-control" value={this.state.diet} name="diet" onChange={this.handleInputChange}>
								<option value=''>Select Diet</option>
								{dietOptins}
							</select>
						</div>
						<div className="nv-col-4">
							<select className="form-control" value={this.state.health} name="health" onChange={this.handleInputChange}>
								<option value=''>Select Health</option>
								{healthOptions}
							</select>
						</div>
					</div>
					<div className="nv-grid">
						<div className="nv-col-2"><input type="number" className="form-control" value={this.state.lowCalories} name="lowCalories" placeholder="Lower Calories" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" value={this.state.highCalories} name="highCalories" placeholder="High Calories" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" value={this.state.minNutrient} name="minNutrient" placeholder="Min Nutrient" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" value={this.state.maxNutrient} name="maxNutrient" placeholder="Max Nutrient" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2">
							<select className="form-control" name="nutrientCode" value={this.state.nutrientCode} onChange={this.handleInputChange}>
								<option value=''>Select Nutrients</option>
								{nutrientOptions}
							</select>
						</div>
						<div className="nv-col-2">
							<button className="btn btn-default" type="submit" value="Search">Search</button> 
							<button className="btn btn-reset" type="reset" value="clear" onClick={this.clearSearchForm}>Clear</button>
						</div>
					</div>
				</form>	
				<SearchResult/>
				{ this.state.more &&
					(<div className="nv-grid">
						<div className="nv-col-12" style={{marginTop:'10px', textAlign: 'center'}}>
							<button className="btn btn-default" onClick={this.loadMoreRecipes}>Load More</button>
						</div>	
					</div>)
				}
				<Spinner loading={this.state.loading}/>
			</div>
		);
	}

}
