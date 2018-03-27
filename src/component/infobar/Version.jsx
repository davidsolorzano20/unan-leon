/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import ServerApi from '../../api/server/ServerApi'

export default class Version extends Component {
  constructor () {
    super()
    this._update = this._update.bind(this)
  }

  _update () {
    ServerApi.UpdateOnlineApp()
  }

  render () {
    return (
      <span className="info-bar info-bar--warning info-bar--bottom">
        <div className="info-bar__content">
          <span className={'offline'}>
            <i className={'fal fa-info-circle fal-lg info'}/>
            Hay una nueva versi&oacute;n de UNAN Desktop App.
            <span className={'btn-download'} onClick={this._update}>
               Actualizar <i className="fal fa-cloud-download"/>
            </span>
          </span>
        </div>
      </span>
    )
  }
}