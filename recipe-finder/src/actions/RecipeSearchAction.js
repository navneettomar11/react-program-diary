import Dispatcher from '../config/Dispatcher';
import {ACTIONTYPES,RECEIPE_SEARCH_API_URL,EDAMAM_API_ID, EDAMAM_API_KEY, PER_PAGE_LIMIT} from '../config/Constants';

import HttpClient from '../utils/HttpClient';
import Parser from '../utils/Parser';
class RecipeSearchAction {

	constructor(){
		this.httpClient = new HttpClient();
	}

	
	callRecipeSearchApi(searchObj){
		let searchData = {'q':searchObj.queryText, app_id : EDAMAM_API_ID, app_key : EDAMAM_API_KEY, from: searchObj.from, to: searchObj.to};
		this._callEdamanRecipeSearchApi(searchData, ACTIONTYPES.SEARCH_RECIPE);
	}

	loadMoreReceipes(searchObj){
		let fromIdx = searchObj.to;
		let toIdx = fromIdx + PER_PAGE_LIMIT;
		let searchData = {'q':searchObj.queryText, app_id : EDAMAM_API_ID, app_key : EDAMAM_API_KEY, from: fromIdx, to: toIdx};
		this._callEdamanRecipeSearchApi(searchData, ACTIONTYPES.SEARCH_RECIPE);
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
			console.log(ex);
		});
	}
}

export default new RecipeSearchAction();

