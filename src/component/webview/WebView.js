/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'

export default class WebView extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <webview
        src={this.props.src}
        autosize={'on'}
        useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        plugins={'true'}
      />
    )
  }
}
