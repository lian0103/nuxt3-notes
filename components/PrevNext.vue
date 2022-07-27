<script setup>
import { Icon } from '@iconify/vue';
defineProps(['prev', 'next']);
</script>

<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink v-if="prev" :to="'/notes' + prev._path">
        <Icon class="w-4 mr-2" icon="flat-color-icons:previous" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink v-if="next" :to="'/notes' + next._path">
        <span> {{ next.title }} </span>
        <Icon class="w-4 ml-2" icon="flat-color-icons:next" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}
.link-item a {
  @apply flex gap-2;
}
</style>
