<template>
  <div>
    <div v-for="(tile, index) in tiles">
      <eth-tile-addr-in-clipboard v-show="tile === TILES.ADDR_COPIED" />
      <eth-tile-addr-verified v-show="tile === TILES.ADDR_VERIFIED" />
      <eth-tile-tx-info-entered v-show="tile === TILES.TX_INFO_ENTERED" />
      <!-- <eth-tile-addr-pasted v-show="tile === TILES.ADDR_PASTED" /> -->
    </div>
  </div>
</template>

<script>
  import EthTileAddrInClipboard from './EthTileAddrInClipboard'
  import EthTileAddrVerified from './EthTileAddrVerified'
  import EthTileTxInfoEntered from './EthTileTxInfoEntered'
  import EthTileAddrPasted from './EthTileAddrPasted'
  import { ETHEREUM_TILES } from '../../../constants/vue/tiles'

  export default {
    components: {
      EthTileAddrInClipboard,
      EthTileAddrVerified,
      EthTileTxInfoEntered,
      EthTileAddrPasted,
    },
    computed: {
      tiles () {
        return this.$store.getters.tiles
      },
      TILES () {
        return ETHEREUM_TILES
      },
    }
  }
</script>
