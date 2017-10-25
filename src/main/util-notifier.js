import { ipcMain, Notification, webContents } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/util-crypto'

Notification.prototype.notifyMainProc = (newVal, oldVal) => {
  const opts = {
    newVal: newVal,
    oldVal: oldVal
  }
  ipcMain.emit('notify_main_proc', 'NOTIFICATION_CLICKED', opts)
}

export class EthNotifier extends Notification {
  constructor(newVal, oldVal) {
    const opts = {
      title: 'Ethereum address copied',
      body: `Click here if starting a transaction sending to:\n${newVal}`,
    }
    super(opts)
    log('ETH notifier shown')

    this.newVal = newVal
    this.oldVal = oldVal
  }
  focusApp() {
    log('ETH notifier clicked')
    this.notifyMainProc(this.newVal, this.oldVal)
  }
}
