/**
 * By Luis Solorzano
 */

import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Internet from '../infobar/Internet'
import GroupOne from '../ui/links/group-one/GroupOne'
import GroupTwo from '../ui/links/group-two/GroupTwo'
import Title from '../ui/title/Title'
import Logo from '../ui/logo/Logo'
import Slogan from '../ui/slogan/Slogan'
import Version from '../infobar/Version'
import { version, packages } from '../../../version.json'
import ServerApi from '../../api/server/ServerApi'
import localStorage from 'mobx-localstorage'
import Package from '../infobar/Package'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import Notifications from '../notifications/Notifications'
const NotificationCenter = require('node-notifier').NotificationCenter;

let remove

export default class App extends Component {
	constructor () {
		super()
		this.state = {
			version: '',
			packages: ''
		}
		ReactGA.initialize('UA-114998845')
		ReactGA.pageview(window.location.pathname + window.location.search)
	}

	componentDidMount () {
		const version_after = (localStorage.getItem('version') - 1)
		remove = path.join(__dirname, '../../../../' + version_after)
		if (fs.existsSync(remove)) {
			fse.remove(remove)
		}

		ServerApi.Version()
		ServerApi.NewPackageVersion()

		if (version !== localStorage.getItem('version')) {
			this.setState({
				version: localStorage.getItem('version')
			})

			Notifications.notify()
		}

		if (packages !== localStorage.getItem('package')) {
			this.setState({
				packages: localStorage.getItem('package')
			})
		}
	}

	render () {
		return (
			<div>
				<div className={'navigate-toolbar'}>
					<Internet/>
					{this.state.version && <Version/>}{this.state.packages && <Package/>}
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
