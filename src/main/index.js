import path from 'path'
import { app, BrowserWindow, clipboard, ipcMain, webContents } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import { log, logError } from '../common/debug'
import { EVENT_TYPES } from '../constants/events'
import keyboard from './keyboard'
import initEventListeners from './events'

const IS_DEV_MODE = process.execPath.match(/[\\/]electron/)
const INDEX_HTML_PATH = `file://${path.resolve(__dirname, '../index.html')}`

if (IS_DEV_MODE) enableLiveReload()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

// Some description
let willQuitApp = false

// Main Window creation
const createWindow = async () => {
  // Create the browser window
  // mainWindow = new BrowserWindow({
  //   width: 1200,
  //   height: 640,
  //   show: false,
  // })
  mainWindow = new BrowserWindow({
    x: 10,
    y: 32,
    width: 318,
    height: 640,
    // frame: false,
    show: false,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    title: 'CoPilot',
    resizable: false,
  })

  // load the index.html of the app
  mainWindow.loadURL(INDEX_HTML_PATH)

  // Open the DevTools
  if (IS_DEV_MODE) {
    // await installExtension(VUEJS_DEVTOOLS)
    // mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    initEventListeners(mainWindow, createWindow)
    log('app window created')
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

// TODO: log close and minimize events from the window!

// 'activate' is emitted when the user clicks the Dock icon (OS X)
app.on('activate', () => {
  log('app activating')
  const appNeedsWindow = mainWindow
    && !mainWindow.isVisible()
    && !mainWindow.isMinimized()

  // OS X: re-create a window in the app when the dock icon is clicked
  // and the window is not open
  if (appNeedsWindow) {
    createWindow()
  }
})

// 'before-quit' is emitted when Electron receives the signal to exit and wants
// to start closing windows
app.on('before-quit', () => {
  willQuitApp = true
})

app.on('quit', () => {
  keyboard.unlock()
  keyboard.copy.stopWatch()
  log('app quit')
})
