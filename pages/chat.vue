<template>
  <div class="home-page">
    <h1>This is Chat Page....</h1>
    <div>
      <input v-model="userMessage" type="text" placeholder="right here" />
      <button @click="chat">Generate Completion</button>
      <div v-for="message in messages" :key="message.id">
        <p>{{ message.userMessage }}</p>
        <p>{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import { OpenAIApi, Configuration } from 'openai'

export default {
  data() {
    return {
      userMessage: 'hello',
      messages: [],
      isLoading: false,
      // openAi: new OpenAIApi(
      //   new Configuration({
      //     apiKey: `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`,
      //   })
      // ),
    }
  },
  methods: {
    async chat() {
      this.messages.push({
        type: 'user',
        userMessage: this.userMessage,
      })

      try {
        const res = await axios.post(
          'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
          {
            prompt: this.userMessage,
            max_tokens: 50,
            n: 1,
            stop: '\n',
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer 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`,
            },
          }
        )

        const replay = res.data.choices[0].text
        this.messages.push({
          type: 'system',
          text: replay,
        })
      } catch (error) {
        console.log(error)
      }

      this.userMessage = ''
    },
  },
}
</script>
<style lang="scss" scoped></style>
