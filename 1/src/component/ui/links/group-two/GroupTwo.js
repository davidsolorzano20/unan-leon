/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import { Link } from 'react-router'

export default class GroupTwo extends Component {
  render () {
    return (
      <div className={'group-two'}>
        <Link to={'/website/https@!solicitudbeca.unanleon.edu.ni'}><i className={'fal fa-sun'}/> Solicitud de Becas</Link>
        <Link to={'/website/https@!portalestudiantes.unanleon.edu.ni-consulta_estudiantes.php'}><i className={'fal fa-sun'}/> Consulta de Notas</Link>
        <Link to={'/website/https@!portalestudiantes.unanleon.edu.ni-horarios'}><i className={'fal fa-sun'}/> Horarios</Link>
        <Link to={'/website/https@!outlook.office.com'}><i className={'fal fa-sun'}/> Correo Estudiantil</Link>
        <Link to={'/website/http@!www.unanleon.edu.ni'} className={'hidden'}><i className={'fal fa-sun'}/> Unan Le&oacute;n</Link>
      </div>
    )
  }
}
