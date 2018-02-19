import React from 'react';

const Spinner =(props)=>{
	let showClass = props.loading?'in':'';
	return(
		<div className={"loading "+showClass}></div>
	);
}
export default Spinner;