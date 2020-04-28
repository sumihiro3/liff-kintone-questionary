<template lang="pug">
  b-container(fluid)
    b-navbar(toggleable="xl" type="dark" variant="primary" fixed="top")
      b-navbar-brand(href="#")
        | {{ title }}
      b-navbar-toggle(target="nav-collapse")
      b-collapse(id="nav-collapse" is-nav)
        b-navbar-nav
          b-nav-item(href="https://linecorp.com/ja/" target="_blank")
            | LINE
          b-nav-item(href="https://kintone.cybozu.co.jp/" target="_blank")
            | kintone
    b-row.p-4
      | &nbsp;
    b-row
      nuxt
    b-overlay(
      :show="showProgressCircle"
      z-index="9999"
      blur="2"
      type="grow"
      spinner-variant="secondary"
      no-wrap
    )
    b-row.p-4
      | &nbsp;
    b-navbar(toggleable="lg" type="dark" variant="secondary" fixed="bottom")
      small.text-light
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

<style></style>
