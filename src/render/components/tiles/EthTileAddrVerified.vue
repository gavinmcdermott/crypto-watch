<template>
  <div>
    <!-- <h4>Verified Address</h4> -->

    <div v-show="validAddress">
      <div id="error" v-if="possibleScamAddress">
        Ethereum address in your clipboard is a known scam address
      </div>
      <div id="success" v-else>
        Ethereum address in your clipboard is not a scam
      </div>
    </div>

    <div v-show="!validAddress">
      <div id="error">
        Invalid Ethereum address in your clipboard (verified)
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import { ethereum } from '../../../common/crypto'
  import { log, logError } from '../../../common/debug'
  import { ETHERSCAM_ADDR_LIST_URL } from '../../../constants/urls'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'
  // import { ITEM_STATES } from '../../constants/vue/checklists/items'

  export default {
    name: 'eth-tile-addr-verified',
    data () {
      return {
        scamAddressList: [],
      }
    },
    mounted () {
      axios.get(ETHERSCAM_ADDR_LIST_URL)
        .then(response => this.scamAddressList = Object.keys(response.data))
        .catch(e => console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e))
    },
    methods: {},
    computed: {
      validAddress () {
        const clipboardVal = this.$store.getters.copy.lastEvent.value
        return ethereum.isAddress(clipboardVal)
      },
      possibleScamAddress () {
        const clipboardVal = this.$store.getters.copy.lastEvent.value
        return this.scamAddressList.includes(clipboardVal)
      },
    }
  }
</script>
