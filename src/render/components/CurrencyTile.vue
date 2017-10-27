<template>
  <div>
    <h4>Currency: {{currency.name}}</h4>
    <div>
      {{states[state]}}
    </div>
    <button v-on:click="update">Update</button>
    <hr>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { log, logError } from '../../common/debug'
  import { SET_CHECKLIST_ITEM_STATE } from '../constants/mutation-types'
  import ITEM_STATES from '../constants/checklists/item-states'

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
      state: {
        type: String,
        required: true,
        default: 'initial' // move into a constants file :)
      },
      states: {
        type: Object,
        required: true,
      }
    },
    methods: {
      update () {
        this.$store.commit(SET_CHECKLIST_ITEM_STATE, {
          title: this.title,
          newState: ITEM_STATES.SUCCESS
        })
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
