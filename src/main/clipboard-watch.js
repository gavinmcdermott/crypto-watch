import { app, clipboard } from 'electron'
import { log, logError } from '../common/debug'

const WATCH_INTERVAL_MILLI = 111

let clipboardWatchInterval = null
let oldValue = null

export const startClipboardWatch = (windowInstance) => {
  log('clipboard watch started')

  clipboardWatchInterval = setInterval(() => {
    let newValue = clipboard.readText()

    if (newValue && newValue !== oldValue) {
      log('clipboard has new %o', newValue)
      windowInstance.webContents.send('clipboard_changed', newValue)
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
