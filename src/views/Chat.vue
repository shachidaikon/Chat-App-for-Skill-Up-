<template>
  <div class="page-wrapper">
    <header class="header">
      <h1>Chat for Skillup</h1>
    </header>
    <div class="message-wrapper" ref="message-wrapper">
      <transition-group name="message-transition">
        <Message
          v-for="message in messages"
          :key="message.id"
          :message="message.message"
          :icon="message.icon"
          :timestamp="message.timestamp"
          :displayName="message.displayName"
          :isMine="message.isMine"
          @delete-post="deletePost(message.id)"
          :class="{ transparent: !message.isAlive }"
        />
      </transition-group>
    </div>
    <div class="message-form__background">
      <div class="message-form__wrapper">
        <textarea
          v-model="textarea"
          placeholder="メッセージを入力"
          class="message-form__textarea"
        ></textarea>
        <button @click="submitPost" class="message-form__submit">
          送信する
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../components/Message.vue'
import {
  postMessage,
  setPostListner,
  deletePost as dp,
} from '../firebase/api.js'

export default {
  name: 'Chat',
  components: {
    Message,
  },
  props: {
    user: Object,
  },
  methods: {
    submitPost: function() {
      postMessage(this.user, this.textarea)
      this.textarea = ''
    },
    addMessage: function(newPost) {
      if (newPost.uid === this.user.uid) newPost.isMine = true
      else newPost.isMine = false

      newPost.isAlive = true
      this.messages.push(newPost)
      this.$nextTick(() => {
        this.$refs['message-wrapper'].scrollTo(0, 10000)
      })
    },
    deletePost: function(id) {
      dp(id)
    },
    deleteMessage: function(id) {
      const idx = this.messages.findIndex(message => message.id === id)
      this.messages[idx].isAlive = false
      this.$nextTick(() => {
        this.messages.splice(idx, 1)
      })
    },
  },
  mounted: function() {
    setPostListner(this.addMessage, this.deleteMessage)
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
.message-transition {
  &-leave,
  &-leave-to {
    opacity: 0;
  }
  &-move {
    transition: all 500ms;
  }
  &-leave-active {
    position: absolute;
    transition-duration: 0ms;
  }
}

.transparent {
  opacity: 0;
}

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
