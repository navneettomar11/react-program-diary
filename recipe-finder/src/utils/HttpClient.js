import 'whatwg-fetch';

export default class HttpClient {

	
	deserializeObjectAsQueryParam(dataObj){
		let queryParam='';
		Object.keys(dataObj).forEach(function(k){
			if(queryParam !== ''){
				queryParam+='&';
			}
			queryParam+=`${k}=${dataObj[k]}`;
		});
		return queryParam;
	}
	/**
	 * @param url
	 * @param headers
	 * @return Promise
	 */
	get = (url,data, headers) => {
		let mainHeader = {
			'Accept-Encoding': 'gzip'
		}
		let getUrl = url+'?'+this.deserializeObjectAsQueryParam(data);
		return new Promise((resolve, reject) => {
			let options = {
				headers : mainHeader,
			};
			fetch(getUrl, options)
			.then((response)=> response)
			.then((resp)=> {
				resolve(resp.json(), resp.headers);
			})
			.catch((error) => reject(error));
		});	
	}
		
}