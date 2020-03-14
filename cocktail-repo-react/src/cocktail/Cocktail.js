import React from 'react';
import { CocktailRepoService } from '../services/CocktailRepoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import {Modal} from '../shared/modal/Modal';

export class Cocktail extends React.Component {

    cocktailRepoService = new CocktailRepoService();

    constructor(props) {
        super(props);
        this.state = {cocktail: undefined, error: false, ingredient: undefined, showIngredientModal: false};
        this.openIngredientModal = this.openIngredientModal.bind(this);
    }

    componentDidMount(){
        let cocktailId = this.props.match.params.id;
        this.cocktailRepoService.getCocktailById(cocktailId).then((cocktail) => {
            let state = {}
            state.error = (cocktail === null);  
            if(!state.error) {
                state.cocktail = cocktail;
            }
            this.setState(state);
        })
    }

    openIngredientModal(ingredient) {
       if(!!ingredient.id) {
           this.setState({ingredient: ingredient, showIngredientModal: true});
            return;
       }

       this.cocktailRepoService.getCocktailIngredient(ingredient.name).then((response) => {
           ingredient.id = response.idIngredient;
           ingredient.description = response.strDescription;
           ingredient.type = response.strType;
           this.setState({ingredient: ingredient, showIngredientModal: true});
       });
    }

    

    render() {
        const cocktail = this.state.cocktail;
        let ingredients = [];
        if(cocktail && cocktail.ingredients.length > 0) {
            ingredients = cocktail.ingredients.map((ingredient, idx) => {
                return( 
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" key={idx.toString()} onClick={() => this.openIngredientModal(ingredient)}  className="clr-col-2 text-center" role="tooltip" aria-haspopup="true">
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name.toLowerCase()}-Small.png`}  alt={ingredient.name} style={{width: 5+'rem'}}/>
                        <br/><strong>{ingredient.measure}</strong>
                    </a> 
                );
            });
        }
        return (
            <React.Fragment>
            { !!cocktail ?
                <div className="card">
                    <div className="card-header">
                        <FontAwesomeIcon icon={faWineBottle} size="1x" color={!cocktail.alcoholic ? '#3c8500': '#c21d00'}/> {cocktail.drinkName}
                    </div>
                    <div className="card-block">
                        <div className="card-text">
                            <div className="clr-row">
                                <div className="clr-col-4">
                                    <img src={cocktail.thumb} alt={cocktail.drinkName} style={{width: 100+'%'}}/>
                                    <p>
                                        <strong>Category: </strong>
                                        {cocktail.category}
                                    </p>
                                    <p>
                                        <strong>Tags: </strong>
                                        {
                                            !!cocktail.tags && cocktail.tags.length > 0 ? 
                                        cocktail.tags.map((tag, idx) => <span key={`tag-${idx}`} className="label label-info">{tag}</span>)
                                        : <span>No Tags</span>
                                        }
                                    </p>
                                    <p>
                                    <strong>Glass: </strong> 
                                    {cocktail.glass}
                                    </p>
                                        
                                </div>
                                <div className="clr-col-8">
                                    <p>{cocktail.instruction}</p>
                                    {ingredients.length > 0 ?
                                        <React.Fragment>
                                            <h3>Ingredients</h3>
                                            <div className="clr-row">
                                                {ingredients}
                                            </div>
                                        </React.Fragment>
                                       :
                                       <div></div> 
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>Loading...</div>
            }
            { this.state.ingredient ?
                    <Modal title={this.state.ingredient.name} show={this.state.showIngredientModal} onClose={() => this.setState({showIngredientModal: !this.state.showIngredientModal})}>
                    { !!this.state.ingredient.description ?
                        <p>{this.state.ingredient.description}</p> :
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${this.state.ingredient.name.toLowerCase()}-Medium.png`} alt={this.state.ingredient.name}/>
                    }
                </Modal> :
                <span></span> 
            }   
        
            </React.Fragment>
        );
    }
}