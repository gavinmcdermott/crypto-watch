<template>
  <div>
    <p>Current clipboard: {{newValue}}</p>
    <p>Previous clipboard: {{oldValue}}</p>
    <button v-on:click="lock">Lock</button>
    <button v-on:click="unlock">Unlock</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  import { log, logError } from '../../common/debug'
  import { EVENT_TYPES } from '../../constants/events'
  import { SET_CLIPBOARD } from '../../constants/vue/mutation-types'

  export default {
    name: 'clipboard-address',
    mounted () {

      ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
        console.log('CLIPBOARD_CHANGED', data)
        this.$store.commit(SET_CLIPBOARD, data)
      })

    },
    methods: {
      lock () {
        ipcRenderer.send(EVENT_TYPES.LOCK_KEYBOARD)
      },
      unlock () {
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
      },
    },
    computed: {
      newValue () {
        return this.$store.getters.clipboardNewValue
      },
      oldValue () {
        return this.$store.getters.clipboardOldValue
      }
    }
  }
</script>

<style scoped>

</style>
