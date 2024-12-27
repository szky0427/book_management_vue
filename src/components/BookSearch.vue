<template>
  <table class="table table-primary w-75" align="center">
    <tbody>
      <tr>
        <th align="center">タイトル</th>
        <td align="center">
          <div class="col-sm-7">
            <input
              class="form-control"
              type="text"
              id="title"
              v-model="title"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th align="center">書籍ID</th>
        <td align="center">
          <div class="col-sm-7">
            <input
              class="form-control"
              type="number"
              id="bookId"
              v-model="bookId"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th align="center">著者名</th>
        <td align="center">
          <div class="col-sm-7">
            <input
              class="form-control"
              type="text"
              id="authorName"
              v-model="authorName"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <button
    id="search_plan"
    class="btn btn-primary"
    type="button"
    @click="searchBooks"
  >
    検索する
  </button>
  <hr />
  <table class="table table-striped w-75 table-hover" align="center">
    <tbody>
      <tr>
        <th align="center">ID</th>
        <th align="center">タイトル</th>
        <th align="center">価格</th>
        <th align="center">出版状況</th>
        <th align="center">著者</th>
      </tr>
      <tr
        v-for="(book, key) in responsedbooks"
        v-bind:key="key"
        @click="showUpdatePage(book.id)"
      >
        <td align="center">{{ book.id }}</td>
        <td align="center">{{ book.title }}</td>
        <td align="center">{{ book.price }}</td>
        <td align="center">{{ book.publishStatusName }}</td>
        <td align="center">
          <div v-for="(author, key) in book.authors" v-bind:key="key">
            {{ author.name }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "BookSearch",
  data() {
    return {
      title: "",
      bookId: "",
      authorName: "",
      responsedbooks: [],
    };
  },
  methods: {
    searchBooks() {
      const url = "/books/?";
      const params = new URLSearchParams();
      if (this.title) params.append("title", this.title);
      if (this.bookId) params.append("bookId", this.bookId);
      if (this.authorName) params.append("authorName", this.authorName);

      axios
        .get(url + params.toString())
        .then((result) => {
          this.responsedbooks = result.data;
        })
        .catch((error) => {
          console.error("Error during request: ", error);
        });
    },
    showUpdatePage(bookId) {
      this.$router.push({
        name: "updateBook",
        params: { bookId: bookId },
      });
    },
  },
};
</script>
