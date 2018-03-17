import React, { Component } from 'react'
import { Link } from "react-router";

export default class GroupOne extends Component {
	render () {
		return (
			<div className="group-one">
				<Link to={'/website/https@!matricula.unanleon.edu.ni'}>Matricula en Linea</Link>
				<Link to={'/website/https@!inscripcioncomponentes.unanleon.edu.ni'}>Inscripci&oacute;n de Componentes</Link>
				<Link to={'/website/http@!www.comp.unanleon.edu.ni-aula'}>Aula Virtual de Computaci&oacute;n</Link>
				<Link to={'/website/https@!aulavirtual.unanleon.edu.ni'}>Aula Virtual UNAN</Link>
			</div>
		)
	}
}
