<template>
  <div
    class="modal fade"
    id="completeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="completeModalLabel">完了</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{message}}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompleteModal",
  data() {
    return {
      message: ''
    }
  },
  methods: {
    show(message) {
      this.message = message
      const modal = new bootstrap.Modal(document.getElementById("completeModal"));
      modal.show();
    },
  },
};
</script>
