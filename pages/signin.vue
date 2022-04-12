<template>
  <div class="login">
    <h2>Sign in</h2>
    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="signInWithEmail">
      <div class="email">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="email" />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
      <p>Or</p>

      <p class="btn btn-tertiary google" @click="signInWithGoogle()">
        <!-- <img src="../assets/google.webp" />  -->
        <span>Continue with Google</span>
      </p>
      <p class="btn btn-primary facebook" @click="signInWithFacebook()">
        <!-- <img src="../assets/facebook.svg" /> -->
        <span>Continue with Facebook</span>
      </p>

      <p>
        <router-link to="/signup">Sign up </router-link>
        <router-link
          style="margin-left: 1rem; color: rgba(0, 0, 0, 0.7)"
          to="/reset-password"
        >
          Forgot password?</router-link
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

.login {
  @extend %proper-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  box-sizing: border-box;
  h2 {
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
  .error {
    margin-bottom: 1rem;
    color: red;
    max-width: 500px;
    line-height: 1.6;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 4rem 8rem;
    margin-bottom: 2rem;
    @include responsive(phone) {
      padding: 2rem;
    }
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    .email,
    .password {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 1rem;
      label {
        margin-bottom: 0.5rem;
      }
    }
    p.btn {
      display: flex;
      align-items: center;
      img {
        height: 1.5rem;
        margin-right: 0.5rem;
      }
    }
    .google {
      color: black;
      margin-bottom: 0;
      margin-top: 0;
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
      a {
        display: inline;
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
</style>
