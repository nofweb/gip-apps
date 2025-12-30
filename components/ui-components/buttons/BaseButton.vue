<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button {
  display: block;
  padding: 1.25rem 3rem 1.25rem 3rem;
  border-radius: 10px;
  /* border: 1px solid #bcbcbc; */
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
}

.colored {
  background: #a6ce39;
  color: #ffff;
}
.colored-2 {
  background: #d9d9d9;
  color: #000000;
}

.download {
  background: #ffffff;
  color: #000000;
  padding-right: 6rem;
}
</style>
