<template>
  <div class="footer">
    <ul class="tabs">
      <!-- generate nav tabs based on route names -->
      <navigation-tab v-for="name in routeNames" v-bind:name="name"></navigation-tab>
    </ul>
  </div>
</template>

<script>
  import NavigationTab from './NavigationTab'

  export default {
    components: {
      NavigationTab,
    },
    computed: {
      routeNames () {
        let routeNames = []
        for (var route of this.$router.options.routes) {
          routeNames.push(route.name)
        }
        return routeNames
      },
    }
  }
</script>
