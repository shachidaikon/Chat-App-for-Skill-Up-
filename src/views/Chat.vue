<template>
  <div class="page-wrapper">
    <header class="header">
      <h1>Chat for Skillup</h1>
    </header>
    <div class="message-wrapper" ref="message-wrapper">
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message.message"
        :icon="message.icon"
        :timestamp="message.timestamp"
        :displayName="message.displayName"
        :isMine="message.isMine"
      />
    </div>
    <div class="message-form__background">
      <div class="message-form__wrapper">
        <textarea
          v-model="textarea"
          placeholder="メッセージを入力"
          class="message-form__textarea"
        ></textarea>
        <button @click="submit" class="message-form__submit">送信する</button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../components/Message.vue'
import { postMessage, getPost, setPostListner } from '../firebase/api.js'

export default {
  name: 'Chat',
  components: {
    Message,
  },
  props: {
    user: Object,
  },
  methods: {
    submit: function() {
      postMessage(this.user, this.textarea)
      this.textarea = ''
    },
    addMessage: function(newPost) {
      if (newPost.uid === this.user.uid) newPost.isMine = true
      else newPost.isMine = false

      this.messages.push(newPost)
      this.$nextTick(() => {
        this.$refs['message-wrapper'].scrollTo(0, 10000)
      })
    },
  },
  mounted: function() {
    getPost(this.addMessage), setPostListner(this.addMessage)
  },
  data: function() {
    return {
      textarea: '',
      messages: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: $color-bg-sub;
  color: $color-font;
  height: 100vh;
}
.header {
  background: $color-primary;
  height: $header-height;
  h1 {
    text-align: center;
    line-height: $header-height;
    font-size: 28px;
  }
}
.message-wrapper {
  background: $color-bg-main;
  max-width: 1280px;
  margin: 0 auto;
  height: calc(calc(100vh - #{$header-height}) - calc(#{$form-height} + 24px));
  padding: 0 24px 24px;
  overflow: auto;
  scroll-behavior: smooth;
}
.message-form {
  &__background {
    background: $color-primary-lighten;
    width: 100vw;
    height: $form-height;
    position: fixed;
    bottom: 0;
  }
  &__wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 16px 32px;
    line-height: $form-height;
    display: grid;
    grid-template-columns: 1fr 130px;
    border-radius: 18px;
  }
  &__textarea {
    background: $color-bg-main;
    outline: none;
    box-sizing: border-box;
    border: none;
    border-radius: 18px;
    padding: 16px;
    font-size: 16px;
    line-height: 18px;
  }
  &__submit {
    background: $color-primary;
    height: 64px;
    padding: 0 24px;
    margin-left: 24px;
    border-radius: 18px;
    border: none;
    outline: none;
    &:active {
      background: darken($color-primary, 5%);
    }
  }
}
</style>
