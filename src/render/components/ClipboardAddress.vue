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
  import { UPDATE_CLIPBOARD } from '../constants/mutation-types'

  export default {
    name: 'clipboard-address',
    mounted () {
      // TODO: make sure we don't double register this handler!
      ipcRenderer.on('test', (event, data) => {
        console.log(this.$store)
        console.log(data)
        this.$store.commit(UPDATE_CLIPBOARD, data) // sync so it commits
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
