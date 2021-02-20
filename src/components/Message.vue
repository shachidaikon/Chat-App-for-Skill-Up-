<template>
  <div class="wrapper" :class="{ wrapper__isMine: isMine }">
    <img :src="icon" class="icon" />
    <div class="card-wrapper">
      <span class="display-name" :class="{ 'display-name__isMine': isMine }">{{
        displayName
      }}</span>
      <div class="card" :class="{ card__isMine: isMine }">
        <span class="content">{{ message }}</span>
      </div>
      <span class="date" :class="{ date__isMine: isMine }"
        >{{ date }}
        <span v-if="isMine" @click="$emit('delete-post')" class="delete"
          >削除</span
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: String,
    timestamp: Object,
    displayName: String,
    icon: String,
    isMine: Boolean,
  },
  computed: {
    date: function() {
      return this.timestamp.toLocaleString()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  max-width: 80%;
  padding: 12px 0;
  grid-template-columns: 48px 1fr;
  grid-template-areas: 'areaA areaB';
  &__isMine {
    grid-template-columns: 1fr 48px;
    grid-template-areas: 'areaB areaA';
    margin: 0 0 0 auto;
  }
}
.icon {
  margin-top: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  grid-area: areaA;
}
.card-wrapper {
  grid-area: areaB;
  margin: 0 24px;
}
.display-name {
  margin: 0 16px;
  font-size: 14px;
  display: block;
  text-align: left;

  &__isMine {
    text-align: right;
  }
}
.card {
  border-radius: 18px;
  padding: 14px;
  line-height: 18px;
  background: $color-secondary;
  &__isMine {
    background: $color-primary;
  }
}
.date {
  margin: 0 16px;
  font-size: 14px;
  display: block;
  text-align: left;

  &__isMine {
    text-align: right;
  }
}

.delete {
  cursor: pointer;
  margin-left: 8px;
  color: $color-font-link;
  text-decoration: underline;
}
</style>
