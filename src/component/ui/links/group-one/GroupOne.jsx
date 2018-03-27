/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import { Link } from 'react-router'

export default class GroupOne extends Component {
  render () {
    return (
      <div className={'group-one'}>
        <Link to={'/website/https@!matricula.unanleon.edu.ni'}><i className={'fal fa-sun'}/> Matr&iacute;cula en L&iacute;nea</Link>
        <Link to={'/website/https@!inscripcioncomponentes.unanleon.edu.ni'}><i className={'fal fa-sun'}/> Inscripci&oacute;n de Componentes</Link>
        <Link to={'/website/http@!www.comp.unanleon.edu.ni-aula'}><i className={'fal fa-sun'}/> Aula Virtual de Computaci&oacute;n</Link>
        <Link to={'/website/https@!aulavirtual.unanleon.edu.ni'}><i className={'fal fa-sun'}/> Aula Virtual UNAN</Link>
      </div>
    )
  }
}
