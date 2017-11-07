import { clipboard, globalShortcut, ipcMain } from 'electron'
import robot from 'robotjs'
import { log, logError } from '../../common/debug'
import { EVENT_TYPES } from '../../constants/events'

// TODO: GREAT ERROR HANDLING!
const PASTE_COMMAND = 'CmdOrCtrl+V'

let pasteHandler = null

// NOTE!!!
// UI: Upon paste, to account for the delay, have some ui feedback that mentions
// that the address pasted is being checked by the app for correctness

// TODO: Security checks here!
// Store and pull things from db/memory, etc... or, how to handle malicious pasters
export const startPasteWatch = () => {
  if (pasteHandler) {
    log(`paste handler already registered`)
    return
  }

  pasteHandler = globalShortcut.register(PASTE_COMMAND, () => {
    const value = clipboard.readText()
    ipcMain.emit(EVENT_TYPES.PASTE_STARTED, { value })

    log(`paste captured ${value}`)

    // Immediately deregister the paste handler so we don't trigger
    // an infinite loop when we use robotjs to paste
    stopPasteWatch()

    // Need a short timeout here to make sure we capture the paste
    // TODO: PLAY WITH THIS INTERVAL AND UI FEEDBACK
    setTimeout(() => {
      log(`paste triggered ${clipboard.readText()}`)
      // Use robotjs to force a user paste action
      robot.keyTap('v', 'command')
      // Alert the app that something of interest was pasted
      // TODO: need extra care on this event!
      const data = {
        value,
        valid: true,
      }
      ipcMain.emit(EVENT_TYPES.PASTE_FINISHED, data)
    }, 500)
  })

  if (!pasteHandler) {
    logError(`Unable to register ${PASTE_COMMAND}`)
    // TODO: HOW DO WE WANT TO HANDLE THIS?
    // ONE IDEA: NOTIFY THE RENDER PROCESS....
  }

  log(`paste handler registered`)
  ipcMain.emit(EVENT_TYPES.PASTE_WATCH_STARTED)
}

export const stopPasteWatch = () => {
  pasteHandler = null
  globalShortcut.unregister(PASTE_COMMAND)
  ipcMain.emit(EVENT_TYPES.PASTE_WATCH_STOPPED)
  log(`paste handler deregistered`)
}
