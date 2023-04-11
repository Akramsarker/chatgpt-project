<template>
  <div class="home-page">
    <h1>This is Home Page....</h1>
    <p>user: {{ user }}</p>
    <div>
      <input v-model="userMessage" type="text" placeholder="Write here" />
      <button @click="chat">Generate Completion</button>
      <p v-if="isLoading">Please Wait...</p>
      <div v-for="message in messages" :key="message.id">
        <p>{{ message.userMessage }}</p>
        <p>{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { OpenAIApi, Configuration } from 'openai'
import firebase from 'firebase/app'

export default {
  data() {
    return {
      userMessage: 'hello',
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
      return this.$store.state.user
    },
  },
  mounted() {
    this.signOut()
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
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'signin' })
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    },
  },
}
</script>

<style lang="scss" scoped></style>
