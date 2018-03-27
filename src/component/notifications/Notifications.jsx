import React from 'react'
import notifier from 'node-notifier'
import path from 'path'
import { version } from '../../../version'

let WindowsToaster = notifier.WindowsToaster

export default class Notifications {

	static win () {
		const notify = new WindowsToaster({
			withFallback: true,
			customPath: void 0
		})

		notify.notify({
			title: 'UNAN Desktop App',
			message: 'Hola, Tienes una nueva Actualización',
			icon: path.join(__dirname, '../../assets/img/logo.ico'),
			sound: true,
			wait: true,
			id: 1,
			timeout: 5,
			sticky: true
		},
			function (error, response) {
				console.log(response, error)
		})
	}

	static macOS () {
		new Notification('UNAN Desktop App', {
			body: 'Hola, Tienes una nueva Actualización',
			hasReply: true
		})
	}

	static linux () {
		new Notification('UNAN Desktop App', {
			body: 'Hola, Tienes una nueva Actualización',
			icon: path.join(__dirname, '../../assets/img/logo.ico'),
			hasReply: true
		})
	}

	static notify () {
		if (process.platform === 'win32') {
			this.win()
		}
		else if (process.platform === 'darwin') {
			this.macOS()
		}
		else {
			this.linux()
		}
	}

}