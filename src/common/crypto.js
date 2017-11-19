import ethUtils from 'web3-utils'
import _ from 'lodash'
import { CURRENCIES } from '../constants/currencies'

const WEI_PER_ETHER = 1000000000000000000

// THIS IS IN WEB3 ALSO
const etherFromWei = (wei) => Number(wei) / WEI_PER_ETHER

export const ethereum = {
  isAddress: ethUtils.isAddress,
  etherFromWei,
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