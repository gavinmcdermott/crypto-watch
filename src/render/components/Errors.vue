<template>
  <div v-show="hasError">
    <div class="overlay"></div>
    <div class="overlay-header">
      <p>{{errorMsg}}</p>
      <button @click="clear">Reset Errors</button>
    </div>
  </div>
</template>

<script>
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    methods: {
      clear () {
        this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })
      }
    },
    computed: {
      errorMsg () {
        return this.$store.getters.error ? this.$store.getters.error.message : ""
      },
      hasError () {
        return this.$store.getters.error
      },
    }
  }
</script>
