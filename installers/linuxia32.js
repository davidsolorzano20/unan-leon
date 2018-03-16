const installer = require('electron-installer-debian')

const options = {
	src: 'Application/UNAN-León-Application-linux-32/',
	dest: 'Application/installers/',
	arch: 'ia32'
}

console.log('Creating package (this may take a while)')

installer(options)
	.then(() => console.log(`Successfully created package at ${options.dest}`))
	.catch(err => {
		console.error(err, err.stack)
		process.exit(1)
	})
