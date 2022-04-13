<template>
  <div class="sign-in-page">
    <h1 class="heading-text">Sign in</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form class="form-section" @submit.prevent="signInWithEmail">
      <div class="input-field">
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="email" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
      <p class="or">Or</p>
      <button class="btn btn-tertiary google" @click="signInWithGoogle()">
        <!-- <img src="../assets/google.webp" /> -->
        <span>Continue with Google</span>
      </button>
      <button class="btn btn-primary facebook" @click="signInWithFacebook()">
        <!-- <img src="../assets/facebook.svg" /> -->
        <span>Continue with Facebook</span>
      </button>
      <p>
        <nuxt-link class="nuxt-link" to="/signup">Sign up </nuxt-link>
        <nuxt-link class="nuxt-link text-color" to="/reset-password">
          Forgot password?</nuxt-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    signInWithEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          const email = data.user.email
          this.$store.commit('setUserEmail', email)
          this.$router.push({ name: 'index' })
        })
        .catch(() => {
          this.error =
            'Sorry, the email address and/or password are not correct. Try again or reset your password.'
        })
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          this.$router.push({ name: 'index' })
        })
        .catch(function () {
          this.error = 'Sorry, something went wront. Please try again'
        })
    },
    signInWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const token = result.credential.accessToken
          // eslint-disable-next-line no-console
          console.log(result.user)
          localStorage.setItem('facebookAccessToken', token)
          this.$router.push({ name: 'index' })
        })
        .catch(() => {
          // Handle Errors here.
          this.error = 'Sorry, something went wront. Please try again'
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';

.sign-in-page {
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
      padding: 2rem;
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
    .or {
      padding: 0.5rem 0;
    }
    .google {
      color: black;
      margin-bottom: 1rem;
      &:hover {
        color: white;
      }
    }
    .facebook {
      background-color: #3a559f;
      margin-bottom: 1rem;
      &:hover {
        opacity: 0.9;
      }
    }

    p {
      font-size: 0.9rem;
      text-align: center;
      .nuxt-link {
        color: #000000;
      }
      .text-color {
        color: red;
        margin-left: 1rem;
      }
    }
  }
}
</style>
