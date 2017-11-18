<template>
  <div>
    <errors></errors>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from './AppFooter'
  import Errors from './Errors'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    components: {
      AppFooter,
      Errors,
    },
    beforeCreate () {
      this.$router.push('/home')
    },
    mounted () {
      // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    }
  }
</script>
