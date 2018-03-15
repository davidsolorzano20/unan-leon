'use strict'
const app = require('electron').app;
const shell = require('electron').shell;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;
const os = require('os')

const appName = app.getName();
let tpl;

function sendAction (action) {
	const win = BrowserWindow.getAllWindows()[0];
	if (process.platform === 'darwin') {
		win.restore();
	}
	win.webContents.send(action);
}

const darwinTpl = [
	{
		label: appName,
		submenu: [
			{
				label: `Acerca de ${appName}`,
				role: 'about',
			},
			{
				type: 'separator'
			},
			{
				label: 'Servicios',
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: `Ocultar ${appName}`,
				accelerator: 'Cmd+H',
				role: 'hide'
			},
			{
				type: 'separator'
			},
			{
				label: `Salir de ${appName}`,
				accelerator: 'Cmd+Q',
				click: function () {
					app.quit()
				}
			}
		]
	},
	{
		label: 'Archivo',
		submenu: [
			{
				label: 'Pagina UNAN-León',
				accelerator: 'CmdOrCtrl+U',
				click: function () {
					sendAction('unanleon')
				}
			}
		]
	},
	{
		label: 'Editar',
		submenu: [
			{
				label: 'Deshacer',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
			},
			{
				label: 'Rehacer',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cortar',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
			},
			{
				label: 'Copiar',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			},
			{
				label: 'Pegar',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			},
			{
				label: 'Selecionar todo',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectall'
			}
		]
	},
	{
		label: 'Ver',
		submenu: [
			{
				label: 'Matricula en Linea',
				accelerator: 'CmdOrCtrl+1',
				click: function () {
					sendAction('matricula');
				}
			},
			{
				label: 'Inscripción de Componentes',
				accelerator: 'CmdOrCtrl+2',
				click: function () {
					sendAction('componentes')
				}
			},
			{
				label: 'Computación Aula Virtual',
				accelerator: 'CmdOrCtrl+3',
				click: function () {
					sendAction('compv')
				}
			},
			{
				label: 'Aula Virtual',
				accelerator: 'CmdOrCtrl+4',
				click: function () {
					sendAction('aulavirtual')
				}
			},
			{
				label: 'Solicitud de Becas',
				accelerator: 'CmdOrCtrl+5',
				click: function () {
					sendAction('becas')
				}
			},
			{
				label: 'Consulta de Notas',
				accelerator: 'CmdOrCtrl+6',
				click: function () {
					sendAction('notas')
				}
			},
			{
				label: 'Horarios',
				accelerator: 'CmdOrCtrl+7',
				click: function () {
					sendAction('horarios')
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0]
					win.webContents.reload()
				}
			}
		]
	},
	{
		label: 'Ventana',
		role: 'window',
		submenu: [
			{
				label: 'Minimizar',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Cerrar',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
			{
				type: 'separator'
			},
			{
				label: 'Pantalla Completa',
				accelerator: 'Ctrl+Cmd+F',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0]
					win.setFullScreen(!win.isFullScreen())
				}
			}
		]
	},
	{
		label: 'Ayuda',
		role: 'help'
	}]

// Template for Linux/Windows
const linuxTpl = [
	{
		label: 'Archivo',
		submenu: [
			{
				label: 'Pagina UNAN-Leon',
				accelerator: 'CmdOrCtrl+U',
				click: function () {
					sendAction('unanleon')
				}
			}
		]
	},
	{
		label: 'Editar',
		submenu: [
			{
				label: 'Deshacer',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
			},
			{
				label: 'Rehacer',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cortar',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
			},
			{
				label: 'Copiar',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			},
			{
				label: 'Pegar',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			},
			{
				label: 'Selecionar todo',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectall'
			}
		]
	},
	{
		label: 'Ver',
		submenu: [
			{
				label: 'Matricula en Linea',
				accelerator: 'CmdOrCtrl+1',
				click: function () {
					sendAction('matricula');
				}
			},
			{
				label: 'Inscripción de Componentes',
				accelerator: 'CmdOrCtrl+2',
				click: function () {
					sendAction('componentes')
				}
			},
			{
				label: 'Computación Aula Virtual',
				accelerator: 'CmdOrCtrl+3',
				click: function () {
					sendAction('compv')
				}
			},
			{
				label: 'Aula Virtual',
				accelerator: 'CmdOrCtrl+4',
				click: function () {
					sendAction('aulavirtual')
				}
			},
			{
				label: 'Solicitud de Becas',
				accelerator: 'CmdOrCtrl+5',
				click: function () {
					sendAction('becas')
				}
			},
			{
				label: 'Consulta de Notas',
				accelerator: 'CmdOrCtrl+6',
				click: function () {
					sendAction('notas')
				}
			},
			{
				label: 'Horarios',
				accelerator: 'CmdOrCtrl+7',
				click: function () {
					sendAction('horarios')
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0]
					win.webContents.reload()
				}
			}
		]
	},
	{
		label: 'Ventana',
		role: 'window',
		submenu: [
			{
				label: 'Minimizar',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Cerrar',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
			{
				type: 'separator'
			},
			{
				label: 'Pantalla Completa',
				accelerator: 'Ctrl+Cmd+F',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0]
					win.setFullScreen(!win.isFullScreen())
				}
			}
		]
	},
	{
		label: 'Ayuda',
		role: 'help'
	}];

const helpSubmenu = [
	/*{
		label: `${appName} Website …`,
		click: function () {
			shell.openExternal('https://github.com/nurtext/active-collab-desktop');
		}
	},*/
	{
		label: 'Reportar un problema',
		click: function () {
			shell.openExternal('https://www.facebook.com/david.paredes25');
		}
	},
	{
		label: 'Facebook del Desarrollador',
		click: function () {
			shell.openExternal('https://www.facebook.com/david.paredes25');
		}
	},
	{
		label: 'Twitter del Desarrollador',
		click: function () {
			shell.openExternal('https://www.twitter.com/luisnic21');
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Dev. Luis Solórzano'
	}]

if (process.platform == 'darwin') {
	tpl = darwinTpl
}
else {
	tpl = linuxTpl
}

tpl[tpl.length - 1].submenu = helpSubmenu;
module.exports = Menu.buildFromTemplate(tpl);
