import React, { Component } from 'react'
import Internet from '../infobar/Internet'
import GroupOne from '../ui/links/group-one/GroupOne'
import GroupTwo from '../ui/links/group-two/GroupTwo'
import Title from '../ui/title/Title'
import Logo from '../ui/logo/Logo'
import Slogan from '../ui/slogan/Slogan'

export default class App extends Component {
  render () {
    return (
			<div className="flex-center position-ref full-height">
				<Internet/>
				<div className="content">
					<Logo/>
					<Title/>
					<GroupOne/>
					<GroupTwo/>
				</div>
				<Slogan/>
			</div>
    );
  }
}
