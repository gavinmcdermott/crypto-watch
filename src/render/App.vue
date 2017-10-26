<template>
  <div>
    <h2>Hello from {{text}}</h2>
    <clipboard-address></clipboard-address>
  </div>
</template>

<script>
  import ClipboardAddress from './components/ClipboardAddress'

  export default {
    name: 'App',
    components: {
      ClipboardAddress: ClipboardAddress
    },
    data () {
      return {
         text: 'our new vue app!'
      }
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
