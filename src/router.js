import { createRouter, createWebHistory } from "vue-router";
import BookSearch from "./components/BookSearch.vue";
import UpdateBook from "./components/UpdateBook.vue";
import CreateBook from "./components/CreateBook.vue";

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
  ],
});
