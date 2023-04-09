<template>
  <div class="container">
    <div class="congrats-container">
      <div class="congrats-section">
        <div class="congrats-card">
          <div class="image-container">
            <img :src="user.photoURL" alt="Profile Picture" />
          </div>
          <p class="welcome-message">Welcome!</p>
          <span class="display-name">{{ user.displayName }}</span>
        </div>
        <div class="congrats-info">
          <h2 class="congrats-message">Congratulations!</h2>
          <h2 class="congrats-message m-t">Account Created</h2>
        </div>
        <div class="btn-container">
          <nuxt-link to="/chat-app" class="btn">Go To Chat Page</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto auto;
}

.container::before {
  background: #0a0a0d;
  content: '';
  position: absolute;
  inset: 0px;
  z-index: -100;
  background-image: url('~/static/header-gradient.svg'),
    url('~/static/footer-gradient.svg');
  background-repeat: no-repeat;
  background-position: center top, center bottom;
  background-size: 1400px;
}
.congrats-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .congrats-section {
    text-align: center;
    .congrats-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 240px;
      width: 240px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
      .image-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 50%;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      .welcome-message {
        margin-top: 1rem;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.5);
      }
      .display-name {
        font-size: 1rem;
        color: rgb(255, 255, 255);
        font-weight: 600;
      }
    }
    .congrats-info {
      .congrats-message {
        font-size: 33px;
        margin-top: 2rem;
        color: rgb(255, 255, 255);
        line-height: 36px;
        font-weight: 600;
      }
      .m-t {
        margin-top: 0.6rem;
      }
    }
    .btn-container {
      margin-top: 3rem;
      .btn {
        background: rgb(255, 255, 255);
        border-radius: 23px;
        padding: 0.8rem 2.8rem;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>
