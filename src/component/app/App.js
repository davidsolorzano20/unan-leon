import React, { Component } from 'react'
import Internet from '../infobar/Internet'
import GroupOne from '../ui/links/group-one/GroupOne'
import GroupTwo from '../ui/links/group-two/GroupTwo'
import Title from '../ui/title/Title'
import Logo from '../ui/logo/Logo'
import Slogan from '../ui/slogan/Slogan'
import Version from '../infobar/Version'
import { version } from '../../../package.json'
import ServerApi from '../../api/server/ServerApi'
import localStorage from 'mobx-localstorage'

export default class App extends Component {
	constructor () {
		super()
		this.state = {
			version: ''
		}
	}

	componentDidMount () {
		ServerApi.Version();
		if (version === localStorage.getItem('version')) {
			this.setState({
				version: localStorage.getItem('version')
			})
		}
	}

	render () {
		return (
			<div>
				<div className={'navigate-toolbar'}>
					<Internet/>
					{this.state.version && <Version/>}
				</div>
				<div className="flex-center position-ref full-height">
					<div className="content">
						<Logo/>
						<Title/>
						<GroupOne/>
						<GroupTwo/>
					</div>
					<Slogan/>
				</div>
			</div>
		)
	}
}
