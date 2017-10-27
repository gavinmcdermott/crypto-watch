<template>
  <div>
    <h4>Currency: {{currency.name}}</h4>
    <div>
      {{states[currentState]}}
    </div>
    <hr>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { log, logError } from '../../common/debug'
  import { SET_CURRENCY } from '../constants/mutation-types'

  export default {
    name: 'currency-tile',
    props: {
      index: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      currentState: {
        type: String,
        required: true,
        default: 'initial' // move into a constants file :)
      },
      states: {
        type: Object,
        required: true
      }
    },
    computed: {
      currency () {
        return this.$store.getters.currency
      }
    }
  }
</script>

<style scoped>

</style>
