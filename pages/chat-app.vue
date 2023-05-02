<template>
  <div class="container">
    <div class="main">
      <div class="chat-visualizer">
        <div class="visualizer">
          <img
            v-if="user.photoURL"
            class="profile-image"
            :src="user.photoURL"
            alt=""
          />
          <img
            v-else
            class="profile-image"
            src="https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      <div class="chatting-section">
        <div v-scroll-to-bottom class="chatting-container">
          <div v-for="message in messages" :key="message.id" class="chatting">
            <pre v-if="message.text" class="ai-text">{{ message.text }}</pre>
            <pre v-if="message.userMessage" class="user-text">{{
              message.userMessage
            }}</pre>
            <p class="message-time">{{ prettyDate(message.createdAt) }}</p>
          </div>
          <div v-if="isLoading" class="loading-spinner">
            <loading-spinner></loading-spinner>
          </div>
        </div>
        <div class="input">
          <input
            v-model="userMessage"
            placeholder="Send a message..."
            type="text"
            @keyup.enter="generateResponse"
          />
          <button
            class="btn-primary custom-border-radius"
            :disabled="userMessage === ''"
            @click="generateResponse"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OpenAIApi, Configuration } from 'openai'
import scrollToBottom from '~/directives/scroll-to-bottom'
import loadingSpinner from '~/components/loading-spinner.vue'
export default {
  components: { loadingSpinner },
  directives: { scrollToBottom },
  data() {
    return {
      userMessage: '',
      // messages: [
      //   { type: 'user', userMessage: 'hello' },
      //   { type: 'system', text: 'Hello! How may I assist you today?' },

      //   { type: 'user', userMessage: 'What is your name?' },
      //   {
      //     type: 'system',
      //     text: "I'm an AI language model created by OpenAI, so I don't have a name like a human does. However, you can call me OpenAI if you'd like!",
      //   },
      //   { type: 'user', userMessage: 'Where are you from?' },
      //   {
      //     type: 'system',
      //     text: 'As an AI language model, I do not have a specific location or country of origin. I exist in the digital world and can be accessed from anywhere with an internet connection.',
      //   },
      //   { type: 'user', userMessage: 'Tall me about yourself?' },
      //   {
      //     type: 'system',
      //     text: 'As an AI language model, I do not have a personal life or experiences like humans do. However, I am designed to assist with various tasks such as answering questions, creating content, and providing support. My primary focus is to provide accurate and helpful responses based on the input I receive.',
      //   },
      // ],
      messages: [],
      isLoading: false,
      openAi: new OpenAIApi(
        new Configuration({
          apiKey: `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`,
        })
      ),
    }
  },
  computed: {
    user() {
      return this.$store.state.user || {}
    },
  },
  mounted() {
    this.getLocalstoreValue()
  },
  methods: {
    async generateResponse() {
      this.messages.push({
        type: 'user',
        createdAt: Date.now(),
        userMessage: this.userMessage,
      })
      try {
        this.isLoading = true
        const res = await this.openAi.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.userMessage }],
        })
        this.userMessage = ''

        const replay = res.data.choices[0].message.content
        this.messages.push({
          type: 'system',
          text: replay,
        })
        localStorage.setItem('messages', JSON.stringify(this.messages))
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    getLocalstoreValue() {
      const messages = JSON.parse(localStorage.getItem('messages'))
      this.messages = messages || []
    },
    prettyDate(time) {
      const diff = (new Date().getTime() - time) / 1000
      const dayDiff = Math.floor(diff / 86400)

      if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) return

      return (
        (dayDiff === 0 &&
          ((diff < 60 && 'Just Now') ||
            (diff < 120 && '1 minute ago') ||
            (diff < 3600 && Math.floor(diff / 60) + ' Minutes Ago') ||
            (diff < 7200 && '1 hour ago') ||
            (diff < 86400 && Math.floor(diff / 3600) + ' Hours Ago'))) ||
        (dayDiff === 1 && 'Yesterday') ||
        (dayDiff < 7 && dayDiff + ' Days Ago') ||
        (dayDiff < 31 && Math.ceil(dayDiff / 7) + ' Weeks Ago')
      )
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/styles/style.scss';

.container {
  width: 100vw;
  height: 100vh;
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
.chat-image {
  width: 20px;
  height: 20px;
}
.main {
  position: relative;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  padding: 2rem 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  .chat-visualizer {
    box-shadow: #0b0b18 0px 0px 30px 35px;
    width: 85%;
    background: #0b0b18;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .visualizer {
      height: 180px;
      width: 180px;
      background: #ffffff;
      border-radius: 100%;
      box-shadow: 15.62px 15.62px 55px #1f0966, -15.62px -15.62px 55px #611717;
      position: relative;
    }
    .profile-image {
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: 150px;
      height: 150px;

      border-radius: 50%;
    }
  }
  .chatting-section {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto;
    .input {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 1rem;
      ::placeholder {
        color: white;
        opacity: 0.3;
      }
      .custom-border-radius {
        border-radius: 12px;
      }
      input {
        padding: 1rem;
        width: 100%;
        background: #2e333f;
        border: none;
        color: white;
        padding: 15px;
        border-radius: 12px;
        outline: none;
        border: 1px solid #1d1d1d;
        margin: 0;

        &:focus {
          border: 1px solid #464646;
        }

        margin-right: 0.7rem;
      }
    }
    .chatting-container {
      height: 500px;
      overflow: auto;
      margin-bottom: 1rem;
      @media screen and (max-width: 850px) {
        height: 400px;
      }
      .message-time {
        display: flex;
        justify-content: flex-end;
        font-size: 11px;
      }
      .chatting {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        pre {
          font-family: 'Montserrat', sans-serif;
          text-align: left;
          color: rgb(228, 228, 228);
        }

        .user-text {
          background: #009d34c6;
          border-radius: 12px;
          border-top-right-radius: 2px;
          margin: 0px 0px 0px auto;
          max-width: 85%;
          padding: 15px;
          word-break: break-word;
          white-space: pre-wrap;
          line-height: 120%;
          margin-top: 0.7rem;
          margin-bottom: 0.3rem;
        }

        .ai-text {
          background: #20232b;
          border-radius: 12px;
          border-bottom-left-radius: 2px;
          margin: 0px auto 0px 0px;
          max-width: 85%;
          padding: 15px;
          word-break: break-word;
          white-space: pre-wrap;
          line-height: 120%;
        }
      }
    }
  }
}
</style>
