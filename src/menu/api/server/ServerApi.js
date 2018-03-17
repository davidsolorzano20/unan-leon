import React from 'react';
import * as firebase from 'firebase';

export default class ServerApi {

	static Version() {
		let version = '1.1.0-alpha';
		const db = firebase.database()
		const version_app = db.ref().child('version');
		version_app.on('value', snap => {
			 version = snap.val();
		});

		return version;
	}

	/*static UpdateApp(recipeId) {
		try {
			const recipesDirectory = path.join(app.getPath('userData'), 'recipes');

			const recipeTempDirectory = path.join(recipesDirectory, 'temp', recipeId);
			const archivePath = path.join(recipeTempDirectory, 'recipe.tar.gz');
			const packageUrl = `${SERVER_URL}/${API_VERSION}/recipes/${recipeId}/recipe_download`;

			fs.ensureDirSync(recipeTempDirectory);
			const res = await fetch(packageUrl);
			console.debug('Recipe downloaded', recipeId);
			const buffer = await res.buffer();
			fs.writeFileSync(archivePath, buffer);

			await sleep(10);

			await tar.x({
				file: archivePath,
				cwd: recipeTempDirectory,
				preservePaths: true,
				unlink: true,
				preserveOwner: false,
				onwarn: x => console.log('warn', recipeId, x),
			});

			await sleep(10);

			const recipeDirectory = path.join(recipesDirectory, recipeId);
			fs.copySync(recipeTempDirectory+'/'+recipeId, recipeDirectory);
			fs.remove(recipeTempDirectory);
			fs.remove(path.join(recipesDirectory, recipeId, 'recipe.tar.gz'));

			return recipeId;
		} catch (err) {
			console.error(err);

			return false;
		}
	}*/

}
