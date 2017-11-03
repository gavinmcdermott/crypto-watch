import { ipcMain, Notification } from 'electron'
import { log, logError } from '../common/debug'
import { EVENT_TYPES } from '../constants/events'
import { CURRENCIES } from '../constants/currency'

const notifyProcess = ({ currency, address }) => {
  const opts = {
    currency,
    address,
  }
  log('notification clicked by user')
  ipcMain.emit(EVENT_TYPES.NOTIFICATION_CLICKED, opts)
}

export const notifyUser = ({ currency, address }) => {
  let opts = {}
  let notification = null

  const charsToShow = 13
  const addrLastIdx = address.length - 1
  const prettyAddr = `${address.slice(0,charsToShow)}...${address.slice(addrLastIdx-charsToShow, addrLastIdx)}`

  switch (currency) {
    case CURRENCIES.Ethereum.name:
      opts.title = 'Ethereum address copied'
      opts.body = `Click here if you are starting a transation to:\n${prettyAddr}`
      notification = new Notification(opts)
      break
    default:
      logError('HANDLE THIS ERROR CASE!!!')
      break
  }

  // TODO: What kind of error handling here?
  if (!notification) {
    logError(`WE ARE IN AN UNHANDLED COPY FAIL CASE `)
    return
  }

  notification.show()
  notification.on('click', () => notifyProcess({ currency, address }))
}
