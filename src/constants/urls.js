const ETHERSCAM_URL_BASE = 'https://etherscamdb.info/data'

const ETHERSCAN_URL_BASE = 'https://api.etherscan.io/api'
const ETHERSCAN_API_KEY = '18IQY7FVNVK3KFQN3RV5ZNT15SVPPFED9S'

export const ETHERSCAM_FULL_JSON_URL = `${ETHERSCAM_URL_BASE}/scams.json`
export const ETHERSCAM_ADDR_LIST_URL = `${ETHERSCAM_URL_BASE}/addresses.json`

const txFetchCount = 3

// CHANGE THESE EXPORTS
export const ETHERSCAM_DB = {
  ETHERSCAM_FULL_JSON_URL,
  ETHERSCAM_ADDR_LIST_URL,
}

export const ETHERSCAN = {
  GET_ADDR_BAL_URL: (address) => {
    return `${ETHERSCAN_URL_BASE}?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
  },
  GET_ADDR_TX_URL: (address) => {
    return `${ETHERSCAN_URL_BASE}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${txFetchCount}&sort=desc&apiKey=${ETHERSCAN_API_KEY}`
  }
}


