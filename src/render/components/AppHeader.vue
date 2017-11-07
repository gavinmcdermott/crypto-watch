<template>
  <div>
    <h2>CoPilot header area</h2>
    <p>Test A: 0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751</p>
    <p>Test B: 0x90a963eea01820574914ce277c0f57f516b88e59</p>
    <button @click="startTx">Start Tx</button> < OR >
    <button @click="stopTx">Stop Tx</button>
    <hr>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'clipboard-address',
    mounted () {
      // ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
      //   this.$store.commit(MUTATION_TYPES.SET_CLIPBOARD, data)
      // })
    },
    methods: {
      startTx () {
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
      },
      stopTx () {
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
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
