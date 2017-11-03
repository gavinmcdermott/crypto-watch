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

  // Keyboard lock / unlock
  ipcMain.on(EVENT_TYPES.LOCK_KEYBOARD, keyboard.lock)
  ipcMain.on(EVENT_TYPES.KEYBOARD_LOCKED, () => {
    sendToWindow(EVENT_TYPES.KEYBOARD_LOCKED)
  })

  ipcMain.on(EVENT_TYPES.UNLOCK_KEYBOARD, keyboard.unlock)
  ipcMain.on(EVENT_TYPES.KEYBOARD_UNLOCKED, () => {
    sendToWindow(EVENT_TYPES.KEYBOARD_UNLOCKED)
  })

  // Copying
  ipcMain.on(EVENT_TYPES.CLIPBOARD_CHANGED, (opts) => {
    sendToWindow(EVENT_TYPES.CLIPBOARD_CHANGED, opts)
  })
  ipcMain.on(EVENT_TYPES.VALID_ADDRESS_COPIED, (opts) => {
    sendToWindow(EVENT_TYPES.VALID_ADDRESS_COPIED, opts)
  })

  // Notifications
  ipcMain.on(EVENT_TYPES.NOTIFICATION_CLICKED, showWindow)
}
