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
  ipcMain.on(EVENT_TYPES.NOTIFICATION_CLICKED, () => {
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

  // Copy watchers
  ipcMain.on(EVENT_TYPES.START_COPY_WATCH, keyboard.copy.startWatch)
  ipcMain.on(EVENT_TYPES.COPY_WATCH_STARTED, () => {
    sendToWindow(EVENT_TYPES.COPY_WATCH_STARTED)
  })

  ipcMain.on(EVENT_TYPES.STOP_COPY_WATCH, keyboard.copy.stopWatch)
  ipcMain.on(EVENT_TYPES.COPY_WATCH_STOPPED, () => {
    sendToWindow(EVENT_TYPES.COPY_WATCH_STOPPED)
  })

  // Copy values
  ipcMain.on(EVENT_TYPES.CLIPBOARD_CHANGED, (opts) => {
    console.log('CLIPBOARD VALUE CHANGED', opts)
    sendToWindow(EVENT_TYPES.CLIPBOARD_CHANGED, opts)
  })
  ipcMain.on(EVENT_TYPES.CLEAR_CLIPBOARD, () => {
    console.log('CLEARING CLIPBOARD')
    clipboard.writeText('')

    setTimeout(() => console.log(clipboard.readText()), 2000)
  })

  // Paste watchers
  ipcMain.on(EVENT_TYPES.START_PASTE_WATCH, keyboard.paste.startWatch)
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STARTED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STARTED)
  })

  ipcMain.on(EVENT_TYPES.STOP_PASTE_WATCH, keyboard.paste.stopWatch)
  ipcMain.on(EVENT_TYPES.PASTE_WATCH_STOPPED, () => {
    sendToWindow(EVENT_TYPES.PASTE_WATCH_STOPPED)
  })

  // Paste values
  ipcMain.on(EVENT_TYPES.PASTE_STARTED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_STARTED, opts)
    keyboard.lock()
  })
  ipcMain.on(EVENT_TYPES.PASTE_FINISHED, (opts) => {
    sendToWindow(EVENT_TYPES.PASTE_FINISHED, opts)
  })
}
