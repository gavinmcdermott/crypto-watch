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
  let foo  ={
    title: 123,
    body: 'udsaniaskjndksa'
  }
  let v = new Notification(foo)
  v.show()

  // let opts = {}
  // let notification = null

  // const charsToShow = 13
  // const addrLastIdx = address.length
  // const prettyAddr = `${address.slice(0,charsToShow)}...${address.slice(addrLastIdx-charsToShow, addrLastIdx)}`

  // switch (currency) {
  //   case CURRENCIES.Ethereum.name:
  //     opts.title = 'Ethereum address copied'
  //     opts.body = `Click here to start a transation to\n${prettyAddr}`
  //     notification = new Notification(opts)
  //     break
  //   default:
  //     logError(`Unhandled notification attempt: ${currency}`)
  //     break
  // }

  // if (!notification) {
  //   logError(`Notification failed: ${currency}`)
  //   return
  // }

  // notification.show()
  // notification.on('click', () => notifyProcess({ currency, address }))
}
