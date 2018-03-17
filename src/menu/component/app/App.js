import React, { Component } from 'react'
import Internet from '../infobar/Internet'
import GroupOne from '../ui/links/group-one/GroupOne'
import GroupTwo from '../ui/links/group-two/GroupTwo'
import Title from '../ui/title/Title'
import Logo from '../ui/logo/Logo'
import Slogan from '../ui/slogan/Slogan'
import * as firebase from 'firebase'
import Version from '../infobar/Version'
import { version } from '../../../package.json'
import ServerApi from '../../api/server/ServerApi'

export default class App extends Component {
	constructor () {
		super()

		this.state = {
			version: ''
		}
	}

	componentDidMount () {
		/*const db = firebase.database()
		const version_app = db.ref().child('version');*/

		//version_app.on('value', snap => {
		if (version !== ServerApi.Version()) {
			this.setState({
				version: ServerApi.Version()
			})
		}
		//	})
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
