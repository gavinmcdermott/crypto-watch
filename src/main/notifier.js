import { ipcMain, Notification } from 'electron'
import { log, logError } from '../common/debug'
import { EVENT_TYPES } from '../constants/events'
import { CURRENCIES } from '../constants/currencies'

const notifyProcess = ({ currency, address }) => {
  const opts = {
    currency,
    address,
  }
  log('notification clicked by user')
  ipcMain.emit(EVENT_TYPES.NOTIFICATION_CLICKED, opts)
}

export const notifyUser = ({ currency, address }) => {
  // Notification.isSupported()
  // TODO: LET PEOPLE KNOW IF THEY DON"T HAVE NOTIFICATIONS SUPPORTED
  // OR: if they have alerts shut off on their mac after a certain time (happened to G)

  let opts = {}
  let notification = null

  const charsToShow = 13
  const addrLastIdx = address.length
  const prettyAddr = `${address.slice(0,charsToShow)}...${address.slice(addrLastIdx-charsToShow, addrLastIdx)}`

  switch (currency) {
    case CURRENCIES.Ethereum.name:
      opts.title = 'Ethereum address copied'
      opts.body = `Click here to start a transation to\n${prettyAddr}`
      notification = new Notification(opts)
      break
    default:
      logError(`Unhandled notification attempt: ${currency}`)
      break
  }

  if (!notification) return logError(`Notification failed: ${currency}`)

  notification.show()
  notification.on('click', () => notifyProcess({ currency, address }))
}
