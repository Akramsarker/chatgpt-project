<template>
  <div class="about-page">
    <h1>Hello World! This is About Page....</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';
.about-page {
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>
