export const RECEIPE_SEARCH_API_URL = 'https://api.edamam.com/search';
export const EDAMAM_API_ID = '8ee72f81';
export const EDAMAM_API_KEY = '918ae0475650ba249a8c7322b5556d2e'
export const CHANGE_EVENT = 'change';
export const PER_PAGE_LIMIT = 9;

export const YOUTUBE_API_KEY = 'AIzaSyCSOwvbrz4XPss1VXHom4cU_ULVGTu1zz4';


export const ACTIONTYPES = {
	SEARCH_RECIPE: 'search-receipes',
	LOAD_MORE_RECIPES : 'load-more-search-recipes',
	CLEAR_SEARCH_RECIPE_DATA: 'clearRecipeSearchData',
	ERROR_SEARCH_RECIPE_DATA: 'errorRecipeSearchData',
};

export const DIETS = [
	{text:'Balanced', value:'balanced', description: 'Protein/Fat/Carb values in 15/35/50 ratio'}, 
	{text:'High-Fiber', value:'high-fiber',description: 'More than 5g fiber per serving'}, 
	{text:'High-Protein', value:'high-protein',description: 'More than 50% of total calories from proteins'}, 
	{text:'Low-Carb', value:'low-carb',description: 'Less than 20% of total calories from carb'}, 
	{text:'Low-Fat', value:'low-fat',description: 'Less than 15% of total calories from fat'},
	{text:'Low-Sodium', value:'low-sodium',description: 'Less than 140mg Na per serving'}
];

export const HEALTHS = [
	{text:'Alcohol-free',value:'alcohol-free',description:'No alcohol used or contained'},
	{text:'Celery-free',value:'celery-free',description:'does not contain celery or derivatives'},
	{text:'Crustacean-free',value:'crustacean-free',description:'does not contain crustaceans (shrimp, lobster etc.) or derivatives'},
	{text:'Dairy',value:'dairy-free',description:'No dairy; no lactose'},
	{text:'Eggs',value:'egg-free',description:'No eggs or products containing eggs'},
	{text:'Fish',value:'fish-free',description:'No fish or fish derivatives'},
	{text:'Gluten',value:'gluten-free',description:'No ingredients containing gluten'},
	{text:'Kidney friendly',value:'kidney-friendly',description:'per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg'},
	{text:'Kosher',value:'kosher',description:'contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves'},
	{text:'Low potassium',value:'low-potassium',description:'Less than 150mg per serving'},
	{text:'Lupine-free',value:'lupine-free',description:'does not contain lupine or derivatives'},
	{text:'Mustard-free',value:'mustard-free',description:'does not contain mustard or derivatives'},
	{text:'No oil added',value:'No-oil-added',description:'No oil added except to what is contained in the basic ingredients'},
	{text:'No-sugar',value:'low-sugar',description:'No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose'},
	{text:'Paleo',value:'paleo',description:'Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils'},
	{text:'Peanuts',value:'peanut-free',description:'No peanuts or products containing peanuts'},
	{text:'Pescatarian',value:'pescatarian',description:'Does not contain meat or meat based products, can contain dairy and fish'},
	{text:'Pork-free',value:'pork-free',description:'does not contain pork or derivatives'},
	{text:'Red meat-free',value:'red-meat-free',description:'does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.'},
	{text:'Sesame-free',value:'sesame-free',description:'does not contain sesame seed or derivatives'},
	{text:'Shellfish',value:'shellfish-free',description:'No shellfish or shellfish derivatives'},
	{text:'Soy',value:'soy-free',description:'No soy or products containing soy'},
	{text:'Sugar-conscious',value:'sugar-conscious',description:'Less than 4g of sugar per serving'},
	{text:'Tree Nuts',value:'tree-nut-free',description:'No tree nuts or products containing tree nuts'},
	{text:'Vegan',value:'vegan',description:'No meat,poultry, fish, dairy, eggs or honey'},
	{text:'Vegetarian',value:'vegetarian',description:'No meat, poultry, or fish'},
	{text:'Wheat-free',value:'wheat-free',description:'No wheat, can have gluten though'}
];

export const NUTRIENTS = [
	{code:'CA',name:'Calcium',unit:'mg'},
	{code:'ENERC_KCAL',name:'Energy',unit:'kcal'},
	{code:'CHOCDF',name:'Carbs',unit:'g'},
	{code:'NIA',name:'Niacin (B3)',unit:'mg'},
	{code:'CHOLE',name:'Cholesterol',unit:'mg'},
	{code:'P',name:'Phosphorus',unit:'mg'},
	{code:'FAMS',name:'Monounsaturated',unit:'g'},
	{code:'PROCNT',name:'Protein',unit:'g'},
	{code:'FAPU',name:'Polyunsaturated',unit:'g'},
	{code:'RIBF',name:'Riboflavin (B2)',unit:'mg'},
	{code:'FASAT',name:'Saturated',unit:'g'},
	{code:'SUGAR',name:'Sugars',unit:'g'},
	{code:'FAT',name:'Fat',unit:'g'},
	{code:'THIA',name:'Thiamin (B1)',unit:'mg'},
	{code:'FATRN',name:'Trans',unit:'g'},
	{code:'TOCPHA',name:'Vitamin E',unit:'mg'},
	{code:'FE',name:'Iron',unit:'mg'},
	{code:'VITA_RAE',name:'Vitamin A',unit:'æg'},
	{code:'FIBTG',name:'Fiber',unit:'g'},
	{code:'VITB12',name:'Vitamin B12',unit:'æg'},
	{code:'FOLDFE',name:'Folate (Equivalent)',unit:'æg'},
	{code:'VITB6A',name:'Vitamin B6',unit:'mg'},
	{code:'K',name:'Potassium',unit:'mg'},
	{code:'VITC',name:'Vitamin C',unit:'mg'},
	{code:'MG',name:'Magnesium',unit:'mg'},
	{code:'VITD',name:'Vitamin D',unit:'æg'},
	{code:'NA',name:'Sodium',unit:'mg'},
	{code:'VITK1',name:'Vitamin K',unit:'æg'}
];