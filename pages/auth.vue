<template>
  <div class="auth-page">
    <LoadingSpinner />
  </div>
</template>

<script>
import LoadingSpinner from '~/components/loading-spinner.vue'

export default {
  components: {
    LoadingSpinner,
  },
  middleware: 'redirect',
}
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
</style>
