import React from 'react';
import Spinner from './Spinner';

export default class Image extends React.Component{

	constructor(props){
		super(props);
		this.state = { imageLoaded: false, loadingSpinner : true };
		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.handleImageLoadError = this.handleImageLoadError.bind(this);
	}

	handleImageLoad(){
		this.setState({ imageLoaded: true, loadingSpinner: false });
	}

	handleImageLoadError(){
		this.setState({ imageLoadError: true, loadingSpinner: false });
	}

	render(){
		if(this.state.imageLoadError){
			return(<img src="images/nophoto.jpg" alt="No Photo"/>)
		}
		let hiddenStyle = {display: this.state.imageLoaded?'block':'none'};
		return (
			<img src={this.props.src} alt={this.props.alt} style={hiddenStyle} onLoad={this.handleImageLoad} onError={this.handleImageLoadError}/>
		);
	}
}
