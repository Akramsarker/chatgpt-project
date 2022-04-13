<template>
  <div class="new-password-page">
    <h1 class="heading-text">Input new password</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form class="form-section" @submit.prevent="newPassword()">
      <div class="input-field">
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <div class="input-field">
        <input
          v-model="password1"
          type="password"
          placeholder="Retype password"
        />
      </div>
      <button class="btn btn-primary" type="submit">Send</button>
      <p>We will send you a reset link on your mail.</p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      password: '',
      password1: '',
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
      if (this.password === this.password1) {
        return true
      } else {
        this.error = 'Please input same password'
        this.password = ''
        this.password1 = ''
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/style.scss';
.new-password-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: $font-primary;
  @include responsive(phone) {
    height: 100%;
    padding: 0 1rem;
  }
  .heading-text {
    margin-bottom: 2rem;
    font-size: 2rem;
    @include responsive(phone) {
      font-size: 1.5rem;
    }
  }
  .error-message {
    margin-bottom: 1rem;
    color: red;
    max-width: 500px;
    line-height: 1.6;
  }
  .form-section {
    display: flex;
    flex-direction: column;
    padding: 3rem 4rem;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    @include responsive(phone) {
      padding: 1rem 2rem;
    }
    .input-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      label {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
    }
    p {
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  }
}
</style>
