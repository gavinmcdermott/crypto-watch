<template>
  <div>
    <h4>Tile: Eth Addr Pasted</h4>
    <!-- <p><button @click="toggleInfo">show info for this tile</button></p> -->

    <div v-show="copilotIsActive">
      <div v-if="isWatchingPaste">
        <p>We're awaiting the keyboard paste event...</p>
      </div>
      <div v-else>
        <div v-if="lastPaste.wasValid">
          Success: The value pasted WAS what you wanted
        </div>
        <div v-else>
          Error: The value pasted WAS NOT what you wanted
        </div>
      </div>
    </div>

    <div v-show="!copilotIsActive">
      CoPilot is not yet active
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
    name: 'eth-tile-addr-pasted',
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
      copilotIsActive () {
        return this.$store.getters.copilot.isActive
      },
    }
  }
</script>

<style scoped>

</style>
