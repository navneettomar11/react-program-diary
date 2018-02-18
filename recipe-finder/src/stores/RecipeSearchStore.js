import { EventEmitter } from 'events';
import Dispatcher from '../config/Dispatcher';
import {ACTIONTYPES,CHANGE_EVENT,PER_PAGE_LIMIT} from '../config/Constants';

class RecipeSearchStore extends EventEmitter {

	constructor(){
		super();
		this.recipeList = [];
		this.more = false;
		this.fromIdx = 0;
		this.toIdx = PER_PAGE_LIMIT;
		this.queryText = '';
		this.diet = '';
		this.health = '';
		this.lowCalories = undefined;
		this.highCalories = undefined;
		this.nutrients = undefined;
		//Registers action handler with the Dispatcher.
		Dispatcher.register(this._registerToActions.bind(this));
	}

	/**
	 * Callbac function which is invoked by dispatcher
	 * @param {*} action 
	 */
	_registerToActions(action) {
		switch(action.actionType) {
			case ACTIONTYPES.SEARCH_RECIPE:
			case ACTIONTYPES.LOAD_MORE_RECIPES:
				this._callRecipeSearchApi(action.payload);
				break;
			case ACTIONTYPES.CLEAR_SEARCH_RECIPE_DATA:
				this._clearRecipeSearch(action.payload);	
				break;
			default:
				console.log('No action');
				break;
		}
	}

	/**
	 *  Return Receipe Search objects
	 */
	getRecipeSearchObject(){
		return { 
			queryText: this.queryText, 
			from: this.fromIdx,  
			to: this.toIdx, 
			more : this.more,
			diet: this.diet,
			lowCalories: this.lowCalories,
			highCalories: this.highCalories,
			health: this.health,
			nutrients: this.nutrients
		}
	}

	/**
	 * Return Recipe List
	 */
	getRecipeList(){
		return this.recipeList;
	}

	/**
	 * Return boolean - more receipe flag
	 */
	isMore(){
		return this.more;
	}

	/**
	 * get from index
	 */
	getFromIdx(){
		return this.fromIdx;
	}

	/**
	 * get to index 
	 */
	getToIdx(){
		return this.toIdx;
	}

	/**
	 * Calling third party rest api to find recipe list for given search items
	 * @param {*} data 
	 */
	_callRecipeSearchApi(data){
		this.recipeList = this.recipeList.concat(data.recipeList);
		this.more = data.moreData;
		this.fromIdx = data.from;
		this.toIdx = data.to;
		this.queryText = data.queryText;
		this.emit(CHANGE_EVENT);
	}

	_clearRecipeSearch(){
		this.recipeList = [];
		this.more = false;
		this.fromIdx = 0;
		this.toIdx = PER_PAGE_LIMIT;
		this.queryText = '';
		this.diet = '';
		this.health = '';
		this.lowCalories = undefined;
		this.highCalories = undefined;
		this.nutrients = undefined;	
		this.emit(CHANGE_EVENT);
	}

	// Hooks a React component's callback to the CHANGE event.
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	// Removes the listener from the CHANGED event.
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

}
export default new RecipeSearchStore();