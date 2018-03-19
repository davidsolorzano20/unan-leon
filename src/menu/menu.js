import { remote } from 'electron'

const app = remote.app
const Menu = remote.Menu
const shell = remote.shell
const BrowserWindow = remote.BrowserWindow

const appName = app.getName()
let tpl

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
					remote.getCurrentWindow().loadURL("http://www.unanleon.edu.ni")
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
					location.href = "#/website/https@!matricula.unanleon.edu.ni"
				}
			},
			{
				label: 'Inscripción de Componentes',
				accelerator: 'CmdOrCtrl+2',
				click: function () {
					location.href = "#/website/https@!inscripcioncomponentes.unanleon.edu.ni"
				}
			},
			{
				label: 'Computación Aula Virtual',
				accelerator: 'CmdOrCtrl+3',
				click: function () {
					location.href = "#/website/http@!www.comp.unanleon.edu.ni-aula"
				}
			},
			{
				label: 'Aula Virtual',
				accelerator: 'CmdOrCtrl+4',
				click: function () {
					location.href = "#/website/https@!aulavirtual.unanleon.edu.ni"
				}
			},
			{
				label: 'Solicitud de Becas',
				accelerator: 'CmdOrCtrl+5',
				click: function () {
					location.href = "#/website/https@!solicitudbeca.unanleon.edu.ni"
				}
			},
			{
				label: 'Consulta de Notas',
				accelerator: 'CmdOrCtrl+6',
				click: function () {
					location.href = "#/website/https@!portalestudiantes.unanleon.edu.ni-consulta_estudiantes.php"
				}
			},
			{
				label: 'Horarios',
				accelerator: 'CmdOrCtrl+7',
				click: function () {
					location.href = "#/website/https@!portalestudiantes.unanleon.edu.ni-horarios"
				}
			},
			{
				label: 'Correo Estudiantil',
				accelerator: 'CmdOrCtrl+8',
				click: function () {
					location.href = "#/website/https@!outlook.office.com"
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Recargar',
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


const helpSubmenu = [
	{
		label: 'Reportar un problema',
		click: function () {
			shell.openExternal('https://www.facebook.com/david.paredes25')
		}
	},
	{
		label: 'Facebook del Desarrollador',
		click: function () {
			shell.openExternal('https://www.facebook.com/david.paredes25')
		}
	},
	{
		label: 'Twitter del Desarrollador',
		click: function () {
			shell.openExternal('https://www.twitter.com/luisnic21')
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

tpl[tpl.length - 1].submenu = helpSubmenu
export const menu = Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));
