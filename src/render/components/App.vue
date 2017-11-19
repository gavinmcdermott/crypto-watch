<template>
  <div>
    <app-header></app-header>
    <app-errors></app-errors>

    <div class="body">
      <div class="container body--container">
        <router-view></router-view>
      </div>
    </div>

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
      this.$router.push('/information')
    },
    mounted () {
      // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    }
  }
</script>
