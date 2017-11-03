<template>
  <div>
    <p>Current clipboard: {{current}}</p>
    <p>Previous clipboard: {{previous}}</p>
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
      // TODO: make sure we don't double register this handler!
      ipcRenderer.on(EVENT_TYPES.KEYBOARD_LOCKED, (event, data) => {
        console.log('KEYBOARD_LOCKED', data)
        // this.$store.commit(SET_CLIPBOARD, data)
      })

      ipcRenderer.on(EVENT_TYPES.KEYBOARD_UNLOCKED, (event, data) => {
        console.log('KEYBOARD_UNLOCKED', data)
        // this.$store.commit(SET_CLIPBOARD, data)
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
      current () {
        return this.$store.getters.clipboardVal
      },
      previous () {
        return this.$store.getters.clipboardPrevVal
      }
    }
  }
</script>

<style scoped>

</style>
