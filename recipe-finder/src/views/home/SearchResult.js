import React from 'react';

const convertSearchDataToTwoDataArray = (searchResultData) => {
	let dataArray = [];
	let idx = 0;
	dataArray.push(new Array())
	searchResultData.forEach((data, index) => {
		if(index > 0 && index%3 === 0) {
			dataArray.push([]);
			idx++;
		}
		dataArray[idx].push(data);
	});
	return dataArray;
}

const SearchResult = (props) => {
	const searchRecipeListData  = convertSearchDataToTwoDataArray(props.data);
	const searchResultRowList=  searchRecipeListData.map((rowData, i)=> <SearchResultRow key={i} rowData={rowData}/>);
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
	console.log(recipe);
	return (
		<div key={recipe.label} className="mdl-card mdl-shadow--2dp">
			<div className="mdl-card__title mdl-card--expand">
				<h2 className="mdl-card__title-text">{recipe.label}</h2>
			</div>
			<div className="mdl-card__media">
				<img src={recipe.image} alt={recipe.label} />
			</div>
			<div className="mdl-card__actions mdl-card--border">
				<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				View Recipe
				</a>
			</div>
		</div>
	);
}

export default SearchResult;