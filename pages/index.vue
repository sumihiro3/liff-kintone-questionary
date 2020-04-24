<template lang="pug">
  v-container
    div
      questionary-form
    div {{ response }}
</template>

<script>
import consola from 'consola'
import QuestionaryForm from '~/components/QuestionaryForm'

export default {
  components: {
    QuestionaryForm
  },
  data() {
    return {
      response: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/test')
      .then((response) => {
        this.response = response.test
      })
      .catch((error) => {
        consola.log(error)
      })
  }
}
</script>
