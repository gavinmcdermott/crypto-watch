<template>
  <div>
    <h2>Hello from {{text}}</h2>
    <clipboard-address></clipboard-address>
    <checklist></checklist>
    <hr>
  </div>
</template>

<script>
  import ClipboardAddress from './ClipboardAddress'
  import Checklist from './Checklist'

  export default {
    name: 'App',
    components: {
      ClipboardAddress,
      Checklist,
    },
    data () {
      return {
         text: 'CryptoWatch™'
      }
    },
    computed: {
      checklist () {
        return this.$store.getters.checklist
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
