

export class EdamanResponse {

	constructor({q, from, to, params, more, count}){
		this.q = q;
		this.form = from;
		this.to= to;
		this.params = params;
		this.more = more;
		this.count = count;
		this.hits = [];
	}

	toString(){
		let returnString = '';
		Object.keys(this).forEach((k)=> {
			returnString+=`${k} : ${this[k]},`;
		});
		return `EdamanResponse : [${returnString}]`;
	}
}

export class ReceipeHit {

	constructor({bookmarked = false, bought = false}){
		this.bookmarked = bookmarked;
		this.bought = bought;
	}
	
}

export class Receipe {
	constructor({uri, label, image, source, url, calories=0, totalWeight=0, ingredients=[], totalNutrients=[], totalDaily=[], dietLabels=[], healthLabels=[]}){
		this.uri = uri;
		this.label = label;
		this.image = image;
		this.source = source;
		this.url = url;
		//this.yield = 0;
		this.calories = calories;
		this.totalWeight= totalWeight;
		this.ingredients = ingredients;
		this.totalNutrients= totalNutrients;
		this.totalDaily = totalDaily;
		this.dietLabels = dietLabels;
		this.healthLabels = healthLabels;
	}

	toString(){
		let returnString = '';
		Object.keys(this).forEach((k)=> {
			returnString+=`${k} : ${this[k]},`;
		});
		return `Receipe : [${returnString}]`;
	}
}

export class Ingredient{


}

export class NutrientInfo{

}


export class EdamanParams {

	constructor({sane=[],q=[], appKey=[], appId=[]}){
		this.sane = sane;
		this.q = q;
		this.appKey = appKey;
		this.appId = appId;
	}
}