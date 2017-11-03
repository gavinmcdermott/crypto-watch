<template>
  <div>
    <h4>{{currency.name}} Transaction Tile</h4>
    <p>Type: {{type}}</p>
    <p>Is Valid: {{valid}}</p>
    <p>Tile state: {{state}}</p>

    <div v-if="state === STATE_TYPES.INITIAL">
      Should be initial... {{state}}
    </div>

    <div v-if="state === STATE_TYPES.SUCCESS">
      Should be success... {{state}}
    </div>

    <div v-if="state === STATE_TYPES.ERROR">
      Should be error... {{state}}
    </div>

    <div v-if="state === STATE_TYPES.INFO">
      Should be info... {{state}}
    </div>

    <button v-on:click="update">Update</button>
    <hr>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { log, logError } from '../../common/debug'
  import { SET_CHECKLIST_ITEM_STATE } from '../../constants/vue/mutation-types'
  import ITEM_STATES from '../../constants/vue/checklists/item-states'

  export default {
    name: 'currency-tile',
    props: {
      index: {
        type: Number,
        required: true,
      },
      validator: {
        type: Function,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        default: ITEM_STATES.INITIAL
      },
      stateData: {
        type: Object,
        required: true,
      },
    },
    methods: {
      update () {
        this.$store.commit(SET_CHECKLIST_ITEM_STATE, {
          type: this.type,
          newState: ITEM_STATES.INFO
        })
      }
    },
    computed: {
      STATE_TYPES () {
        return ITEM_STATES
      },
      currency () {
        return this.$store.getters.currency
      },
      valid () {
        return this.validator()
      },
    }
  }
</script>

<style scoped>

</style>
