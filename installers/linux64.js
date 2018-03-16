const installer = require('electron-installer-debian')

const options = {
	src: 'Application/UNAN-León-Application-linux-x64/',
	dest: 'Application/installers/',
	arch: 'amd64'
}

console.log('Creating package (this may take a while)')

installer(options)
	.then(() => console.log(`Successfully created package at ${options.dest}`))
	.catch(err => {
		console.error(err, err.stack)
		process.exit(1)
	})
