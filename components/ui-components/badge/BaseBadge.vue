<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title;
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.paid {
  background-color: #5c7ae84d;
  color: #5c7ae8;
}

.expired {
  background-color: #e33e2b4d;
  color: #e33e2b;
}

.pending {
  background-color: #fef5e6;
  color: #fead1e;
}
</style>
