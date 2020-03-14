

const baseUrl = `https://www.thecocktaildb.com/api/json/v1/1`;

class Drink {
    id;
    drinkName;
    category;
    alcholic;
    glass;
    instruction;
    thumb;
    tags;
    ingredients = [];

    constructor(id, name) {
        this.id =id;
        this.drinkName = name;
    }
}

class Ingredient {
    name;
    measure;
    id;
    description;
    type;

    constructor(name, measure) {
        this.name = name;
        this.measure = measure;
    }
}

export class CocktailRepoService {
    commanHeaders = {
        'Content-type': 'application/json'
    }

    transformResponseToDrinks(response) {
        let drink = new Drink(response.idDrink, response.strDrink);
        drink.category = response.strCategory;
        drink.alcholic = response.strAlcoholic === 'Alcoholic';
        drink.glass = response.strGlass;
        drink.instruction = response.strInstructions;
        drink.thumb = response.strDrinkThumb;
        if(!!response.strTags) {
            drink.tags = response.strTags.split(",");
        }
        for(let i = 1; i <= 15; i++) {
            const ingredient = response['strIngredient'+i];
            if(!!ingredient) {
                drink.ingredients.push(new Ingredient(ingredient, response['strMeasure'+i]));
            }
           
        }    
        return drink;
    }

    async getCocktails(searchTerm, byName = true) {
        const requestOptions = {
            method: 'GET',
            header: Object.assign({}, this.commanHeaders)
        };
        const request = new Request(`${baseUrl}/search.php?${byName ? 's': 'i'}=${searchTerm}`, requestOptions);
        try {
           const response = await fetch(request);
           return await response.json();
        }catch(e) {
            return null;
        }
    }


    async getCocktailById(drinkId) {
        const requestOptions = {
            method: 'GET',
            header: Object.assign({}, this.commanHeaders)
        };
        const request = new Request(`${baseUrl}/lookup.php?i=${drinkId}`, requestOptions);
        try{
            const response = await fetch(request);
            const drinkResponse = await response.json();
            if(!!drinkResponse && !!drinkResponse.drinks) {
                const drink = this.transformResponseToDrinks(drinkResponse.drinks[0]);
                return drink;
            }
            return null;
        }catch(e) {
            return null
        }
    }

    async getCocktailIngredient(ingredientName) {
        const requestOptions = {
            method: 'GET',
            header: Object.assign({}, this.commanHeaders)
        };
        const request = new Request(`${baseUrl}/search.php?i=${ingredientName}`, requestOptions);
        try {
            const response = await fetch(request);
            const ingredients =  await response.json();
            return ingredients.ingredients[0];
         }catch(e) {
             return null;
         }
    }
}