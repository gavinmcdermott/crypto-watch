import ethUtils from 'web3-utils'
import _ from 'lodash'
import { CURRENCIES } from '../constants/currencies'

// REMOVE
export const ethereum = {
  isAddress: ethUtils.isAddress
}

export const addressType = (testStr) => {
  const str = _.toString(testStr)
  if (ethUtils.isAddress(str)) {
    return CURRENCIES.Ethereum.name
  }
  return null
}

// export isAddress = (testStr) => {
//   const str = _.toString(testStr)
//   if (ethUtils.isAddress(str)) {
//     return true
//   }
//   return false
// }