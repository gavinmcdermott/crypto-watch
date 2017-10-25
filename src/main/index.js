import path from 'path'
import { app, BrowserWindow, clipboard, globalShortcut } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import { log, logError } from '../common/debug'
import { startClipboardWatch, stopClipboardWatch } from './clipboard-watch'



// this has some effect on it being used??
// this has some effect on it being used??
// this has some effect on it being used??
console.log(typeof globalShortcut.unregisterAll)
// this has some effect on it being used??
// this has some effect on it being used??
// this has some effect on it being used??



const IS_DEV_MODE = process.execPath.match(/[\\/]electron/)
const INDEX_HTML_PATH = `file://${path.resolve(__dirname, '../index.html')}`

if (IS_DEV_MODE) enableLiveReload()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Some description
let isQuittingApp = false

const createWindow = async () => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  })

  // load the index.html of the app
  mainWindow.loadURL(INDEX_HTML_PATH)

  // Open the DevTools
  if (IS_DEV_MODE) {
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    log('app window created')
    startClipboardWatch(mainWindow)
  })

  // fires before 'closed' event,
  // checks if the user wants to quit the app or just close it
  mainWindow.on('close', (event) => {
    // the user is quitting the entire app
    // the user only tried to close the window, not quit the app
    if (!isQuittingApp) {
      log('app window closed (app is still running in background)')
      event.preventDefault()
      mainWindow.hide()
    }
  })

  // Emitted when the app is quit, not when it is just closed
  mainWindow.on('closed', () => {
    log('app window released from memory')
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  log('app started')
  createWindow()
})

app.on('quit', () => {
  globalShortcut.unregisterAll()
  stopClipboardWatch()
  clipboard.clear()
  log('app quit')
})

// 'activate' is emitted when the user clicks the Dock icon (OS X)
app.on('activate', () => {
  log('app activating')
  // OS X: re-create a window in the app when the dock icon is clicked
  // and the window is not open
  if (!mainWindow.isVisible()) {
    createWindow()
  }
})

// 'before-quit' is emitted when Electron receives the signal to exit and wants
// to start closing windows
app.on('before-quit', () => isQuittingApp = true)







// console.log('mainWindow.isVisible()', mainWindow.isVisible())
// console.log('mainWindow.isMinimized()', mainWindow.isMinimized())