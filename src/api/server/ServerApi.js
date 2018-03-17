import React from 'react';
import { remote } from 'electron';
import * as firebase from 'firebase';
import tar from 'tar';
import fs from 'fs-extra';
import path from 'path';
import { sleep } from '../../lib/async-helpers'
import localStorage from 'mobx-localstorage';
const { app } = remote;
const fetch = remote.require('electron-fetch');

let os;

export default class ServerApi {

	static Version() {
		const db = firebase.database()
		const version_app = db.ref().child('version');
		version_app.on('value', snap => {
			localStorage.setItem('version', snap.val());
		});
	}

	static UpdateApp () {
		try {
			const UpdateDirectory = path.join(app.getPath('userData'), 'version');
			const UpdateTempDirectory = path.join(UpdateDirectory, 'temp');
			const archivePath = path.join(UpdateTempDirectory, 'versionapp.tar.gz');
			fs.ensureDirSync(UpdateTempDirectory);

			fetch("https://github.com/davidsolorzano20/unan-leon/releases/download/v1.1.0/src.tar.gz")
				.then(res => res.buffer())
				.then(function (buffer) {
					fs.writeFileSync(archivePath, buffer)
					console.debug('Update downloaded');

					tar.x({
						file: archivePath,
						cwd: UpdateTempDirectory,
						preservePaths: true,
						unlink: true,
						preserveOwner: false,
						onwarn: x => console.log('warn', 'src', x),
					});

					const newVersion = path.join(UpdateDirectory, "src");
					fs.copySync(UpdateTempDirectory, newVersion);
					//fs.remove(UpdateTempDirectory);
					//fs.remove(path.join(UpdateDirectory, 'version.tar.gz'));
					alert("Success")
				});
		} catch (err) {
			console.error(err);
			return false;
		}
	}

}
