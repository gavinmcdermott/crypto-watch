<template>
  <div>
    <p>Current clipboard: {{current}}</p>
    <p>Previous clipboard: {{previous}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  import { log, logError } from '../../common/debug'
  import { SET_CLIPBOARD } from '../constants/mutation-types'

  export default {
    name: 'clipboard-address',
    mounted () {
      // TODO: make sure we don't double register this handler!
      ipcRenderer.on('test', (event, data) => {
        console.log('RECEIVED IN CLIENT', data)
        this.$store.commit(SET_CLIPBOARD, data)
      })
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
