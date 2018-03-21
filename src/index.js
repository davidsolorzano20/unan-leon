/**
 * By Luis Solorzano
 */

const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const shell = electron.shell
const path = require('path')
const fs = require('fs')
const version = require('../version/version')
const windowStateKeeper = require('electron-window-state')

let mainWindow
let isQuitting = false
let loader_app

function handleDeepLink (window, rawUrl) {
  const url = rawUrl.replace('unanleon://', '')
  if (!url) return
  window.webContents.send('navigateFromDeepLink', {url})
}

const isSecondInstance = app.makeSingleInstance((argv) => {
  if (mainWindow) {
    if (mainWindow.isMinimized())
      mainWindow.restore()
    mainWindow.focus()

    if (process.platform === 'win32') {
      const url = argv.slice(1)

      if (url) {
        handleDeepLink(mainWindow, url.toString())
      }
    }
  }
})

if (isSecondInstance) {
  console.log('An instance of UNAN-León is already running. Exiting...')
  app.exit()
}

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1240,
    defaultHeight: 700,
  })

  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    minwidth: 1024,
    minheight: 700,
    x: mainWindowState.x,
    y: mainWindowState.y,
    icon: process.platform === 'linux' && path.join(__dirname, 'assets/img/logo.png'),
    backgroundColor: '#ffffff',
  })

  mainWindow.on('close', function (e) {
    if (process.platform === 'darwin' && !isQuitting) {
      e.preventDefault()
      mainWindow.hide()
    }
    else {
      app.quit()
    }
  })

  loader_app = path.join(__dirname, '../', 'version/' + version.version + '/src')
  if (fs.existsSync(loader_app)) {
    console.log(loader_app)
    mainWindow.loadURL(`file://${loader_app}/index.html`)
  } else {
    console.log(version.version)
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  }

  mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  mainWindowState.manage(mainWindow)
  return mainWindow
}

app.on('ready', function () {
  mainWindow = createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.show()
  }
})

app.on('before-quit', function () {
  isQuitting = true
})

app.setAsDefaultProtocolClient('unanleon')
