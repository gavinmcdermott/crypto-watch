<template>
  <div>
    <h2>CoPilot is active: {{copilotIsActive}}</h2>
    <p>Test A: 0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751</p>
    <p>Test B: 0x90a963eea01820574914ce277c0f57f516b88e59</p>
    <p>Current Clipboard: {{lastCopy.value}}</p>
    <button @click="activate">Activate CoPilot</button> |
    <button @click="deactivate">Deactivate CoPilot</button>
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
        this.$store.commit(MUTATION_TYPES.CHANGE_COPILOT_IS_ACTIVE, true)
      },
      deactivate () {
        // Do a few things here,
        // -
        // -
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)

        this.$store.commit(MUTATION_TYPES.CHANGE_COPILOT_IS_ACTIVE, false)
      },
    },
    computed: {
      lastCopy () {
        return this.$store.getters.copy.lastEvent
      },
      copilotIsActive () {
        return this.$store.getters.copilot.isActive
      },
    }
  }
</script>

<style scoped>

</style>
