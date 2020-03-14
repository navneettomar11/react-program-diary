import React from 'react';
import {CocktailRepoService} from '../services/CocktailRepoService';

export class Search extends React.Component {
    
    cocktailRepoService = new CocktailRepoService();
 
    constructor(props) {
       super(props);
       this.state = {cocktails: [], error: false} 
    }
    _parseQueryParam(query) {
        let params = {};
       let splitParams = query.substring(1, query.length).split("&");
       splitParams.forEach(param => {
          let splitKeyNValue = param.split("=");
          params[splitKeyNValue[0]] = splitKeyNValue[1]; 
       });
       return params;
    }

    componentDidMount() {
        const params = this._parseQueryParam(this.props.location.search);
        this.cocktailRepoService.getCocktails(params.q, +params.byName === 1).then((cocktails) => {
           this.setState({cocktails : cocktails && cocktails.drinks, error: (cocktails && cocktails.drinks) === null});
        });
    }

    render() {
        let cocktailList = [];
        if(!!this.state.cocktails && this.state.cocktails.length > 0) {
            cocktailList = this.state.cocktails.map((cocktail, idx) => {
                //idDrink
                //strDrink
                // strTags
                //strCategory
                //strAlcoholic
                //strGlass
                //strInstructions
                //strDrinkThumb
                //strIngredient1
                return( 
                    <a key={cocktail.idDrink} href={`/cocktail/${cocktail.idDrink}`} className="card clickable">
                        <div className="card-img">
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                        </div>
                        <div className="card-block">
                            <div className="card-text">
                                <h3>{cocktail.strDrink}</h3>
                                <p>{cocktail.strInstructions}</p>
                            </div>
                        </div>
                    </a>
                );        
            });
        }
        return(
            <React.Fragment>           
                 {cocktailList.length > 0 ?  
                    <div className="card-columns"> {cocktailList} </div> :  
                    this.state.error ?
                    <div className="alert alert-danger">
                        <div className="alert-item text-center">
                            <h2 className="alert-text">
                                No Drinks found.
                            </h2>
                        </div>
                    </div> :
                    <span className="spinner spinner-lg">
                        Loading...
                    </span>   
                }
            </React.Fragment>

        );
    }
}