import { clipboard } from 'electron'
import { registerPasteHandler, deregisterPasteHandler } from './paste'
import { log, logError } from '../../common/debug'
import { ethereum } from '../../common/crypto'
import { EthNotifier } from '../notifier'

const WATCH_INTERVAL_MILLI = 111

let clipboardWatcher = null
let oldClipboardValue = null

const handleNewClipboardValue = (newValue, oldValue) => {
  const validCryptoAddr = ethereum.isAddress(newValue) // will be extended beyond ETH
  const validEthAddr = ethereum.isAddress(newValue)
  let notification = null

  // Do nothing if the new value isn't a valid crypto address
  if (!validCryptoAddr) return

  // Listen to paste events only when a valid crypto address is in the clipboard
  registerPasteHandler()

  if (validEthAddr) {
    log(`ETH address copied ${newValue}`)
    notification = new EthNotifier(newValue, oldValue)
  }

  // TODO: enumerate and handle failure cases
  if (!notification) {
    logError(`WE ARE IN AN UNHANDLED COPY FAIL CASE (current clipboard: ${newValue})`)
    deregisterPasteHandler()
    return
  }

  notification.show()
  notification.on('click', notification.focusApp)
}

export const startCopyWatch = () => {
  log('copy watch started')

  const newValueIsOfInterest = (newValue, oldValue) => {
    return newValue && newValue !== oldValue
  }

  clipboardWatcher = setInterval(() => {
    const newClipboardValue = clipboard.readText()
    const newValueIsOfInterest = newClipboardValue &&
                                  newClipboardValue !== oldClipboardValue

    if (newValueIsOfInterest) {
      log(`clipboard has new value ${newClipboardValue}`)
      handleNewClipboardValue(newClipboardValue, oldClipboardValue)
      oldClipboardValue = newClipboardValue
    }
  }, WATCH_INTERVAL_MILLI)
}

export const stopCopyWatch = () => {
  log('copy watch stopped')
  clearInterval(clipboardWatcher)
  clipboardWatcher = null
  clipboard.clear()
}
