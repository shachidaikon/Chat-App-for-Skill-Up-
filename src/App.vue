<template>
  <Message
    :message="message"
    :displayName="displayName"
    :icon="icon"
    :timestamp="timestamp"
    :isMine="isMine"
  />
</template>

<script>
import Message from './components/Message.vue'

export default {
  name: 'App',
  components: {
    Message,
  },
  data: function() {
    return {
      id: '1',
      message:
        'これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。これはサンプル。私は元気です。',
      icon: require('./assets/logo.png'),
      timestamp: new Date(Date.now()),
      displayName: 'Ryo Takayama',
      isMine: true,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
