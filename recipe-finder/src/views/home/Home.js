import React from 'react';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './Home.css';
import SearchResult from './SearchResult';
import HttpClient from '../../utils/HttpClient';
import Parser from '../../utils/Parser';
import {RECEIPE_SEARCH_API_URL,EDAMAM_API_ID, EDAMAM_API_KEY} from '../../config/Constants';
import { EdamanResponse } from '../../config/EdamamResponse';

export default class Home extends React.Component {

	
	constructor(props){
		super(props);
		this.state = {
			queryText: '',
			from: 0, 
			to: 9,
			more: false, 
			receipeList : []
		};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.searchReceipe = this.searchReceipe.bind(this);
		this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
	}

	handleSearchTextChange(event){
		this.setState({
			queryText: event.target.value,
		});
	}

	searchReceipe(){
		let httpClient = new HttpClient();
		if(this.state.queryText === ''){
			return;
		}
		let searchData = {'q':this.state.queryText, app_id : EDAMAM_API_ID, app_key : EDAMAM_API_KEY, from: this.state.from, to: this.state.to};
		//httpClient.get(RECEIPE_SEARCH_API_URL, searchData)
		httpClient.get("data/demo2.json", searchData)
		.then((response) => {
			let edamanObj = Parser.parseResponseToEdamamResponse(response);
			this.setState((prevState, props) => ({
				more: edamanObj.more,
				receipeList : prevState.receipeList.concat(edamanObj.hits || [])
			}),()=>{
				console.log(this.state);
			});
		}).catch(function(ex) {
			console.log(ex);
		});
	}

	loadMoreRecipes(event){
		let fromIdx = this.state.to;
		let toIdx = fromIdx + 9;
		this.setState({
			from: fromIdx,
			to: toIdx
		},this.searchReceipe);
	}

	render(){
		return(
			<React.Fragment>
				<form action="#" className="recipeSearchForm">
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
						<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
						<label className="mdl-textfield__label" htmlFor="searchText">SEARCH BY INGREDIENTS</label>
					</div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--6-col marginRight">
						<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
						<label className="mdl-textfield__label" htmlFor="searchText">NUMBER OF INGREDIENTS</label>
					</div>
					<div className="mdl-textfield mdl-js-textfield getmdl-select mdl-cell--6-col">
						<input type="text" value="" className="mdl-textfield__input" id="diets" readOnly />
						<input type="hidden" value="" name="diets" />
						<i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
						<label htmlFor="diets" className="mdl-textfield__label">DIETS</label>
						<ul htmlFor="sample2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
							<li className="mdl-menu__item" data-val="balanced">BALANCED</li>
							<li className="mdl-menu__item" data-val="high-protein">HIGH PROTEIN</li>
							<li className="mdl-menu__item" data-val="high-fiber">HIGH FIBER</li>
							<li className="mdl-menu__item" data-val="low-fat">LOW FAT</li>
							<li className="mdl-menu__item" data-val="low-carb">LOW CARBOHYDRATE</li>	
							<li className="mdl-menu__item" data-val="low-sodium">LOW SODIUM</li>
							
						</ul>
					</div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--3-col marginRight">
						<input className="mdl-textfield__input" type="text" id="searchText" value={this.state.searchText} onChange={this.handleSearchTextChange}/>
						<label className="mdl-textfield__label" htmlFor="searchText">CALORIES</label>
					</div>
					<div className="mdl-textfield mdl-js-textfield getmdl-select mdl-cell--2-col">
						<input type="text" value="" className="mdl-textfield__input" id="calories-bound" readOnly />
						<input type="hidden" value="calories-bound" name="calories-bound" />
						<i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
						<label htmlFor="calories-bound" className="mdl-textfield__label">CALORIES BOUND</label>
						<ul htmlFor="calories-bound" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
							<li className="mdl-menu__item" data-val="gte">LOWER</li>
							<li className="mdl-menu__item" data-val="lte">UPPER</li>
						</ul>
					</div>

					<div className="mdl-cell--12-col text-center mdl-cell--middle nv-search-button">	
						<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.searchReceipe}>
							<i className="material-icons">search</i> Search
						</button>
					</div>
				</form>	
				<SearchResult data={this.state.receipeList}/>
				{ this.state.more &&
					(<div className="mdl-grid">
						<div className="mdl-cell mdl-cell--12-col">
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.loadMoreRecipes}>Load More</button>
						</div>
					</div>)
				}
			</React.Fragment>	
		);
	}

}
