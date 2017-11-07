<template>
  <div>
    <h2>Footer action area</h2>
    <hr>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'app-footer',
  }
</script>

<style scoped>

</style>
