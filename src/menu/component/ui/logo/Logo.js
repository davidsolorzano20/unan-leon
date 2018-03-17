import React, { Component } from 'react'
import { Link } from "react-router";

export default class Logo extends Component {
	render () {
		return (
			<Link to={'/website/http@!www.unanleon.edu.ni'}>
				<img src={'./assets/img/logo.png'}/>
			</Link>
		)
	}
}
