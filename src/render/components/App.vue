<template>
  <div>
    <h2>Hello from {{text}}</h2>
    <clipboard-address></clipboard-address>
    <div v-for="(step, idx) in flow.steps">
      <currency-tile
        :index="idx"
        :title="step.title"
        :current-state="step.currentState"
        :states="step.states">
      </currency-tile>
    </div>
    <hr>
  </div>
</template>

<script>
  import ClipboardAddress from './ClipboardAddress'
  import CurrencyTile from './CurrencyTile'

  export default {
    name: 'App',
    components: {
      ClipboardAddress,
      CurrencyTile,
    },
    data () {
      return {
         text: 'CryptoWatch™'
      }
    },
    computed: {
      flow () {
        console.log('------------------------------')
        console.log(this.$store.getters.flow)
        console.log('------------------------------')
        return this.$store.getters.flow
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
