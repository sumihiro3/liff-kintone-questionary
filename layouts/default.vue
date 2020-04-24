<template lang="pug">
  v-app
    v-app-bar(fixed app color="primary")
      v-toolbar-title.white--text.font-weight-black(v-text="title")
      v-spacer
    v-content
      v-container
        nuxt
      //- Progress Circle
      v-overlay(:value="showProgressCircle" style="z-index:9999")
        v-progress-circular(
          :size="64"
          color="accent"
          indeterminate
        )
    v-footer(:fixed="fixed" app)
      span
        | &copy; {{ new Date().getFullYear() }} LINE Developer Community
</template>

<script>
import consola from 'consola'
export default {
  data() {
    return {
      fixed: false,
      title: 'アンケートシステム'
    }
  },
  computed: {
    showProgressCircle() {
      return this.$store.state.showProgressCircle
    }
  },
  mounted() {
    consola.log('USE_VCONSOLE', process.env.USE_VCONSOLE)
    if (process.env.USE_VCONSOLE === 'true') {
      consola.log('Initializing vConsole')
      this.initVconsole()
    }
  },
  methods: {
    initVconsole() {
      // vConsoleをイニシャライズ
      /* eslint no-unused-vars: 0 */
      const vconsole = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 1000,
        onReady() {
          consola.log('vConsole is ready.')
        },
        onClearLog() {
          consola.log('on clearLog')
        }
      })
    }
  }
}
</script>
