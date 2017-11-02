import path from 'path'
import { app, BrowserWindow, clipboard, ipcMain } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import { log, logError } from '../common/debug'
import { EVENT_TYPES } from './constants/events'
import keyboard from './keyboard'

const IS_DEV_MODE = process.execPath.match(/[\\/]electron/)
const INDEX_HTML_PATH = `file://${path.resolve(__dirname, '../index.html')}`

if (IS_DEV_MODE) enableLiveReload()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Some description
let willQuitApp = false

// Pending notification functions for the main window if the main process needs
// to communicate with the window before the window exists
const mainWindowNotifyFuncs = new Set()

// Iterates through and calls pending main windown notification funcs
const sendMainWindowNotifications = () => {
  for (let notifyFn of mainWindowNotifyFuncs) {
    notifyFn()
    mainWindowNotifyFuncs.delete(notifyFn)
  }
}

// Main Window visibility utilities
const appIsOpenAndNotFocused = () => {
  return mainWindow && mainWindow.isVisible() && !mainWindow.isFocused()
}

// window is minimized down into the dock on a mac (not closed though)
const appIsMinimized = () => mainWindow && mainWindow.isMinimized()

const appHasWindow = () => appIsOpenAndNotFocused() || appIsMinimized()

// window is closed, but main process (the app) is still running
const appNeedsWindow = () => {
  // return mainWindow && !mainWindow.isVisible() && !mainWindow.isMinimized()
  return !mainWindow
}

// Main Window creation
const createWindow = async () => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
  })

  mainWindow.on('show', () => {
    sendMainWindowNotifications()
    log('app window shown')
  })

  // fires before 'closed' event,
  // checks if the user wants to quit the app or just close it
  mainWindow.on('close', (event) => {
    // the user is quitting the entire app
    // the user only tried to close the window, not quit the app
    if (!willQuitApp) {
      event.preventDefault()
      mainWindow.hide()
      log('app window closed (app is still running in background)')
    }
  })

  // Emitted when the app is quit, not when it is just closed
  mainWindow.on('closed', () => {
    mainWindow = null
    log('app window released from memory')
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow()
  keyboard.copy.startWatch()
  log('app started')
})

app.on('quit', () => {
  keyboard.unlock()
  keyboard.copy.stopWatch()
  log('app quit')
})

// TODO: log close and minimize events from the window!

// 'activate' is emitted when the user clicks the Dock icon (OS X)
app.on('activate', () => {
  log('app activating')

  // OS X: re-create a window in the app when the dock icon is clicked
  // and the window is not open
  if (appNeedsWindow()) {
    createWindow()
  } else {
    log('app window already created and active')
  }
})

// 'before-quit' is emitted when Electron receives the signal to exit and wants
// to start closing windows
app.on('before-quit', () => willQuitApp = true)


// ABSRTACT OUT EVENTS
ipcMain.on(EVENT_TYPES.NOTIFICATION_CLICKED, (opts) => {
  if (opts.notifyMainWindow) {
    const notifyFunc = () => mainWindow.webContents.send('test', opts)
    mainWindowNotifyFuncs.add(notifyFunc)
  }

  if (appNeedsWindow()) return createWindow()

  mainWindow.show()
  sendMainWindowNotifications()
})
