import { ipcMain, Notification, webContents } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/util-crypto'

Notification.prototype.notifyMainProc = (newVal, oldVal) => {
  ipcMain.emit('notifier_open', newVal, oldVal)
}

export class EthNotifier extends Notification {
  constructor(newAddr, oldAddr) {
    const opts = {
      title: 'Ethereum address copied',
      body: `Click here if starting a transaction sending to:\n${newAddr}`,
    }
    super(opts)
    log('ETH notifier opened')

    this.newAddress = newAddr
    this.oldAddress = oldAddr
  }
  focusApp() {
    log('ETH notifier clicked')
    this.notifyMainProc(this.newAddress, this.oldAddress)
  }
}
