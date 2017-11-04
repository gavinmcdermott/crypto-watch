<template>
  <div>
    <h2>You're transacting with CoPilot™</h2>
    <p>Test A: 0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751</p>
    <p>Test B: 0x90a963eea01820574914ce277c0f57f516b88e59</p>
    <hr>
    <p>Current clipboard: {{newValue}}</p>
    <button v-on:click="startProtecting">Start a Transaction</button> or
    <button v-on:click="stopProtecting">Stop a Transaction</button>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'clipboard-address',
    mounted () {
      ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
        this.$store.commit(MUTATION_TYPES.SET_CLIPBOARD, data)
      })
    },
    methods: {
      startProtecting () {
        this.$store.commit(MUTATION_TYPES.SET_PROTECTION_MODE, true)
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
      },
      stopProtecting () {
        this.$store.commit(MUTATION_TYPES.SET_PROTECTION_MODE, false)
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
      },
    },
    computed: {
      newValue () {
        return this.$store.getters.clipboardNewValue
      },
    }
  }
</script>

<style scoped>

</style>
