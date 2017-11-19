import axios from 'axios'
import { ipcRenderer } from 'electron'
import { EVENT_TYPES } from '../../../constants/events'
import { MUTATION_TYPES } from '../../../constants/vue/mutations'
import { ETHERSCAN, ETHERSCAM_ADDR_LIST_URL } from '../../../constants/urls'
import { ethereum, addressType } from '../../../common/crypto'

export default (store) => {

  store.subscribe((mutation, state) => {
    switch (mutation.type) {

      // Fetch address details when a new address is copied
      case MUTATION_TYPES.CHANGE_COPY_VALUE:
        let address = mutation.payload.newValue

        // TODO: Add caching layer at some point
        store.commit(MUTATION_TYPES.UPDATE_ADDRESS_INFO, { reset: true })

        if (!addressType(address)) return

        // Fetch the address balance
        axios.get(ETHERSCAN.GET_ADDR_BAL_URL(address))
          .then((response) => {
            store.commit(MUTATION_TYPES.UPDATE_ADDRESS_INFO, {
              type: 'balance',
              result: response.data.result,
            })
          })
          .catch((e) => {
            // GLOBAL ERROR
            console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e)
          })

        // Fetch recent transactions
        axios.get(ETHERSCAN.GET_ADDR_TX_URL(address))
          .then((response) => {
            store.commit(MUTATION_TYPES.UPDATE_ADDRESS_INFO, {
              type: 'transactions',
              result: response.data.result,
            })
          })
          .catch((e) => {
            // GLOBAL ERROR
            console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e)
          })

        // Verify against Etherscam
        axios.get(ETHERSCAM_ADDR_LIST_URL)
          .then((response) => {
            const scamAddressList = Object.keys(response.data)
            store.commit(MUTATION_TYPES.UPDATE_ADDRESS_INFO, {
              type: 'verification',
              result: { isVerified: !scamAddressList.includes(address) }
            })
          })
          .catch((e) => {
            // GLOBAL ERROR
            console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e)
          })
        break
    }
  })

}
