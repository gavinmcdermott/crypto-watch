<template>
  <li>
    <div class="tab--container">
      <div @click="navigate" class="tab" v-bind:class="{ 'tab__active': isActive }">
        <div>
          {{name}}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    methods: {
      navigate () {
        this.$router.push({ path: this.name })
      },
    },
    computed: {
      isActive () {
        return this.$route.name === this.name
      },
    }
  }
</script>
