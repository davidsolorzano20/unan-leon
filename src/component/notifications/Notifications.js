import React from 'react'
import appId, { ToastNotification } from 'electron-windows-notifications'
import { version } from '../../../version'

let notify

export default class Notifications {

	static win () {
		notify = new ToastNotification({
			appId: appId,
			template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
			strings: ['Hi!']
		})

		//notify.on('activated', () => console.log('Activated!'))
		//notify.show()
	}

	static macOS () {
		new Notification('UNAN Desktop App', {
			body: 'Tienes una nueva Actualizacion',
			hasReply: true
		})
	}

	static linux () {
		new Notification('UNAN Desktop App', {
			body: 'Tienes una nueva Actualizacion',
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