import { app, clipboard, globalShortcut } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/crypto'
import { EthNotifier } from './notifier'
import robot from 'robotjs'

const WATCH_INTERVAL_MILLI = 111
const PASTE_COMMAND = 'CmdOrCtrl+V'

let clipboardWatcher = null
let oldValue = null

// NOTE!!!
// UI: Upon paste, to account for the delay, have some ui feedback that mentions
// that the address pasted is being checked by the app for correctness
const registerPasteHandler = () => {
  log('paste handler registered')

  globalShortcut.register(PASTE_COMMAND, () => {
    const pasted = clipboard.readText()
    log('paste captured: %o', pasted)

    // Immediately deregister the paste handler so we don't trigger
    // an infinite loop when we use robotjs to paste
    deregisterPasteHandler()
    log('paste handler unregistered')

    // Need a short timeout here to make sure we capture the paste
    // TODO: PLAY WITH THIS INTERVAL AND UI FEEDBACK
    setTimeout(() => {
      log('pasted: %o', clipboard.readText())
      // Use robotjs to force a user paste action
      robot.keyTap('v', 'command')
    }, 500)
  })

}

const deregisterPasteHandler = () => {
  log('paste handler deregistered')
  globalShortcut.unregister(PASTE_COMMAND)
}

const handleNewCopy = (newValue, oldValue) => {
  const validCryptoAddr = ethereum.isAddress(newValue) // will be extended beyond ETH
  const validEthAddr = ethereum.isAddress(newValue)
  let notification = null

  if (!validCryptoAddr) return
  // Listen to paste events only when a valid crypto address is in the clipboard
  registerPasteHandler()

  if (validEthAddr) {
    log('ETH address copied: %o', newValue)
    notification = new EthNotifier(newValue, oldValue)
  }

  // handle someone cop
  if (!notification) {
    logError('HOW ARE WE IN HERE? %o', newValue)
    deregisterPasteHandler()
    return
  }

  notification.show()
  notification.on('click', notification.focusApp)
}

const startCopyWatch = () => {
  log('copy watch started')

  clipboardWatcher = setInterval(() => {
    const newValue = clipboard.readText()

    // TODO: Handle copying the same crypto address again
    const valueChanged = newValue && newValue !== oldValue

    if (valueChanged) {
      log('clipboard has new value: %o', newValue)
      handleNewCopy(newValue, oldValue)
      oldValue = newValue
    }
  }, WATCH_INTERVAL_MILLI)
}

const stopCopyWatch = () => {
  log('copy watch stopped')
  clearInterval(clipboardWatcher)
  clipboardWatcher = null
}

export const startClipboardWatch = () => {
  startCopyWatch()
  log('clipboard watch started')
}

export const stopClipboardWatch = () => {
  stopCopyWatch()
  clipboard.clear()
  log('clipboard watch stopped')
}

