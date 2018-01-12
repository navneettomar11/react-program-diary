import React from 'react';

const SearchResult = (props) => {
	let searchResultRowList = [];
	props.data.forEach((receipeHit, i)=> searchResultRowList.push(<SearchResultData key={i} recipe={receipeHit.recipe}/>));
	return (
		<ul className="mdl-cell--12-col recipe-search-result">
			{searchResultRowList}
		</ul>
	);
}


const SearchResultData = (props) => {
	const recipe = props.recipe;
	return (
		<li>
		<div key={recipe.label} className="receipe-finder-card-square mdl-card mdl-shadow--2dp">
			<div className="mdl-card__title mdl-card--expand">
				<h2 className="mdl-card__title-text">{recipe.label}</h2>
			</div>
			<div className="mdl-card__media">
				<img src={recipe.image} alt={recipe.label} />
			</div>
			<div className="mdl-card__actions">
			</div>
			<div className="mdl-card__menu">
				<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i className="material-icons">share</i>
				</button>
			</div>
		</div>
		</li>
	);
}

export default SearchResult;