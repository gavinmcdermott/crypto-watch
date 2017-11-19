<template>
  <div>
    <app-header></app-header>
    <app-errors></app-errors>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from './AppFooter'
  import AppHeader from './AppHeader'
  import AppErrors from './AppErrors'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    components: {
      AppHeader,
      AppFooter,
      AppErrors,
    },
    beforeCreate () {
      this.$router.push('/home')
    },
    mounted () {
      // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    }
  }
</script>
