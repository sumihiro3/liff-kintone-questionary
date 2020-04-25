<template lang="pug">
  b-container(fluid)
    h1
      | {{ response }}
    questionary-form
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
      text: '',
      response: null,
      selected: null
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

<style></style>
