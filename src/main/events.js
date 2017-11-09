import { webContents, clipboard, ipcMain } from 'electron'
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

  // Notify
  ipcMain.on(EVENT_TYPES.NOTIFICATION_CLICKED, (opts) => {
    sendToWindow(EVENT_TYPES.NOTIFICATION_CLICKED, opts)
    showWindow()
  })

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

  // Copy watch start
  ipcMain.on(EVENT_TYPES.START_COPY_WATCH, keyboard.copy.startWatch)
  ipcMain.on(EVENT_TYPES.COPY_WATCH_STARTED, () => {
    sendToWindow(EVENT_TYPES.COPY_WATCH_STARTED)
  })

  // Copy watch stop
  ipcMain.on(EVENT_TYPES.STOP_COPY_WATCH, keyboard.copy.stopWatch)
  ipcMain.on(EVENT_TYPES.COPY_WATCH_STOPPED, () => {
    sendToWindow(EVENT_TYPES.COPY_WATCH_STOPPED)
  })

  // Copy value changed
  ipcMain.on(EVENT_TYPES.CLIPBOARD_CHANGED, (opts) => {
    sendToWindow(EVENT_TYPES.CLIPBOARD_CHANGED, opts)
  })

  // Clear clipboard
  // TODO: add this api to copy
  ipcMain.on(EVENT_TYPES.CLEAR_CLIPBOARD, () => clipboard.writeText(''))

  // Paste watch start
  ipcMain.on(EVENT_TYPES.START_PASTE_WATCH, keyboard.paste.startWatch)
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STARTED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STARTED)
  })

  // Paste watch stop
  ipcMain.on(EVENT_TYPES.STOP_PASTE_WATCH, keyboard.paste.stopWatch)
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STOPPED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STOPPED)
  })

  // Paste event lifecycle
  ipcMain.on(EVENT_TYPES.PASTE_STARTED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_STARTED, opts)
    keyboard.lock()
  })
  ipcMain.on(EVENT_TYPES.PASTE_FINISHED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_FINISHED, opts)
  })
}
