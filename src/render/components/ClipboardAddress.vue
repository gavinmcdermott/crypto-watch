<template>
  <div id="address">
    <p>Current clipboard address: {{address}}</p>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { log, logError } from '../../common/debug'

  export default {
    name: 'clipboard-address',
    mounted () {
      let context = this
      console.log(this)
      console.log(context)
      ipcRenderer.on('test', (sender, data) => {
        console.log(data)
        console.log(context)
        console.log(this)
        context.address = data.newVal
      })
    },
    data () {
      return {
        address: '',
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
