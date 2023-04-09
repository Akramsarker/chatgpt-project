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

export default {
  components: {
    AppHeader,
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
</style>
