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
		//Registers action handler with the Dispatcher.
		Dispatcher.register(this._registerToActions.bind(this));
	}

	_registerToActions(action) {
		switch(action.actionType) {
			case ACTIONTYPES.SEARCH_RECIPE:
			case ACTIONTYPES.LOAD_MORE_RECIPES:
				this._callRecipeSearchApi(action.payload);
				break;
			default:
				console.log('No action');
				break;
		}
	}

	/**
	 * Return Recipe List
	 */
	getRecipeList(){
		return this.recipeList;
	}

	isMore(){
		return this.more;
	}

	getFromIdx(){
		return this.fromIdx;
	}

	getToIdx(){
		return this.toIdx;
	}

	_callRecipeSearchApi(data){
		this.recipeList = this.recipeList.concat(data.recipeList);
		this.more = data.moreData;
		this.fromIdx = data.from;
		this.toIdx = data.to;
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