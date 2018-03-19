/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import ServerApi from '../../api/server/ServerApi'
import { Link } from 'react-router'

export default class Package extends Component {
  constructor () {
    super()
    this._package = this._package.bind(this)
  }

  _package () {
    ServerApi.NewPackageVersion()
  }

  render () {
    return (
      <span className="info-bar info-bar--danger info-bar--bottom">
        <div className="info-bar__content">
          <a href={"https://github.com/davidsolorzano20/unan-leon/releases"} target={'_blank'} className={'offline'}>
            <i className={'fal fa-info-circle fal-lg info'}/>
            UNAN-Le&oacute;n Desktop App necesita volverse a descargar, Paquetes Obsoletos.
            <span className={'btn-download'} onClick={this._package}>
              Descargar
              <i className="fal fa-cloud-download"/>
            </span>
          </a>
        </div>
      </span>
    )
  }
}