<template>
  <div>
    <h4>Tile: Eth Addr In Clipboard</h4>
    <p>Value in clipboard: {{lastCopy.value}}</p>
    <p><button @click="toggleInfo">show info for this tile</button></p>
    <div v-if="lastCopy.addressType">
      Success: The last value copied is a valid Ethereum Address
    </div>
    <div v-else>
      Error: The last value copied is not a valid Ethereum Address
    </div>
    <div v-if="infoVisible">
      <p>This is some additional info about this tile.</p>
    </div>
    <hr>
  </div>
</template>

<script>
  import { log, logError } from '../../../common/debug'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'
  // import { ITEM_STATES } from '../../constants/vue/checklists/items'

  export default {
    name: 'eth-tile-addr-in-clipboard',
    data () {
      return {
        infoVisible: false
      }
    },
    methods: {
      toggleInfo () {
        return this.infoVisible = !this.infoVisible
      }
    },
    computed: {
      lastCopy () {
        return this.$store.getters.copy.lastEvent
      },
    }
  }
</script>

<style scoped>

</style>
