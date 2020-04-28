<template lang="pug">
  b-container(fluid)
    div
      b-toast(
        id="success-toast"
        title="Success!"
        variant="success"
      )
        | ご回答有り難うございました！！
      b-toast(
        id="failed-toast"
        title="API Failed"
        variant="danger"
      )
        | {{ addAnswerResult.message }}
    div(
      v-if="addAnswerResult.code === '0000'"
    )
      | ご回答ありがとうございました！
    questionary-form(
      v-else
      @sendQuestionaryAnswer="sendQuestionaryAnswer"
    )
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
      userId: 'user000',
      addAnswerResult: {
        code: null,
        message: null
      }
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
  },
  methods: {
    async sendQuestionaryAnswer(answer) {
      consola.log('sendQuestionaryAnswer@index.vue called!')
      consola.log('Answer', answer)
      const data = {
        userId: this.userId,
        answer
      }
      const result = await this.$axios.post('/api/questionaryAnswer', data)
      consola.log('API QuestionaryAnswer result', result)
      this.addAnswerResult = result.data
      let toastId = 'failed-toast'
      if (this.addAnswerResult.code === '0000') {
        toastId = 'success-toast'
      }
      this.$bvToast.show(toastId)
    }
  }
}
</script>

<style></style>
