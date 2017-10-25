import { ipcRenderer } from 'electron'
import { log, logError } from '../common/debug'

ipcRenderer.on('clipboard_changed', (e, d) => {
  log('captured in render process', e, d)
})
