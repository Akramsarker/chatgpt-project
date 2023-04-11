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
        <div class="sign-in-field">
          <div class="input-field">
            <input v-model="email" type="email" placeholder="Email" />
          </div>
          <div class="input-field">
            <input v-model="password" type="password" placeholder="Password" />
          </div>
        </div>
        <div class="sign-in-btn">
          <button class="sign-in" @click="signInWithEmail">Log In</button>
          <div class="router-link-btn">
            <nuxt-link class="router-link" to="/reset-password"
              >Forgot Password?</nuxt-link
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
          this.$router.push({ name: 'success' })
          this.confetty()
        })
        .catch(() => {
          this.error =
            'Sorry, the email address and/or password are not correct. Try again or reset your password.'
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
      .router-link-btn {
        margin-top: 1.5rem;
        .router-link {
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
