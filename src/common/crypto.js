const ethUtils = require('web3-utils')

// console.log(ethUtils.isAddress('aksdjnas'))
// console.log(ethUtils.isAddress('0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751'))

export const ethereum = {
  isAddress: ethUtils.isAddress
}