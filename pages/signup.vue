<template>
  <div class="container">
    <div class="sign-up-container">
      <p v-if="error" class="error-message">
        {{ error }}
      </p>
      <div class="anima-section">
        <div class="avatar-card">
          <img
            src="https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
            alt="Avatar"
          />
        </div>
        <div class="sign-up-header">
          <h1 class="header-name">Create Account</h1>
          <p>
            Create an account to save your progress and <br />
            get access to conversations on other devices
          </p>
        </div>
        <div class="sign-up-field">
          <div class="input-field">
            <input v-model="email" type="email" placeholder="Email" />
          </div>
          <div class="input-field">
            <input v-model="password" type="password" placeholder="Password" />
          </div>
          <div class="input-field">
            <input
              v-model="repeatPassword"
              type="password"
              placeholder="Repeat Password"
            />
          </div>
        </div>
        <div class="sign-in-btn">
          <button
            :disabled="email == '' || password == '' || repeatPassword == ''"
            class="btn-primary"
            @click="signUpWithEmail"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
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
      repeatPassword: '',
      error: '',
      isLoading: false,
    }
  },
  methods: {
    async signUpWithEmail() {
      if (this.checkPassword()) {
        try {
          this.isLoading = true
          await firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              this.$router.push({ name: 'success' })
              this.confetty()
            })
        } catch (error) {
          this.error = error.message
        } finally {
          this.isLoading = false
        }
      }
    },
    checkPassword() {
      if (this.password === this.repeatPassword) {
        return true
      } else {
        this.error = 'Please Input Same Password'
        this.password = ''
        this.repeatPassword = ''
        return false
      }
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

.sign-up-container {
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
        font-weight: 500;
        font-size: 33px;
        color: rgb(255, 255, 255);
      }
      p {
        margin-top: 28px;
        color: rgba(255, 255, 255, 0.5);
        line-height: 19.2px;
        font-size: 16px;
        margin-bottom: 3rem;
        font-weight: 400;
      }
    }
  }
}
</style>
