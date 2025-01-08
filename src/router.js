import { createRouter, createWebHistory } from "vue-router";
import BookSearch from "./components/BookSearch.vue";
import UpdateBook from "./components/UpdateBook.vue";
import CreateBook from "./components/CreateBook.vue";
import AuthorSearch from "./components/AuthorSearch.vue";
import UpdateAuthor from "./components/UpdateAuthor.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "searchBooks",
      component: BookSearch,
    },
    {
      path: "/book/:bookId",
      name: "updateBook",
      component: UpdateBook,
    },
    {
      path: "/book/create",
      name: "createBook",
      component: CreateBook,
    },
    {
      path: "/author",
      name: "searchAuthors",
      component: AuthorSearch,
    },
    {
      path: "/author/:authorId",
      name: "updateAuthor",
      component: UpdateAuthor,
    },
  ],
});
