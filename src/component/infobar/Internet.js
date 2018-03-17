import React, { Component } from 'react'
import { Offline } from 'react-detect-offline'

export default class Internet extends Component {

  render () {
    return (
      <Offline>
				<span className="info-bar info-bar--danger info-bar--bottom">
					<div className="info-bar__content">
            <i className='fal fa-location-arrow info'/>
            <span className={'offline'}>No estás conectado a internet.</span>
          </div>
        </span>
      </Offline>
    )
  }
}