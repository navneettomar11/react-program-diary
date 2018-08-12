import Dispatcher from '../config/Dispatcher';
import {ACTIONTYPES,RECEIPE_SEARCH_API_URL,EDAMAM_API_ID, EDAMAM_API_KEY, PER_PAGE_LIMIT} from '../config/Constants';

import HttpClient from '../utils/HttpClient';
import Parser from '../utils/Parser';
class RecipeSearchAction {

	constructor(){
		this.httpClient = new HttpClient();
	}

	callRecipeSearchApi(searchObj){
		let lowCalories = undefined;
		let highCalories = undefined;
		let minNutrient = undefined;
		let maxNutirent = undefined;
		let searchData = {
			'q':searchObj.ingredient, 
			app_id : EDAMAM_API_ID, 
			app_key : EDAMAM_API_KEY
		};
		searchData.from = searchObj.from  || 0;
		searchData.to = searchObj.to || PER_PAGE_LIMIT;
		//diet
		if(searchObj.diet){
			searchData.diet = searchObj.diet;
		}
		//health
		if(searchObj.health){
			searchData.health = searchObj.health;
		}
		//calories
		if(searchObj.lowCalories && parseInt(searchObj.lowCalories,10) !== 0){
			lowCalories=window.encodeURIComponent(`lte ${parseInt(searchObj.lowCalories,10)}`);
		}
		if(searchObj.highCalories && parseInt(searchObj.highCalories,10) !== 0){
			highCalories=window.encodeURIComponent(`gte ${parseInt(searchObj.highCalories,10)}`);
		}
		if(lowCalories && highCalories){
			searchData.calories = `${lowCalories},${highCalories}`;
		}else if(highCalories || lowCalories){
			searchData.calories = lowCalories || highCalories;
		}
		//Nutrient
		if(searchObj.minNutrient && parseInt(searchObj.minNutrient, 10) !== 0){
			minNutrient = parseInt(searchObj.minNutrient,10);
		}
		if(searchObj.maxNutrient && parseInt(searchObj.maxNutrient, 10) !== 0){
			maxNutirent = parseInt(searchObj.maxNutrient,10);
		}
		if(minNutrient && maxNutirent){
			searchData.nutrients = {};
			searchData.nutrients[searchObj.nutrientCode] = `${minNutrient}-${maxNutirent}`;
		}else if(minNutrient || maxNutirent){
			searchData.nutrients = {};
			searchData.nutrients[searchObj.nutrientCode] = maxNutirent || (minNutrient ? minNutrient+window.encodeURIComponent('+'): undefined);
		}

		//Call Edaman Recipe Api
		this._callEdamanRecipeSearchApi(searchData, ACTIONTYPES.SEARCH_RECIPE);
	}

	loadMoreReceipes(searchObj){
		this.callRecipeSearchApi(searchObj);
	}

	clearData(){
		Dispatcher.dispatch({
			actionType: ACTIONTYPES.CLEAR_SEARCH_RECIPE_DATA,
			payload: {}, 
		});
	}

	_callEdamanRecipeSearchApi(searchData, dispatchActionType){
		//this.httpClient.get("data/demo2.json", searchData)
		this.httpClient.get(RECEIPE_SEARCH_API_URL, searchData)
		.then((response) => {
			let edamanObj = Parser.parseResponseToEdamamResponse(response);
			Dispatcher.dispatch({
				actionType: dispatchActionType,
				payload: {recipeList: edamanObj.hits || [] , moreData: edamanObj.more, from : edamanObj.from, to : edamanObj.to, queryText: edamanObj.q}, 
			});
		}).catch(function(ex) {
			Dispatcher.dispatch({
				actionType: ACTIONTYPES.ERROR_SEARCH_RECIPE_DATA,
				payload: {recipeList: []}, 
			});
		});
	}
}

export default new RecipeSearchAction();

