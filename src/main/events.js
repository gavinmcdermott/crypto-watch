import { webContents, ipcMain } from 'electron'
import keyboard from './keyboard'
import { log, logError } from '../common/debug'
import { EVENT_TYPES } from '../constants/events'

export default (mainWindow=null, createWindow=null) => {
  // handle init error

  const sendToWindow = (eventType, opts) => {
    if (!mainWindow) return
    mainWindow.webContents.send(eventType, opts)
  }

  const showWindow = () => {
    if (mainWindow) return mainWindow.show()
    createWindow()
  }

  // Lock keyboard
  ipcMain.on(EVENT_TYPES.LOCK_KEYBOARD, keyboard.lock)
  ipcMain.on(EVENT_TYPES.KEYBOARD_LOCKED, () => {
    sendToWindow(EVENT_TYPES.KEYBOARD_LOCKED)
  })

  // Unlock keyboard
  ipcMain.on(EVENT_TYPES.UNLOCK_KEYBOARD, keyboard.unlock)
  ipcMain.on(EVENT_TYPES.KEYBOARD_UNLOCKED, () => {
    sendToWindow(EVENT_TYPES.KEYBOARD_UNLOCKED)
  })

  // Copy values
  ipcMain.on(EVENT_TYPES.CLIPBOARD_CHANGED, (opts) => {
    sendToWindow(EVENT_TYPES.CLIPBOARD_CHANGED, opts)
  })
  ipcMain.on(EVENT_TYPES.VALID_ADDRESS_COPIED, (opts) => {
    sendToWindow(EVENT_TYPES.VALID_ADDRESS_COPIED, opts)
  })

  // Paste watchers
  ipcMain.on(EVENT_TYPES.START_PASTE_WATCH, () => {
    keyboard.paste.registerHandler()
  })
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STARTED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STARTED)
  })

  ipcMain.on(EVENT_TYPES.STOP_PASTE_WATCH, () => {
    keyboard.paste.deregisterHandler()
  })
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STOPPED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STOPPED)
  })

  // Paste values
  ipcMain.on(EVENT_TYPES.PASTE_STARTED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_STARTED, opts)
  })
  ipcMain.on(EVENT_TYPES.PASTE_FINISHED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_FINISHED, opts)
  })



  // Notify
  ipcMain.on(EVENT_TYPES.NOTIFICATION_CLICKED, showWindow)
}
