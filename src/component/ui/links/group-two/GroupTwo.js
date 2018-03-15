import React, { Component } from 'react'
import { Link } from "react-router";

export default class GroupTwo extends Component {
	render () {
		return (
			<div className="links2">
				<Link to={'/website/https@!solicitudbeca.unanleon.edu.ni'}>Solicitud de Becas</Link>
				<Link to={'/website/https@!portalestudiantes.unanleon.edu.ni-consulta_estudiantes.php'}>Consulta de Notas</Link>
				<Link to={'/website/https@!portalestudiantes.unanleon.edu.ni-horarios'}>Horarios</Link>
				<Link to={'/website/https@!outlook.office.com'}>Correo Estudiantil</Link>
				<Link to={'/website/http@!www.unanleon.edu.ni'} className={'hidden'}>Unan Leon</Link>
			</div>
		)
	}
}
