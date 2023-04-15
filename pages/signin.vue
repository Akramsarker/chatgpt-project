<template>
  <div class="container">
    <div class="sign-in-container">
      <p v-if="error" class="error-message">
        {{ error }}
      </p>
      <div class="sign-in-section">
        <div class="avatar-card">
          <img
            src="https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
            alt="Avatar"
          />
        </div>
        <div class="profile-info">
          <h1 class="friend-name">Login</h1>
        </div>
        <div class="sign-in-field">
          <div class="input-field">
            <input v-model="email" type="email" placeholder="Email" />
          </div>
          <div class="input-field">
            <input
              v-model="password"
              class="mb-1"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="forget-link-btn">
          <div></div>
          <div>
            <nuxt-link class="forget-router-link" to="/reset-password"
              >Forget Password?</nuxt-link
            >
          </div>
        </div>
        <div class="login-section">
          <button class="m-r login-btn" @click="signInWithFacebook">
            <svg
              width="20"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
          </button>
          <button class="login-btn" @click="signInWithGoogle">
            <img class="google-logo" src="~/static/google.png" alt="" />
          </button>
        </div>
        <div class="login-with-others">
          <div class="sign-in-button">
            <button
              class="btn-primary"
              :disabled="email == '' || password == ''"
              @click="signInWithEmail"
            >
              {{ isLoading ? 'Log Ing...' : 'Log In' }}
            </button>
          </div>
          <div class="router-link-btn">
            <nuxt-link class="router-link" to="/signup"
              >Create Account With Email</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JSConfetti from 'js-confetti'
import firebase from 'firebase/app'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    }
  },
  methods: {
    async signInWithEmail() {
      try {
        this.isLoading = true
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            const email = data.user.email
            this.$store.commit('setUserEmail', email)
            this.$router.push({ name: 'success' })
            this.confetty()
          })
      } catch (error) {
        this.error =
          'Sorry, the email address and/or password are not correct. Try again or reset your password.'
      } finally {
        this.isLoading = false
      }
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          this.$router.push({ name: 'success' })
          this.confetty()
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
    confetty() {
      const confetti = new JSConfetti()
      confetti.addConfetti({
        // emojis: [
        //   '🌈',
        //   '⚡️',
        //   '💥',
        //   '✨',
        //   '💫',
        //   '🌸',
        //   '🌾',
        //   '🌻',
        //   '🌟',
        //   '♥️',
        //   '💐',
        //   '🌷',
        //   '🌹',
        //   '🌱',
        //   '🌿',
        //   '☘️',
        //   '🍀',
        // ],
        confettiColors: [
          '#ff0a54',
          '#f51966',
          '#ff477e',
          '#ff7e7e',
          '#ff7096',
          '#22c10d',
          '#00ff83',
          '#ff85a1',
          '#0d32e8',
          '#f6ff00',
          '#fbb1bd',
          '#f9bec7',
          '#800080',
          '#F0F8FF',
          '#0000FF',
          '#a546cb',
        ],
        confettiNumber: 500,
        emojiSize: 100,
      })
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
  font-family: $font-primary;
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
.error-message {
  font-size: 14px;
  color: red;
  padding-bottom: 1rem;
}

.sign-in-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
  .sign-in-section {
    text-align: center;
    .sign-in-field {
      margin-bottom: 0;
      .mb-1 {
        margin-bottom: 1rem;
      }
    }
    .avatar-card {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .profile-info {
      .friend-name {
        margin-top: 1.2rem;
        color: #ffffff;
        margin-bottom: 0.8rem;
        font-size: 33px;
        font-weight: 500;
        line-height: 36px;
      }
      h2 {
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
        margin-top: 16px;
      }
    }
    .forget-link-btn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 1.7rem;
      .forget-router-link {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .login-section {
      display: flex;
      justify-content: center;
      justify-items: center;
      margin: 0 0 2.1rem 0;
      .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        padding: 0.7rem;
        border: none;
        outline: none;
        cursor: pointer;
        background: #ffffff;
      }
      .google-logo {
        width: 35px;
      }
      .m-r {
        margin-right: 1.5rem;
      }
    }
    .login-with-others {
      .router-link-btn {
        margin-top: 1.7rem;
        .router-link {
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
          color: rgb(255, 255, 255);
          transition: all 0.3s;
          &:hover {
            color: rgb(255, 255, 255);
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
