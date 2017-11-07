<template>
  <div>
    <!-- <p>ProtectionMode running: {{protectionMode}}</p> -->
    <div v-for="(tile, index) in tiles">
      <eth-tile-addr-in-clipboard v-show="tile === TILES.ADDR_COPIED" />
      <eth-tile-addr-verified v-show="tile === TILES.ADDR_VERIFIED" />
      <eth-tile-tx-info-entered v-show="tile === TILES.TX_INFO_ENTERED" />
      <eth-tile-addr-pasted v-show="tile === TILES.ADDR_PASTED" />
    </div>
  </div>
</template>

<script>
  import EthTileAddrInClipboard from './EthTileAddrInClipboard'
  import EthTileAddrVerified from './EthTileAddrVerified'
  import EthTileTxInfoEntered from './EthTileTxInfoEntered'
  import EthTileAddrPasted from './EthTileAddrPasted'
  // import { ethereum } from '../../common/crypto'
  import { ETHEREUM_CHECKLIST } from '../../../constants/vue/checklists/ethereum'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'
  // import { ETHERSCAM_ADDR_LIST_URL } from '../../constants/urls'
  import { EVENT_TYPES } from '../../../constants/events'

  export default {
    name: 'App',
    components: {
      EthTileAddrInClipboard,
      EthTileAddrVerified,
      EthTileTxInfoEntered,
      EthTileAddrPasted,
    },
    mounted () {

    },
    computed: {
      tiles () {
        return this.$store.getters.checklist
      },
      TILES () {
        return ETHEREUM_CHECKLIST
      },
      protectionMode () {
        return this.$store.getters.protectionMode
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
