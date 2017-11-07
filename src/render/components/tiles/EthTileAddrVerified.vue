<template>
  <div>
    <h4>Tile: Eth Addr Verified</h4>
    <p><button @click="toggleInfo">show info for this tile</button></p>
    <div v-show="!lastCopy.addressType">
      Error: The value in the clipboard is not an Ethereum address
    </div>
    <div v-show="lastCopy.addressType">
      <div v-if="possibleScamAddress">
        Error: The value in the clipboard is a known scam address
      </div>
      <div v-else>
        Success: The value in the clipboard is not a scam
      </div>
    </div>
    <div v-if="infoVisible">
      <p>This is some additional info about this tile.</p>
    </div>
    <hr>
  </div>
</template>

<script>
  import axios from 'axios'
  import { log, logError } from '../../../common/debug'
  import { ETHERSCAM_ADDR_LIST_URL } from '../../../constants/urls'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'
  // import { ITEM_STATES } from '../../constants/vue/checklists/items'

  export default {
    name: 'eth-tile-addr-verified',
    data () {
      return {
        infoVisible: false,
        scamAddressList: null,
      }
    },
    mounted () {
      axios.get(ETHERSCAM_ADDR_LIST_URL)
        .then(response => this.scamAddressList = Object.keys(response.data))
        .catch(e => console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e))
    },
    methods: {
      toggleInfo () {
        return this.infoVisible = !this.infoVisible
      }
    },
    computed: {
      possibleScamAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent
        return lastCopy.addressType && this.scamAddressList.includes(lastCopy.value)
      },
      lastCopy () {
        return this.$store.getters.copy.lastEvent
      },
    }
  }
</script>

<style scoped>

</style>
