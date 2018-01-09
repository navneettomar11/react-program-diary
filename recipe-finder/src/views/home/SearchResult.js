import React from 'react';

const SearchResult = (props) => {
	let tmpData = [], searchResultRowList = [];
	console.log(props.data);
	props.data.forEach((rowData, i)=> {
		console.log(rowData, i);
		if(i > 0 && i % 3 === 0){
			searchResultRowList.push(<SearchResultRow key={i} rowData={tmpData}/>);
			tmpData = [];
		}
		tmpData.push(rowData);
	});
	if(tmpData.length > 0){
		searchResultRowList.push(<SearchResultRow key={props.data.length} rowData={tmpData}/>);
	}
	return (
		<div className="mdl-grid">
		<div className="mdl-cell mdl-cell--12-col">
			{searchResultRowList}
		</div>
		</div>
	);
}

const SearchResultRow = (props) => {
	const searchRecipeCells = props.rowData.map((receipeHit, i) => {
		return (
			<div className="mdl-cell mdl-cell--4-col" key={i}>
				<SearchResultData recipe ={receipeHit.recipe} />
			</div>
		);
	});
	return (
		<div className="mdl-grid">
			{searchRecipeCells}
		</div>
	);
}

const SearchResultData = (props) => {
	const recipe = props.recipe;
	return (
		<div key={recipe.label} className="receipe-finder-card-square mdl-card mdl-shadow--2dp">
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