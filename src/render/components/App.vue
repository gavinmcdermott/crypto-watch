<template>
  <div>
    <!-- <app-header></app-header> -->
    <router-view></router-view>
    <!-- <app-footer></app-footer> -->
    <!-- <button v-on:click="stop">Stop a Transaction</button> -->
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  // import AppHeader from './AppHeader'
  // import AppBody from './AppBody'
  // import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'

  export default {
    name: 'App',
    components: {
      // AppHeader,
      // AppBody,
      // AppFooter,
    },
    // mounted () {
    //   ipcRenderer.on(EVENT_TYPES.VALUE_PASTED, (event, data) => {
    //     console.log('VALUE_PASTED', data)
    //     // this.$store.commit(SET_CLIPBOARD, data)
    //   })
    // },
    methods: {
      // start () {
      //   this.$router.push('/transact')
      // },
      // stop () {
      //   ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
      // },
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
