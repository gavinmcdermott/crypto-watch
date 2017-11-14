<template>
  <div>
    <h2>Transaction Started: {{copilotIsActive}}</h2>
    <p>Test A: 0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751</p>
    <p>Test B: 0x90a963eea01820574914ce277c0f57f516b88e59</p>
    <p>Current Clipboard: {{clipboardValue}}</p>
    <button @click="activate">Start Tx to {{clipboardValue}}</button> |
    <button @click="deactivate">Reset Tx</button>
    <hr>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'clipboard-address',
    methods: {
      activate () {
        // Do a few things here,
        // - check for valid address in clipboard
        // - check if already activated
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
        this.$store.commit(MUTATION_TYPES.CHANGE_APP_IS_TRANSACTING, true)
      },
      deactivate () {
        // Do a few things here,
        // -
        // -
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)

        this.$store.commit(MUTATION_TYPES.CHANGE_APP_IS_TRANSACTING, false)
      },
    },
    computed: {
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
    }
  }
</script>

<style scoped>

</style>
