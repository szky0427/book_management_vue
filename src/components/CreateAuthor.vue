<template>
  <form
    ref="formElement"
    class="needs-validation d-flex justify-content-center flex-column align-items-center vh-100"
    novalidate
    @submit.prevent="onSubmit"
    :class="{ 'was-validated': submitted }"
  >
    <div class="w-75 text-start mb-3 mt-4">
      <button
        class="btn btn-secondary"
        type="button"
        onclick="window.history.back();"
      >
        ＜ 戻る
      </button>
    </div>
    <div class="alert alert-primary w-75">
      <div class="mb-3">
        <label class="form-label text-start d-block">氏名</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
        />
        <div class="invalid-feedback text-start">
          氏名を入力してください。
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label text-start d-block">生年月日</label>
        <input
          type="date"
          class="form-control"
          id="birthDate"
          v-model="birthDate"
          required
          :class="{'is-invalid': submitted && !isBeforeToday(birthDate)}"
        />
        <div class="invalid-feedback text-start">生年月日を入力してください。</div>
        <div class="invalid-feedback text-start" v-if=" submitted && !isBeforeToday(birthDate)">生年月日は今日より過去日を入力してください。</div>
      </div>
      <hr />
      <div class="row">
        <button
          class="btn btn-secondary col m-2"
          type="button"
          onclick="window.history.back();"
        >
          戻る
        </button>
        <button class="btn btn-primary col m-2" type="submit">登録</button>
      </div>
    </div>
  </form>
  <CompleteModal ref="completeModal" />
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import CompleteModal from "./CompleteModal.vue";

export default {
  name: "CreateBook",
  components: {
    CompleteModal,
  },
  data() {
    return {
      submitted: false,
      authorId: "",
      name: "",
      birthDate: ""
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      const form = this.$refs.formElement;
      if (form.checkValidity() && this.isBeforeToday(this.birthDate)) {
        this.createAuthor();
      }
    },
    isBeforeToday(birthDate) {
      if (!birthDate) return false;
      const today = new Date();
      let date = new Date(birthDate);
      return today > date
    },
    createAuthor() {
      const url = "/authors/create";
      const requestData = {
        name: this.name,
        birthDate: this.birthDate,
      };
      axios
        .post(url, requestData)
        .then((result) => {
          this.$refs.completeModal.show(result.data);
        })
        .catch((error) => {
          console.error("Error during request: ", error);
        });
    },
  }
};
</script>
