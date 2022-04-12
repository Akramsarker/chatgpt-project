<template>
  <div class="main-app-container">
    <AppHeader />
    <nuxt class="page-container" />
    <AppFooter />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import AppHeader from '~/components/app-header.vue'
import AppFooter from '~/components/app-footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.user
    },
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'signin' })
        })
        .catch((error) => console.log(error))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';
.page-container {
  max-width: 1600px;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
}
</style>
