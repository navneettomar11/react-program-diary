import React from 'react';

const Badge = (props) => {
	return(
		<span className="nv-badge">
			{props.children}
		</span>	
	);
}

export default Badge;