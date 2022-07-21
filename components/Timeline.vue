<script setup>
const { data } = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ol class="timelineBox">
    <li v-for="(item, idx) in data" :key="idx" class="item">
      <div class="dot"></div>
      <time class="time">{{ item.time }}</time>
      <h3 class="title">{{ item.title }}</h3>
      <p class="text" v-html="item.text"></p>
      <div class="w-full flex space-x-4 overflow-x-scroll md:overflow-hidden">
        <img
          class="img"
          v-for="(img, idx2) in item.imgs"
          :key="'img' + idx2"
          :src="img"
          alt="pic"
        />
      </div>
      <div class="w-full flex space-x-4 overflow-x-scroll md:overflow-hidden">
        <a
          v-for="(link, aIdx) in item.links"
          :href="link.url"
          :key="'link' + aIdx"
          class="text-primary-400"
          target="_blank"
          >{{ link.title }}</a
        >
      </div>
    </li>
  </ol>
</template>

<style>
.timelineBox {
  @apply relative border-l border-gray-200 dark:border-gray-700;
  .item {
    @apply mb-10 ml-4;
    .dot {
      @apply absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700;
    }
    .time {
      @apply mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500;
    }
    .title {
      @apply text-lg font-semibold text-gray-900 dark:text-white;
    }
    .text {
      @apply mb-4 text-base font-normal text-gray-500 dark:text-gray-400;
    }
    .img {
      @apply h-40;
    }
  }
}
</style>
