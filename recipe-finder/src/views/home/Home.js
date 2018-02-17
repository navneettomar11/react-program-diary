import React from 'react';
import RecipeSearchAction from '../../actions/RecipeSearchAction';
import RecipeSearchStore from '../../stores/RecipeSearchStore';
import { Redirect } from 'react-router-dom';
import {DIETS, HEALTHS, NUTRIENTS} from '../../config/Constants';

export default class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			ingredient: undefined,
			diet:  undefined,
			lowCalories: undefined,
			highCalories: undefined,
			health: undefined,
			minNutrient: undefined,
			maxNutrient : undefined,
			nutrientCode: undefined,
			from: undefined,
			to: undefined,
			more: undefined,
			error: undefined
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.callSearchRecipeApi = this.callSearchRecipeApi.bind(this);
	}

	handleInputChange(event){
		this.state.error = undefined;
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	validate(){
		if(this.state.ingredient === undefined || this.state.ingredient === null || /^\s*$/.test(this.state.ingredient)){
			this.setState({error: "please enter ingredient."});
			return false;
		}else if((this.state.minNutrient || this.state.maxNutrient) && (this.state.nutrientCode === undefined)) {
			this.setState({error: "please select nutrient code."});
			return false;
		}
		return true;
	}

	callSearchRecipeApi(event){
		if(this.validate()){
			RecipeSearchAction.callRecipeSearchApi(this.state);
		}
		event.preventDefault();
	}

	hasError(){
		return this.state.error !== undefined && this.state.error !== null;
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
						<div className="nv-col-4"><input type="text" className="form-control" name="ingredient" placeholder="Ingredients" onChange={this.handleInputChange}/></div>
						<div className="nv-col-4">
							<select className="form-control" name="diet" onChange={this.handleInputChange}>
								<option value=''>Select Diet</option>
								{dietOptins}
							</select>
						</div>
						<div className="nv-col-4">
							<select className="form-control" name="health" onChange={this.handleInputChange}>
								<option value=''>Select Health</option>
								{healthOptions}
							</select>
						</div>
					</div>
					<div className="nv-grid">
						<div className="nv-col-2"><input type="number" className="form-control" name="lowCalories" placeholder="Lower Calories" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" name="highCalories" placeholder="High Calories" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" name="minNutrient" placeholder="Min Nutrient" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2"><input type="number" className="form-control" name="maxNutrient" placeholder="Max Nutrient" min="0" max="1000" onChange={this.handleInputChange}/></div>
						<div className="nv-col-2">
							<select className="form-control" name="nutrientCode" onChange={this.handleInputChange}>
								<option value=''>Select Nutrients</option>
								{nutrientOptions}
							</select>
						</div>
						<div className="nv-col-2">
							<button className="btn btn-default" type="submit" value="Search">Search</button> 
							<button className="btn btn-reset" type="reset" value="Search">Clear</button>
						</div>
					</div>
				</form>	
				<div className="searchResult">
				</div>
			</div>
		);
	}

}
