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
      <!-- <div class="mb-3">
        <label class="form-label text-start d-block">ID</label>
        <input
          type="text"
          class="form-control"
          id="bookId"
          v-model="bookId"
          required
        />
        <div class="invalid-feedback text-start">
          書籍IDを入力してください。
        </div>
      </div> -->
      <div class="mb-3">
        <label class="form-label text-start d-block">タイトル</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="title"
          required
        />
        <div class="invalid-feedback text-start">
          タイトルを入力してください。
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label text-start d-block">価格</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="price"
          required
        />
        <div class="invalid-feedback text-start">価格を入力してください。</div>
      </div>
      <div class="mb-3">
        <label class="form-label text-start d-block">出版状況</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="publishStatus"
            id="publishStatus0"
            value="0"
            v-model="publishStatus"
            required
          />
          <div class="col-2 text-start">
            <label class="form-check-label text-start" for="publishStatus0">
              未出版
            </label>
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="publishStatus"
            id="publishStatus1"
            value="1"
            v-model="publishStatus"
            required
          />
          <div class="col-2 text-start">
            <label class="form-check-label text-start" for="publishStatus1">
              出版済
            </label>
          </div>
          <div class="invalid-feedback text-start">
            出版状況を選択してください。
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label text-start d-block">著者</label>
        <div
          v-if="authors.length == 0"
          class="text-start"
          style="color: #dc3455"
        >
          著者を選択してください。
        </div>
        <div v-for="(author, index) in authors" :key="index" class="row mb-3">
          <div class="col-9">
            <select
              :id="'author' + author.id"
              class="form-select"
              v-model="author.id"
              :class="{
                'is-invalid': author.id == '0' || hasDuplication(author.id),
              }"
              required
            >
              <option value="0">--未選択--</option>
              <option
                v-for="authorPulldown in authorsPulldown"
                :key="authorPulldown.id"
                :value="authorPulldown.id"
              >
                {{ authorPulldown.name }}
              </option>
            </select>
            <div v-if="author.id == '0'" class="invalid-feedback text-start">
              著者を選択してください。
            </div>
            <div
              v-if="hasDuplication(author.id)"
              class="invalid-feedback text-start"
            >
              著者が重複しています。
            </div>
          </div>
          <div class="col-3">
            <button
              class="btn btn-danger col w-75"
              @click="deletePulldown(index)"
              type="button"
            >
              削除
            </button>
          </div>
        </div>
      </div>
      <a class="text-start d-block" @click="addPulldown">プルダウンを追加</a>
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
      bookId: "",
      title: "",
      price: "",
      publishStatus: "",
      publishStatusName: "",
      authors: [],
      authorsPulldown: [],
    };
  },
  methods: {
    publishStatusDisabled(publishStatus) {
      return publishStatus == "1" ? true : false;
    },
    hasDuplication(authorId) {
      return this.authors.filter((author) => author.id == authorId).length > 1;
    },
    onSubmit() {
      this.submitted = true;

      // 著者が「未選択」の時または重複があるときエラー
      const inValidAuthors = this.authors.some(
        (author) => author.id == "0" || this.hasDuplication(author.id)
      );

      // 著者が一人も追加されていない時エラー
      const authorsZero = this.authors.length == 0 ? true : false;

      const form = this.$refs.formElement;
      if (!form.checkValidity() || inValidAuthors || authorsZero) {
        return;
      }
      this.updateBook();
    },
    getPulldown() {
      const url = "/pulldown/authors";
      axios
        .get(url)
        .then((result) => {
          this.authorsPulldown = result.data;
        })
        .catch((error) => {
          console.error("Error during request: ", error);
        });
    },
    addPulldown() {
      this.authors.push({ id: 0 });
    },
    deletePulldown(index) {
      this.authors.splice(index, 1);
    },
    updateBook() {
      const url = "/books/create";
      let authorsIds = this.authors.map((author) => author.id);
      const requestData = {
        title: this.title,
        price: this.price,
        publishStatus: this.publishStatus,
        authorsIds: authorsIds,
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
  },
  mounted() {
    this.getPulldown();
  },
};
</script>
