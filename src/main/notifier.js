import { ipcMain, Notification } from 'electron'
import { log, logError } from '../common/debug'
import { ethereum } from '../common/crypto'

const IPC_MAIN_EVT_TYPE = 'NOTIFIER_CLICKED'

Notification.prototype.notifyHandlers = (current, previous) => {
  const opts = {
    current,
    previous
  }
  ipcMain.emit('notifier_main', IPC_MAIN_EVT_TYPE, opts)
  ipcMain.emit('notifier_render', IPC_MAIN_EVT_TYPE, opts)
}

export class EthNotifier extends Notification {
  constructor(current, previous) {
    const opts = {
      title: 'Ethereum address copied',
      body: `Click here if starting a transaction sending to:\n${current}`,
    }
    super(opts)
    log('ETH notifier shown')

    this.current = current
    this.previous = previous
  }
  focusApp() {
    log('ETH notifier clicked')
    this.notifyHandlers(this.current, this.previous)
  }
}
