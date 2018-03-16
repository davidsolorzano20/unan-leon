const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const protocol = electron.protocol;
const shell = electron.shell;
const path = require('path');
const fs = require('fs');
const windowStateKeeper = require('electron-window-state');

let mainWindow;
let isQuitting = false;

if (handleSquirrelEvent(app)) {
	return;
}

function handleDeepLink (window, rawUrl) {
	const url = rawUrl.replace('unanleon://', '');
	if (!url) return;
	window.webContents.send('navigateFromDeepLink', {url});
}

const isSecondInstance = app.makeSingleInstance((argv) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();

		if (process.platform === 'win32') {
			const url = argv.slice(1);

			if (url) {
				handleDeepLink(mainWindow, url.toString());
			}
		}
	}
});

if (isSecondInstance) {
	console.log('An instance of UNAN-León is already running. Exiting...');
	app.exit();
}

function createWindow () {
	const mainWindowState = windowStateKeeper({
		defaultWidth: 1024,
		defaultHeight: 700,
	});

	mainWindow = new BrowserWindow({
		width: mainWindowState.width,
		height: mainWindowState.height,
		minwidth: 1024,
		minheight: 700,
		x: mainWindowState.x,
		y: mainWindowState.y,
		icon: process.platform === 'linux' && path.join(__dirname, 'assets/img/logo.png'),
		titleBarStyle: (process.platform === 'darwin' ? 'hidden-inset' : 'center'),
		backgroundColor: '#ffffff',
		autoHideMenuBar: (process.platform === 'darwin'),
	});

	mainWindow.on('close', function (e) {
		if (process.platform === 'darwin' && !isQuitting) {
			e.preventDefault();
			mainWindow.hide();
		}
		else {
			app.quit();
		}
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`)
//	mainWindow.webContents.openDevTools();

	mainWindow.webContents.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});

	if (process.platform !== 'darwin') {
		mainWindow.isMaximized();
	}

	mainWindowState.manage(mainWindow);
	return mainWindow;
}

app.on('ready', function () {
	locale = app.getLocale();
	mainWindow = createWindow();

	switch (locale) {
		case 'es':
			Menu.setApplicationMenu(require('./menu/es'));
			break

		default:
			Menu.setApplicationMenu(require('./menu/es'));
	}
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	} else {
		mainWindow.show();
	}
});

app.on('before-quit', function () {
	isQuitting = true
});

function handleSquirrelEvent (application) {
	if (process.argv.length === 1) {
		return false
	}

	const ChildProcess = require('child_process')
	const path = require('path')

	const appFolder = path.resolve(process.execPath, '..')
	const rootAtomFolder = path.resolve(appFolder, '..')
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
	const exeName = path.basename(process.execPath)

	const spawn = function (command, args) {
		let spawnedProcess, error

		try {
			spawnedProcess = ChildProcess.spawn(command, args, {
				detached: true
			})
		} catch (error) {}

		return spawnedProcess
	}

	const spawnUpdate = function (args) {
		return spawn(updateDotExe, args)
	}

	const squirrelEvent = process.argv[1]
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':

			spawnUpdate(['--createShortcut', exeName])

			setTimeout(application.quit, 1000)
			return true

		case '--squirrel-uninstall':
			spawnUpdate(['--removeShortcut', exeName])

			setTimeout(application.quit, 1000)
			return true

		case '--squirrel-obsolete':

			application.quit()
			return true
	}
}
