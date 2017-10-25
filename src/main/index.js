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



const IS_DEV_MODE = process.execPath.match(/[\\/]electron/)
const INDEX_HTML_PATH = `file://${path.resolve(__dirname, '../index.html')}`

if (IS_DEV_MODE) enableLiveReload()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  })

  // and load the index.html of the app.
  mainWindow.loadURL(INDEX_HTML_PATH)

  // Open the DevTools.
  if (IS_DEV_MODE) {
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    log('app window created')
    startClipboardWatch(mainWindow)
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
    log('app window closed')
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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







// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

