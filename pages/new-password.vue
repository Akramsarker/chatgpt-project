<template>
  <div class="container">
    <div class="sign-in-container">
      <p v-if="error" class="error-message">
        {{ error }}
      </p>
      <div class="anima-section">
        <div class="avatar-card">
          <img src="~/static/avatar.png" alt="Avatar" />
        </div>
        <div class="sign-up-header">
          <h1 class="header-name">Enter new password</h1>
          <p>
            Please enter a new password that you <br />
            want to use for your account
          </p>
        </div>
        <div class="sign-in-field">
          <div class="input-field">
            <input
              v-model="password"
              type="password"
              placeholder="Enter your new password"
            />
          </div>
          <div class="input-field">
            <input
              v-model="repeatPassword"
              type="password"
              placeholder="Repeat your new password"
            />
          </div>
        </div>
        <div class="sign-in-btn">
          <button class="sign-in" @click="newPassword">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      password: '',
      repeatPassword: '',
      error: '',
    }
  },
  methods: {
    newPassword() {
      if (this.checkPassword()) {
        const auth = firebase.auth()
        const code = this.$route.query.oobCode
        auth
          .confirmPasswordReset(code, this.password)
          .then(() => {
            this.$router.replace({ name: 'signin' })
          })
          .catch((error) => {
            this.error = error.message
          })
      }
    },
    checkPassword() {
      if (this.password === this.repeatPassword) {
        return true
      } else {
        this.error = 'Please input same password'
        this.password = ''
        this.repeatPassword = ''
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';
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

.sign-in-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
  .error-message {
    font-size: 1rem;
    color: red;
    padding-bottom: 1rem;
  }
  .anima-section {
    text-align: center;
    .avatar-card {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .sign-up-header {
      .header-name {
        line-height: 36px;
        font-weight: 600;
        font-size: 33px;
        color: rgb(255, 255, 255);
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        margin-top: 16px;
        margin-bottom: 4rem;
        color: rgb(255, 255, 255);
      }
    }
    .sign-in-btn {
      .sign-in {
        background-color: rgb(255, 255, 255);
        border-radius: 50px;
        padding: 0.7rem 2.2rem;
        outline: none;
        border: none;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        cursor: pointer;
        opacity: 0.5;
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>
