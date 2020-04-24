<template lang="pug">
  v-container
    div
      | Form
    div
      | {{ formData.selected }}
    div
      v-select(
        :options="options"
        :searchable="searchable"
        v-model="formData.selected"
      )
    div
      v-btn(
        @click="searchable = !searchable"
      )
        | Searchable = {{ searchable }}
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
export default {
  components: {
    vSelect
  },
  // props: {
  //   items: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {
      searchable: true,
      options: ['農業，林業', '漁業', '鉱業，採石業，砂利採取業', '建設業'],
      formData: {
        selected: null
      }
    }
  },
  methods: {}
}
</script>
