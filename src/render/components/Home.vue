<template>
  <div>
    <h2>You're using Copilot</h2>
    <button v-on:click="start">Start a Transaction</button>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import EthTiles from './tiles/EthTiles'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'app-body',
    components: {
      EthTiles,
    },
    mounted () {
      // ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
      //   this.$store.commit(MUTATION_TYPES.SET_CLIPBOARD, data)
      // })
    },
    methods: {
      start () {
        this.$router.push('/transact')
      },
    }
  }
</script>

<style scoped>

</style>
