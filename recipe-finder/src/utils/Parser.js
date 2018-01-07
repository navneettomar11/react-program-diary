import {EdamanResponse, ReceipeHit, Receipe} from '../config/EdamamResponse';

export default class Parser{

	static parseResponseToEdamamResponse(responseJson){
		var edamamObj = new EdamanResponse(responseJson);
		if(responseJson.hits && responseJson.hits.length > 0 ){
			responseJson.hits.forEach((hit) => {
				let receipeHit = new ReceipeHit(hit);
				receipeHit.recipe = new Receipe(hit.recipe);
				//receipeHit.recipe.yield = hit.recipe.yield;
				edamamObj.hits.push(receipeHit);
			});
		}
		return edamamObj;
	}
}