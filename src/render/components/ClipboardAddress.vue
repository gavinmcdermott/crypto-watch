<template>
  <div id="address">
    <p>Current clipboard: {{current}}</p>
    <p>Previous clipboard: {{previous}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  import { log, logError } from '../../common/debug'
  import { UPDATE_CLIPBOARD } from '../store/mutation-types'

  console.log(UPDATE_CLIPBOARD)

  export default {
    name: 'clipboard-address',
    // data () {
    //   return {
    //     current: '',
    //     previous: ''
    //   }
    // },
    mounted () {
      ipcRenderer.on('test', (event, data) => {
        console.log(this.$store)
        console.log(data)
        this.$store.commit(UPDATE_CLIPBOARD, data) // sync so it commits
      })
    },
    computed: {
      current () {
        // console.log(this.$store.getters)
        // return this.$store.getters['clipboard/current']
        return this.$store.getters.clipboardVal
      },
      previous () {
        // return this.$store.getters['clipboard/previous']
        return this.$store.getters.clipboardPrevVal
      }
    }
  }
</script>

<style scoped>
  #address {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
