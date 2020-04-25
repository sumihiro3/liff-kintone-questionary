<template lang="pug">
  b-container(fluid)
    h1
      | {{ response }}
    b-form-select(
      v-model="selected"
      :options="options"
    )
    div.mt-3.mb-0
      | {{ selected }}
    b-form-textarea(
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    )
    div.mt-3.mb-0
      | {{ text }}
    div.ma-2
      b-button.mr-2(variant="danger")
        | Danger
      b-button.ma-2(variant="success")
        | success
      b-button.ma-2(variant="primary")
        | primary
      b-button.ma-2(variant="secondary")
        | secondary
      b-button.ma-2(variant="info")
        | info
      b-button.ma-2(variant="warning")
        | Warning
      b-button.ma-2(variant="light")
        | Light
      b-button.ma-2(variant="dark")
        | dark
</template>

<script>
import consola from 'consola'
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  },
  data() {
    return {
      options: [
        '農業，林業',
        '漁業',
        '鉱業，採石業，砂利採取業',
        '建設業',
        '製造業',
        '電気・ガス・熱供給・水道業',
        '情報通信業',
        '運輸業，郵便業',
        '卸売業・小売業',
        '金融業・保険業',
        '不動産業，物品賃貸業',
        '学術研究，専門・技術サービス業',
        '宿泊業，飲食サービス業',
        '生活関連サービス業，娯楽業',
        '教育，学習支援業',
        '医療，福祉',
        '複合サービス事業',
        'サービス業（他に分類されないもの）',
        '公務（他に分類されるものを除く）',
        '分類不能の産業'
      ],
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
