<template>
  <table class="table table-info w-75" align="center">
    <tbody>
      <tr>
        <th align="center">氏名</th>
        <td align="center">
          <div class="col-sm-7">
            <input
              class="form-control"
              type="text"
              id="name"
              v-model="name"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th align="center">著者ID</th>
        <td align="center">
          <div class="col-sm-7">
            <input
              class="form-control"
              type="number"
              id="authorId"
              v-model="authorId"
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
    @click="searchAuthors"
  >
    検索する
  </button>
  <hr />
  <table class="table table-info table-striped w-75 table-hover" align="center">
    <tbody>
      <tr>
        <th align="center">ID</th>
        <th align="center">氏名</th>
        <th align="center">生年月日</th>
      </tr>
      <tr
        v-for="(author, key) in responsedAuthors"
        v-bind:key="key"
        @click="showUpdatePage(author.id)"
      >
        <td align="center">{{ author.id }}</td>
        <td align="center">{{ author.name }}</td>
        <td align="center">{{ author.birthDate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "AuthorSearch",
  data() {
    return {
      name: "",
      authorId: "",
      birthDate: "",
      responsedAuthors: [],
    };
  },
  methods: {
    searchAuthors() {
      const url = "/authors/?";
      const params = new URLSearchParams();
      if (this.name) params.append("name", this.name);
      if (this.authorId) params.append("authorId", this.authorId);
      if (this.birthDate) params.append("birthDate", this.birthDate);

      axios
        .get(url + params.toString())
        .then((result) => {
          this.responsedAuthors = result.data;
        })
        .catch((error) => {
          console.error("Error during request: ", error);
        });
    },
    showUpdatePage(authorId) {
      this.$router.push({
        name: "updateAuthor",
        params: { authorId: authorId },
      });
    },
  },
};
</script>
