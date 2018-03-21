/**
 * By Luis Solorzano
 */

import React from 'react'
import { remote } from 'electron'
import * as firebase from 'firebase'
import tar from 'tar'
import _fs from 'fs'
import fs from 'fs-extra'
import path from 'path'
import swal from 'sweetalert'
import localStorage from 'mobx-localstorage'
import { SERVER_URL, VERSION_API } from '../../config/config'
import Notifications from '../../component/notifications/Notifications'
import { version} from '../../../version.json'

const fetch = remote.require('electron-fetch')

let UpdateDirectory
let packageRemove
let local
let online
let archivePath
let packages
let versionApp

export default class ServerApi {

	static Version () {
		const db = firebase.database()
		const version_app = db.ref().child('version')
		version_app.on('value', snap => {
			if (version !== snap.val()) {
				if (process.platform === 'win32') {
					Notifications.win()
				}
				else if (process.platform === 'darwin') {
					Notifications.macOS()
				}
				else {
					Notifications.linux()
				}

				localStorage.setItem('version', snap.val())
				versionApp = snap.val()
			}
		})
	}

	static NewPackageVersion () {
		const db = firebase.database()
		const package_app = db.ref().child('package')
		package_app.on('value', snap => {
			localStorage.setItem('package', snap.val())
		})
	}

	static UpdateOnlineApp () {
		swal({
			title: 'Actualizando...',
			text: '',
			icon: 'error',
			button: false
		})
		try {

			local = path.join(__dirname, '../../../', 'version')
			online = path.join(__dirname, '../../../../')

			if (_fs.existsSync(local)) {
				UpdateDirectory = local
			} else {
				UpdateDirectory = online
			}

			archivePath = path.join(UpdateDirectory, 'version.tar.gz')
			packageRemove = path.join(UpdateDirectory, 'version.json')
			packages = path.join(UpdateDirectory, versionApp, 'version.json')
			fs.ensureDirSync(UpdateDirectory)

			fetch(`${SERVER_URL}/${VERSION_API}/download/${versionApp}`, this.Request({
				method: 'GET',
			}))
				.then(res => res.buffer())
				.then(function (buffer) {
					fs.writeFileSync(archivePath, buffer)
					console.debug('Update downloaded')

					tar.x({
						file: archivePath,
						cwd: UpdateDirectory,
						preservePaths: true,
						unlink: true,
						preserveOwner: false,
						onwarn: x => console.log('warn', versionApp, x),
					})

					fs.remove(path.join(UpdateDirectory, 'version.tar.gz'))
					if (_fs.existsSync(packageRemove)) {
						fs.remove(packageRemove)
					}

					swal({
						title: 'Buen Trabajo!',
						text: 'La Aplicación ha sido actualizada!',
						icon: 'success',
						button: 'Reiniciar Aplicación',
					}).then(() => {
						if (_fs.existsSync(packages)) {
							fs.copy(packages, packageRemove)
								.then(() => {
									remote.app.relaunch()
									remote.app.exit(0)
								})
								.catch(err => console.error(err))
						}
					})
				})
		} catch (err) {
			console.error(err)
		}
	}

	static Request (options) {
		const request = Object.assign(options, {
			mode: 'cors',
			headers: Object.assign({
				'Content-Type': 'application/json',
				'X-UNAN-Source': 'desktop',
				'X-UNAN-platform': process.platform,
				'X-UNAN-Timezone-Offset': new Date().getTimezoneOffset(),
			}, options.headers),
		})

		return request
	}

}
