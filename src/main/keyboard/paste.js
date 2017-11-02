import { clipboard, globalShortcut } from 'electron'
import robot from 'robotjs'
import { log, logError } from '../../common/debug'
import { lockKeys } from './lock'

// TODO: GREAT ERROR HANDLING IN THESE CASES!
const PASTE_COMMAND = 'CmdOrCtrl+V'

// NOTE!!!
// UI: Upon paste, to account for the delay, have some ui feedback that mentions
// that the address pasted is being checked by the app for correctness
export const registerPasteHandler = () => {
  log(`paste handler registered ${PASTE_COMMAND}`)

  globalShortcut.register(PASTE_COMMAND, () => {
    const pasted = clipboard.readText()
    log(`paste captured ${pasted}`)

    // Immediately deregister the paste handler so we don't trigger
    // an infinite loop when we use robotjs to paste
    deregisterPasteHandler()
    log('paste handler unregistered')

    // Need a short timeout here to make sure we capture the paste
    // TODO: PLAY WITH THIS INTERVAL AND UI FEEDBACK
    setTimeout(() => {
      log(`pasted: ${clipboard.readText()}`)
      // Use robotjs to force a user paste action
      robot.keyTap('v', 'command')
      // Lock the keyboard upon paste
      lockKeys()
    }, 500)
  })

}

export const deregisterPasteHandler = () => {
  log(`paste handler deregistered ${PASTE_COMMAND}`)
  globalShortcut.unregister(PASTE_COMMAND)
}
