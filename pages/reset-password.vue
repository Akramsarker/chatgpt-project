<template>
  <div class="reset-password-page">
    <h1 class="heading-text">Reset password</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form class="form-section" @submit.prevent="resetPassword()">
      <div class="input-field">
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="Enter your email" />
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
      email: '',
      error: '',
    }
  },
  methods: {
    resetPassword() {
      const auth = firebase.auth()
      const emailAddress = this.email

      auth
        .sendPasswordResetEmail(emailAddress, {
          url: location.origin,
          handleCodeInApp: true,
        })
        .then(() => {
          alert('Password reset email sent!')
          this.$router.replace({ name: 'signin' })
          // console.log(response)
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';
.reset-password-page {
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
    font-size: 2rem;
    margin-bottom: 2rem;
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
