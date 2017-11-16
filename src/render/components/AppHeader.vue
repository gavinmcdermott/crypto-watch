<template>
  <div class="row">
    <div class="main-nav col-1">
      <router-link :to="'/home'">Home</router-link>
      <router-link :to="'/transact'">Transact</router-link>
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    methods: {},
    computed: {
      // foo () {
      //   console.log(this.$route.path)
      //   return 123
      // },
    }
  }
</script>
