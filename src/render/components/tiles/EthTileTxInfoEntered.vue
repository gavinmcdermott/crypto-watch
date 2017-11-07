<template>
  <div>
    <h4>Tile: Eth Tx Info Entered</h4>
    <p><button @click="toggleInfo">show info for this tile</button></p>

    <div v-if="isWatchingPaste">
      <p>Enter your tx infor before pasting the address...</p>
    </div>
    <div v-else>
      <div v-if="lastPaste.wasValid">
        Success: You (should have) entered the tx info before pasting
      </div>
      <div v-else>
        Error: Not sure what an error state is here...?
      </div>
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
    name: 'eth-tile-tx-info-entered',
    data () {
      return {
        infoVisible: false,
      }
    },
    methods: {
      toggleInfo () {
        return this.infoVisible = !this.infoVisible
      }
    },
    computed: {
      lastPaste () {
        return this.$store.getters.paste.lastEvent
      },
      isWatchingPaste () {
        return this.$store.getters.keyboard.isWatchingPaste
      },
    }
  }
</script>

<style scoped>

</style>
