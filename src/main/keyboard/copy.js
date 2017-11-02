import { clipboard, ipcMain } from 'electron'
import { log, logError } from '../../common/debug'
import { ethereum } from '../../common/crypto'
import { notifyUser } from '../notifier'
import { CURRENCY_TYPES } from '../constants/currency'
import { EVENT_TYPES } from '../constants/events'

const WATCH_INTERVAL_MILLI = 111

let clipboardWatcher = null
let oldClipboardValue = null

const handleNewClipboardValue = (newValue, oldValue) => {
  const validCryptoAddr = ethereum.isAddress(newValue) // will be extended beyond ETH
  const validEthAddr = ethereum.isAddress(newValue)

  // Do nothing if the new value isn't a valid crypto address
  if (!validCryptoAddr) return

  if (validEthAddr) {
    log(`${CURRENCY_TYPES.ETH} address copied: ${newValue}`)
    notifyUser({
      currency: CURRENCY_TYPES.ETH,
      address: newValue,
    })
  }
}

export const startCopyWatch = () => {
  log('copy watch started')

  clipboardWatcher = setInterval(() => {
    const newClipboardValue = clipboard.readText()
    const newValueIsOfInterest = newClipboardValue &&
                                  newClipboardValue !== oldClipboardValue

    if (newValueIsOfInterest) {
      // Always let the main process know that the value changed
      ipcMain.emit(EVENT_TYPES.CLIPBOARD_CHANGED, {
        newValue: newClipboardValue,
        oldValue: oldClipboardValue,
      })
      // Then determine if we need to notify the user
      handleNewClipboardValue(newClipboardValue, oldClipboardValue)
      // update local values
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
