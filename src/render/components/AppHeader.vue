<template>
  <div class="header">
    <h3>{{routeName}}</h3>
  </div>
</template>

<script>
  export default {
    components: {},
    computed: {
      routeName () {
        return this.$route.name
      },
    }
  }
</script>
