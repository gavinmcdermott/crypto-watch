import { app, clipboard } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/util-crypto'
import { EthNotifier } from './util-notifier'

const WATCH_INTERVAL_MILLI = 111

let clipboardWatchInterval = null
let oldValue = null

const handleNewValue = (newValue, oldValue) => {
  const validEthAddr = ethereum.isAddress(newValue)
  let notification = null

  if (validEthAddr) {
    log('ETH address copied')
    notification = new EthNotifier(newValue, oldValue)
  }
  if (!notification) return

  notification.show()
  notification.on('click', notification.focusApp)
}

export const startClipboardWatch = () => {
  log('clipboard watch started')

  clipboardWatchInterval = setInterval(() => {
    const newValue = clipboard.readText()
    const valueChanged = newValue && newValue !== oldValue

    if (valueChanged) {
      log('clipboard has new value: %o', newValue)
      handleNewValue(newValue, oldValue)
      oldValue = newValue
    }
  }, WATCH_INTERVAL_MILLI)
}

export const stopClipboardWatch = () => {
  clearInterval(clipboardWatchInterval)
  clipboardWatchInterval = null
  clipboard.clear()
  log('clipboard watch stopped')
}
