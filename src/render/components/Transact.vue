<template>
  <div>
    <p><b>Is transacting: {{isTransacting}}</b></p>
    <div v-show="isTransacting">
      <button @click="stopTransacting">Cancel This Transaction</button>
    </div>

    <div v-show="!isTransacting">
      <button @click="startTransacting">Start Transacting with Copilot</button>
    </div>

    <!-- <app-header></app-header> -->
    <eth-tiles></eth-tiles>
    <!-- <app-footer></app-footer> -->

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import EthTiles from './tiles/EthTiles'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'app-body',
    components: {
      // AppHeader,
      EthTiles,
      // AppFooter,
    },
    mounted () {
      const foo = this.$store.getters.copy.lastEvent.value
      console.log('changes', foo)
    },
    computed: {
      isTransacting () {
        return this.$store.getters.isTransacting
      },
    },
    methods: {
      home () {
        this.$router.push('/')
      },
      startTransacting () {
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)

        this.$store.commit(MUTATION_TYPES.CHANGE_APP_IS_TRANSACTING, true)
      },
      stopTransacting () {
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)

        this.$store.commit(MUTATION_TYPES.CHANGE_APP_IS_TRANSACTING, false)
      },
    },
  }
</script>

<style scoped>

</style>
