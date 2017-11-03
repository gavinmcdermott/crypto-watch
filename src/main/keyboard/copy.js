import { clipboard, ipcMain } from 'electron'
import { log, logError } from '../../common/debug'
import { ethereum } from '../../common/crypto'
import { CURRENCIES } from '../../constants/currency'
import { EVENT_TYPES } from '../../constants/events'
import { notifyUser } from '../notifier'

const WATCH_INTERVAL_MILLI = 111

let clipboardWatcher = null
let oldClipboardValue = null

const checkIfValueIsCryptoAddr = (newValue, oldValue) => {
  const validCryptoAddr = ethereum.isAddress(newValue) // will be extended beyond ETH
  const validEthAddr = ethereum.isAddress(newValue)

  // Do nothing if the new value isn't a valid crypto address
  if (!validCryptoAddr) return

  let opts = {
    address: newValue,
    currency: null
  }

  if (validEthAddr) {
    log(`${CURRENCIES.Ethereum.name} address copied: ${newValue}`)
    opts.currency = CURRENCIES.Ethereum.name
    notifyUser(opts)
  }

  ipcMain.emit(EVENT_TYPES.VALID_ADDRESS_COPIED, opts)
}

export const startCopyWatch = () => {
  log('copy watch started')

  clipboardWatcher = setInterval(() => {
    const newClipboardValue = clipboard.readText()
    const isOfInterest = newClipboardValue &&
                          newClipboardValue !== oldClipboardValue

    if (isOfInterest) {
      // Always let the main process know that the value changed
      ipcMain.emit(EVENT_TYPES.CLIPBOARD_CHANGED, {
        newValue: newClipboardValue,
        oldValue: oldClipboardValue,
      })
      // Then determine if we need to notify the user
      checkIfValueIsCryptoAddr(newClipboardValue, oldClipboardValue)
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
