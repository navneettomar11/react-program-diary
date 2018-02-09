import React from 'react';

export class Image extends React.Component{

	constructor(props){
		super(props);
		this.state = { imageLoaded: false };
		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.handleImageLoadError = this.handleImageLoadError.bind(this);
	}

	handleImageLoad(){
		this.setState({ imageLoaded: true });
	}

	handleImageLoadError(){
		this.setState({ imageLoadError: true });
	}

	render(){
		if(this.state.imageLoadError){
			return (<span>fail to load</span>);
		}
		let hiddenStyle = {display: this.state.imageLoaded?'block':'none'};
		return (
			<img src={this.props.src} alt={this.props.alt} style={hiddenStyle} onLoad={this.handleImageLoad} onError={this.handleImageLoadError}/>
		);
	}
}
