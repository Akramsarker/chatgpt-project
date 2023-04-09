<template>
  <div class="container">
    <div class="sign-in-container">
      <div class="anima-section">
        <div class="avatar-card">
          <img src="/avatar.png" alt="Avatar" />
        </div>
        <div class="profile-info">
          <h1 class="friend-name">Login</h1>
          <h2>Your personal Ai Friend</h2>
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
          <button class="sign-in-email">Continue With Email</button>
          <p>Create Account With Email</p>
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
          this.$router.push({ name: 'success' })
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
  .anima-section {
    text-align: center;
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
        margin-top: 2rem;
        color: #ffffff;
        margin-bottom: 0.8rem;
        font-size: 33px;
        font-weight: 600;
        line-height: 36px;
      }
      h2 {
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
        margin-top: 16px;
      }
    }
    .login-section {
      display: flex;
      justify-content: center;
      justify-items: center;
      margin: 2.5rem 0;
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
      .sign-in-email {
        background: #ffffff;
        border-radius: 50px;
        padding: 0.7rem 2.2rem;
        outline: none;
        border: none;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        cursor: pointer;
        color: rgb(0, 0, 0);
      }
      p {
        margin-top: 1.5rem;
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
