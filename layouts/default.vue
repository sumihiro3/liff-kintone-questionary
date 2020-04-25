<template lang="pug">
  div(fluid)
    div
      b-navbar(toggleable="lg" type="dark" variant="primary")
        b-navbar-brand(href="#")
          | {{ title }}
        b-navbar-toggle(target="nav-collapse")
        b-collapse(id="nav-collapse" is-nav)
          b-navbar-nav
            b-nav-item(href="#")
              | LINE
            b-nav-item(href="#")
              | kintone
    div
      nuxt
      b-overlay(:show="showProgressCircle" z-index="9999" blur="2" no-wrap)
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

<style></style>
