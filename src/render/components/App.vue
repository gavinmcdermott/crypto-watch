<template>
  <div>
    <!-- <app-header></app-header> -->
    <errors></errors>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from './AppHeader'
  import Errors from './Errors'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    name: 'App',
    components: {
      AppHeader,
      Errors,
    },
    beforeCreate () {
      this.$router.push('/transact')
    },
    mounted () {
      this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    }
  }
</script>
