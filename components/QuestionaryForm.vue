<template lang="pug">
  b-container.m-0.p-0(fluid)
    b-form-row.mt-3
      b-form-group(
        id="form-group-select-industory"
        label-for="select-industory"
      )
        div.h6
          b-icon.mr-1(icon="building" variant="secondary")
          span
            | Q1. 業種(1つを選択)
        b-form-select.ml-2(
          id="select-industory"
          v-model="formSlected.industry"
          :options="industries"
        )
    b-form-row.mt-3
      b-form-group(
        id="form-group-select-employment-status"
        label-for="select-employment-status"
      )
        div.h6
          b-icon.mr-1(icon="bag" variant="secondary")
          span
            | Q2. 雇用形態(1つを選択)
        b-form-radio-group.ml-3(
          id="select-employment-status"
          v-model="formSlected.employmentStatus"
          :options="employmentStatuses"
          class="mb-4"
          size="md"
          stacked
        )
    b-form-row.mt-3
      b-form-group(
        id="form-group-select-work-system"
        label-for="select-work-system"
      )
        div.h6
          b-icon.mr-1(icon="laptop" variant="secondary")
          span
            | Q3. 現在の勤務体制(1つを選択)
        b-form-radio-group.ml-3(
          id="select-work-system"
          v-model="formSlected.workSystem"
          :options="workSystems"
          class="mb-4"
          size="md"
          stacked
        )
    b-form-row.mt-3
      b-form-group(
        id="form-group-checkbox-troubles"
        label-for="checkbox-troubles"
      )
        div.h6
          b-icon.mr-1(icon="exclamation-circle" variant="secondary")
          span
            | Q4. 困っていること(複数選択)
        b-form-row.mt-0
          b-form-checkbox-group.ml-4(
            id="checkbox-troubles"
            v-model="formSlected.troubles"
            :options="InTroubles"
            class="mb-4"
            size="md"
            stacked
          )
    b-form-row.mt-3
      b-form-group(
        id="form-group-textarea-memo"
        label-for="textarea-memo"
      )
        div.h6
          b-icon.mr-1(icon="pencil-square" variant="secondary")
          span
            | Q5. 上記以外の困っていること、要望、リクエスト等(自由記述)
        b-form-textarea(
          id="textarea-memo"
          v-model="formSlected.memo"
          placeholder="ご自由に入力してください"
          rows="4"
          max-rows="6"
        )
    b-form-row.mt-3
      b-button.m-4(
        variant="secondary"
        :disabled="!readyToSendFormData"
        block
      )
        | Send
    //- Selected values
    b-form-row.mt-3
      div
        | {{ formSlected }}
</template>

<script>
export default {
  components: {
    // Logo
  },
  data() {
    return {
      formSlected: {
        industry: null,
        employmentStatus: null,
        workSystem: null,
        troubles: [],
        memo: ''
      },
      industries: [
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
      employmentStatuses: [
        '正社員',
        '正社員以外(契約社員、嘱託社員等)',
        '常用型派遣労働者',
        '登録型派遣労働者'
      ],
      workSystems: [
        '在宅勤務',
        '時短勤務(フレックス含む)',
        '出勤(変化無し)',
        '休暇'
      ],
      InTroubles: ['食事', '通院', '健康', '育児', '仕事', '介護', 'その他']
    }
  },
  computed: {
    readyToSendFormData() {
      let result = false
      if (
        this.formSlected.industry &&
        this.formSlected.employmentStatus &&
        this.formSlected.workSystem &&
        this.formSlected.troubles.length > 0
      ) {
        result = true
      }
      return result
    }
  },
  mounted() {}
}
</script>
