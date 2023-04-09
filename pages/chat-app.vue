<template>
  <div class="container">
    <div class="main">
      <div class="chat-visualizer">
        <div class="visualizer">
          <img class="profile-image" :src="user.photoURL" alt="" />
        </div>
      </div>
      <div class="chatting-section">
        <div class="chatting-container">
          <div v-for="message in messages" :key="message.id" class="chating">
            <!-- <p v-if="isLoading">Please Wait...</p> -->
            <pre v-if="message.text" class="ai-text">{{ message.text }}</pre>
            <pre v-if="message.userMessage" class="user-text"
              >{{ message.userMessage }}
         </pre
            >
          </div>
        </div>
        <div class="input">
          <input
            v-model="userMessage"
            placeholder="Send a message..."
            type="text"
          />
          <button @click="chat">
            {{ isLoading ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OpenAIApi, Configuration } from 'openai'
export default {
  data() {
    return {
      userMessage: '',
      messages: [
        { type: 'user', userMessage: 'hello' },
        { type: 'system', text: 'Hello! How may I assist you today?' },
        { type: 'user', userMessage: 'What is your name?' },
        {
          type: 'system',
          text: "I'm an AI language model created by OpenAI, so I don't have a name like a human does. However, you can call me OpenAI if you'd like!",
        },
        { type: 'user', userMessage: 'Where are you from?' },
        {
          type: 'system',
          text: 'As an AI language model, I do not have a specific location or country of origin. I exist in the digital world and can be accessed from anywhere with an internet connection.',
        },
        { type: 'user', userMessage: 'Tall me about yourself?' },
        {
          type: 'system',
          text: 'As an AI language model, I do not have a personal life or experiences like humans do. However, I am designed to assist with various tasks such as answering questions, creating content, and providing support. My primary focus is to provide accurate and helpful responses based on the input I receive.',
        },
      ],

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
      return this.$store.state.user
    },
  },
  methods: {
    chat() {
      this.isLoading = true
      this.messages.push({
        type: 'user',
        userMessage: this.userMessage,
      })
      this.openAi
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.userMessage }],
        })
        .then((res) => {
          const replay = res.data.choices[0].message.content
          this.isLoading = false
          this.messages.push({
            type: 'system',
            text: replay,
          })
        })
      this.userMessage = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
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
    // background: #0B0B18;
    // position: relative;
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
    width: 85%;
    margin: auto;
    .input {
      width: 85%;
      display: grid;
      grid-template-columns: 95% 1fr;
      ::placeholder {
        color: white;
        opacity: 0.3;
      }

      input {
        padding: 1rem;
        width: 98%;
        background: #20232b;
        border: none;
        color: white;
        font-family: 'Montserrat', sans-serif;
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

      button {
        display: inline-block;
        background: #009d34;
        outline: none;
        border: none;
        width: 120px;
        height: 50px;
        font-size: 1rem;
        border-radius: 12px;
        transition: 0.4s;
        padding: 10px;
      }
    }
    .chatting-container {
      height: 500px;
      overflow: auto;
      margin-bottom: 1rem;
      .chating {
        position: relative;
        display: flex;
        flex-direction: column;
        pre {
          font-family: 'Montserrat', sans-serif;
          text-align: left;
          color: rgb(228, 228, 228);
        }

        .user-text {
          background: #009d34;
          border-radius: 12px;
          border-top-right-radius: 2px;
          margin: 0px 0px 0px auto;
          max-width: 85%;
          padding: 10px;
          word-break: break-word;
          white-space: pre-wrap;
          line-height: 120%;
          margin-top: 0.7rem;
          margin-bottom: 0.7rem;
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
