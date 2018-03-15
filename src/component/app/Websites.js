import React, { Component } from 'react'
import WebView from '../webview/WebView'
import Internet from '../infobar/Internet'


export default class Websites extends Component {

	render () {
		const str = this.props.params.url;
		const  resp = str.replace("-", "/");
		const  decode = resp.replace("!", "//");
		const  url = decode.replace("@", ":");
		return (
			<span>
				<Internet/>
				<WebView src={url}/>
			</span>
		)
	}
}
