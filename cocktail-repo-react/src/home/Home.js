import React from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWineBottle} from '@fortawesome/free-solid-svg-icons';

export class Home extends React.Component {

    searchInput;
    byName = true;
    
    constructor(props) {
        super(props);
        this.searchByName = this.searchByName.bind(this);
        this.searchByIngredient = this.searchByIngredient.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {redirect: false};
    }

    handleInputChange(event) {
        this.searchInput = event.target.value;
    }

    redirect() {
        if(this.state.redirect) {
            return <Redirect to={`/search?q=${this.searchInput}&byName=${+this.byName}`} />;
        } 
    }

    searchByName() {
        this.byName = true
        this.setState({redirect: true});
      
    }

    searchByIngredient() {
        this.byName = false
        this.setState({redirect: true});
    }

    render() {
        return (
            <div className="search-container">
               {this.redirect()} 
               <div className="card"> 
                <div className="card-block">
                    <div className="card-text">
                        <form className="clr-form clr-form-horizontal">
                            <div className="clr-form-control">
                                <div className="clr-control-container">
                                    <div className="clr-input-wrapper text-center">
                                        <input type="text" name="q" className="clr-input" onChange={this.handleInputChange} placeholder="Search cocktail by name" />
                                    </div>
                                </div>
                            </div>
                            <div className="clr-form-control text-center">
                                <button type="button" className="btn btn-primary" onClick={this.searchByName}>
                                    <FontAwesomeIcon icon={faWineBottle}/> Search
                                </button>
                            </div>
                        </form>
                    </div>
                    </div> 
                </div>  
                  
            </div>
        )
    }
}