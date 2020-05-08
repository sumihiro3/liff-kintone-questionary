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
      //- ShareTargetPicker
      div.m-4
        b-button(
          variant="info"
          @click="shareApp"
          block
        )
          b-icon.mr-2(icon="box-arrow-up" aria-hidden="true")
          | Share
      //- Answer again
      div.m-4
        b-button(
          variant="secondary"
          @click="answerAgain"
          block
        )
          b-icon.mr-2(icon="arrow-repeat" aria-hidden="true")
          | もう一度回答する
    questionary-form(
      v-else
      @sendQuestionaryAnswer="sendQuestionaryAnswer"
    )
</template>

<script>
import consola from 'consola'
import QuestionaryForm from '~/components/QuestionaryForm'
import getLineUserId from '~/utils/liff'
import shareMessage from '~/assets/shareMessage.json'

export default {
  components: {
    QuestionaryForm
  },
  data() {
    return {
      lineUserId: 'dummyUser',
      addAnswerResult: {
        code: null,
        message: null
      }
    }
  },
  async mounted() {
    this.$store.dispatch('progressCircleOn')
    const lineUserId = await getLineUserId()
    if (!lineUserId) {
      if (process.env.SKIP_LOGIN === 'true') {
        consola.warn('Skip LINE Login because of SKIP_LOGIN is set.')
      } else {
        consola.log('Need to login!')
        // eslint-disable-next-line no-undef
        liff.login()
      }
    } else {
      this.lineUserId = lineUserId
    }
    this.$store.dispatch('progressCircleOff')
  },
  methods: {
    async sendQuestionaryAnswer(answer) {
      consola.log('sendQuestionaryAnswer@index.vue called!')
      this.$store.dispatch('progressCircleOn')
      consola.log('Answer', answer)
      const data = {
        userId: this.lineUserId,
        answer
      }
      const result = await this.$axios.post('/api/questionaryAnswer', data)
      consola.log('API QuestionaryAnswer result', result)
      this.addAnswerResult = result.data
      let toastId = 'failed-toast'
      if (this.addAnswerResult.code === '0000') {
        toastId = 'success-toast'
      }
      this.$store.dispatch('progressCircleOff')
      this.$bvToast.show(toastId)
    },
    answerAgain() {
      consola.log('answerAgain called!')
      this.addAnswerResult.message = null
      this.addAnswerResult.code = null
    },
    shareApp() {
      consola.log('shareApp called!')
      // this.launchShareTargetPicker()
    },
    launchShareTargetPicker() {
      consola.log('launchShareTargetPicker called!')
      // eslint-disable-next-line no-undef
      if (liff.isApiAvailable('shareTargetPicker')) {
        const msg = JSON.parse(JSON.stringify(shareMessage))
        // Overwrite LIFF URL
        const liffUrl = `https://liff.line.me/${process.env.LIFF_ID}`
        consola.info('LIFF URL', liffUrl)
        msg.footer.contents[0].action.uri = liffUrl
        consola.log('Share message', msg)
        // eslint-disable-next-line no-undef
        liff
          .shareTargetPicker([
            {
              type: 'flex',
              altText: '在宅勤務アンケート',
              contents: msg
            }
          ])
          .then(consola.log('ShareTargetPicker was launched'))
          .catch(function(res) {
            consola.log('Failed to launch ShareTargetPicker')
          })
      }
    }
  }
}
</script>
