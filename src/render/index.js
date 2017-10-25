import { ipcRenderer } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/crypto'

ipcRenderer.on('clipboard_changed', (e, d) => {
  log('captured in render process', e, d)
  log('isAddress', ethereum.isAddress(d))
})
