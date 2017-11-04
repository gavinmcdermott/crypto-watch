<template>
  <div>
    <app-header></app-header>
    <checklist></checklist>
    <!-- <footer></footer> -->

    <!-- <button v-on:click="start">Start a Transaction</button> |
    <button v-on:click="stop">Stop a Transaction</button> -->
    <hr>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import AppHeader from './AppHeader'
  // import Footer from './Footer'
  import Checklist from './Checklist'
  import { EVENT_TYPES } from '../../constants/events'

  export default {
    name: 'App',
    components: {
      AppHeader,
      // Footer,
      Checklist,
    },
    // mounted () {
    //   ipcRenderer.on(EVENT_TYPES.VALUE_PASTED, (event, data) => {
    //     console.log('VALUE_PASTED', data)
    //     // this.$store.commit(SET_CLIPBOARD, data)
    //   })
    // },
    // methods: {
    //   start () {
    //     ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
    //   },
    //   stop () {
    //     ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
    //   },
    // }
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
