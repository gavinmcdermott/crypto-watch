import { clipboard, globalShortcut, ipcMain } from 'electron'
import robot from 'robotjs'
import { log, logError } from '../../common/debug'
import { EVENT_TYPES } from '../../constants/events'

// TODO: GREAT ERROR HANDLING!
const PASTE_COMMAND = 'CmdOrCtrl+V'

// NOTE!!!
// UI: Upon paste, to account for the delay, have some ui feedback that mentions
// that the address pasted is being checked by the app for correctness

// TODO: Security checks here!
// Store and pull things from db/memory, etc... or, how to handle malicious pasters
export const registerPasteHandler = () => {
  log(`paste handler registered: ${PASTE_COMMAND}`)

  globalShortcut.register(PASTE_COMMAND, () => {
    const value = clipboard.readText()
    log(`paste captured ${value}`)

    // Immediately deregister the paste handler so we don't trigger
    // an infinite loop when we use robotjs to paste
    deregisterPasteHandler()

    // Need a short timeout here to make sure we capture the paste
    // TODO: PLAY WITH THIS INTERVAL AND UI FEEDBACK
    setTimeout(() => {
      log(`paste triggered ${clipboard.readText()}`)
      // Use robotjs to force a user paste action
      robot.keyTap('v', 'command')
      // Alert the app that something of interest was pasted
      ipcMain.emit(EVENT_TYPES.VALUE_PASTED, { value })
    }, 500)
  })

}

export const deregisterPasteHandler = () => {
  log(`paste handler deregistered: ${PASTE_COMMAND}`)
  globalShortcut.unregister(PASTE_COMMAND)
}
