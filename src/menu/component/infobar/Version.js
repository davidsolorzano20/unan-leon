import React, { Component } from 'react'

export default class Version extends Component {

	render () {
		return (
			<span className="info-bar info-bar--warning info-bar--bottom">
				<div className="info-bar__content">
					<span className={'offline'}>Hay una nueva versi&oacute;n de UNAN-Le&oacute;n Desktop App.
						<span className={'btn-download'}>Descargar <i className="fal fa-cloud-download"/></span>
					</span>
				</div>
			</span>
		)
	}
}