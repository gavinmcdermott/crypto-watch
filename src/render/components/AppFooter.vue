<template>
  <div class="footer">
    <ul class="tabs">

      <!-- TODO: Iterate through routes!! -->
      <navigation-tab name="Transact"></navigation-tab>
      <navigation-tab name="Home"></navigation-tab>

    </ul>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'
  import NavigationTab from './NavigationTab'

  export default {
    components: {
      NavigationTab,
    },
    methods: {
      sendTo (path) {
        this.$router.push({ path })
      },
      isActive (routeName) {
        return this.$route.name === routeName
      },
    },
    computed: {}
  }
</script>
