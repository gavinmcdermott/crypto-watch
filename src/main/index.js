import path from 'path'
import { app, BrowserWindow, clipboard, globalShortcut, ipcMain } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import { log, logError } from '../common/debug'
import { startClipboardWatch, stopClipboardWatch } from './clipboard-watch'
import keyboard from './keyboard'

const IS_DEV_MODE = process.execPath.match(/[\\/]electron/)
const INDEX_HTML_PATH = `file://${path.resolve(__dirname, '../index.html')}`

if (IS_DEV_MODE) enableLiveReload()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Some description
let willQuitApp = false

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
    startClipboardWatch()
    log('app window created')
  })

  // fires before 'closed' event,
  // checks if the user wants to quit the app or just close it
  mainWindow.on('close', (event) => {
    // the user is quitting the entire app
    // the user only tried to close the window, not quit the app
    if (!willQuitApp) {
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


  keyboard.lock()



})

app.on('quit', () => {
  globalShortcut.unregisterAll()
  keyboard.unlock()
  stopClipboardWatch()
  clipboard.clear()
  log('app quit')
})

// TODO: log close and minimize events from the window!

// 'activate' is emitted when the user clicks the Dock icon (OS X)
app.on('activate', () => {
  log('app activating')
  const appNeedsNewWindow = !mainWindow.isVisible() && !mainWindow.isMinimized()

  // OS X: re-create a window in the app when the dock icon is clicked
  // and the window is not open
  if (appNeedsNewWindow) {
    createWindow()
  } else {
    log('app window already created and active')
  }
})

// 'before-quit' is emitted when Electron receives the signal to exit and wants
// to start closing windows
app.on('before-quit', () => willQuitApp = true)








// IN A SEPARATE FILE?

// TODO: fix me based on the state of the app
ipcMain.on('notifier_main', (type, opts) => {
  // NOTIFICATION_CLICKED
  // opts. newVal, oldVal
  // BEST WAY TO GET VALUES TO RENDER PROCESS?

  const appIsOpenAndNotFocused = mainWindow.isVisible() && !mainWindow.isFocused()
  const appIsMinimized = mainWindow.isMinimized()
  const appNeedsNewWindow = !mainWindow.isVisible() && !mainWindow.isMinimized()

  if (appIsOpenAndNotFocused || appIsMinimized) return mainWindow.show()
  if (appNeedsNewWindow) return createWindow()
})


ipcMain.on('notifier_render', (type, opts) => {
  mainWindow.webContents.send('test', opts)
})






