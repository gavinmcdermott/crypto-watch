import _ from 'lodash'
import { UPDATE_ADDRESS_INFO } from '../../../constants/vue/mutations'

const DEFAULT_ADDR = null
const DEFAULT_BALANCE = { fetched: false, data: null, }
const DEFAULT_TRANSACTIONS = { fetched: false, data: [], }
const DEFAULT_VERIFICATION = { fetched: false, isVerified: null, }


// TODO: ADD THE ACTUAL ADDRESS!!!! DO'H!

const DEFAULT_ADDRESS_OBJ = {
  address: DEFAULT_ADDR,
  balance: DEFAULT_BALANCE,
  transactions: DEFAULT_TRANSACTIONS,
  verification: DEFAULT_VERIFICATION,
}

// Initial state
const state = {
  address: DEFAULT_ADDRESS_OBJ
}

// Getters
const getters = {
  address: state => state.address,
}

// Mutations (commit = synchronous)
const mutations = {
  [UPDATE_ADDRESS_INFO] (state, data) {

    if (data.reset) {
      state.address = Object.assign({}, DEFAULT_ADDRESS_OBJ)
      return
    }

    state.address.address = data.address

    switch (data.type) {
      case 'balance':
        state.address.balance = {
          fetched: true,
          data: data.result
        }
        break

      case 'transactions':
        state.address.transactions = {
          fetched: true,
          data: data.result
        }
        console.log(data.result)
        break

      case 'verification':
        state.address.verification = {
          fetched: true,
          isVerified: data.result.isVerified
        }
        break
    }
  },
}

export default {
  state,
  getters,
  mutations,
}
