/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import WebView from '../webview/WebView'
import Internet from '../infobar/Internet'

export default class Websites extends Component {
	constructor () {
		super()
		this._back = this._back.bind(this)
		this._next = this._next.bind(this)
	}

	_back() {
		const webview = document.querySelector('webview')
		webview.goBack()
	}

	_next() {
		const webview = document.querySelector('webview')
		webview.goForward()

	}

  render () {
    const str = this.props.params.url
    const resp = str.replace('-', '/')
    const decode = resp.replace('!', '//')
    const url = decode.replace('@', ':')
    return (
      <span>
        <Internet/>
				<WebView
					src={url}/>

				<a className={'arrow-left'}><i className={'fal fa-arrow-left fa-lg'} onClick={this._back}/></a>
				<a className={'arrow-right'}><i className={'fal fa-arrow-right fa-lg'} onClick={this._next}/></a>
      </span>
    )
  }
}
