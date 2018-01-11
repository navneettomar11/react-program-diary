import React from 'react';

const SearchResult = (props) => {
	let searchResultRowList = [];
	props.data.forEach((receipeHit, i)=> searchResultRowList.push(<SearchResultData key={i} recipe={receipeHit.recipe}/>));
	return (
		<div className="mdl-cell mdl-cell--12-col">
			{searchResultRowList}
		</div>
	);
}


const SearchResultData = (props) => {
	const recipe = props.recipe;
	return (
		<div key={recipe.label} className="receipe-finder-card-square mdl-card mdl-shadow--2dp mdl-cell--4-col">
			<div className="mdl-card__title mdl-card--expand">
				<h2 className="mdl-card__title-text">{recipe.label}</h2>
			</div>
			<div className="mdl-card__media">
				<img src={recipe.image} alt={recipe.label} />
			</div>
			<div className="mdl-card__actions mdl-card--border">
				<p><strong>Source: </strong><a href={recipe.url} target="_blank">{recipe.source}</a></p>
				<p><strong>Number of Serving: </strong>{recipe.yield}</p>
				<p><strong>Calroies: </strong>{parseFloat(recipe.calories).toFixed(2)} kcal</p>
				<button className="mdl-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">More Info...</button>
			</div>
			<div className="mdl-card__menu">
				<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i className="material-icons">share</i>
				</button>
			</div>
		</div>
	);
}

export default SearchResult;