<script setup>
import { Icon } from '@iconify/vue';
defineProps(['prev', 'next']);
</script>

<template>
  <h2 class="font-bold text-base py-3">相關筆記</h2>
  <ul class="prev-next-cont">
    <li class="link-item prev" :class="{ 'mb-2': next }">
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
  @apply flex flex-col justify-between p-4 border border-slate-200 rounded-lg text-sm;
}
.link-item a {
  @apply flex items-center gap-2 h-full;
}
.link-item a:hover {
  @apply text-primary-600;
}

.prev a {
  @apply justify-start;
}
.next a {
  @apply justify-end;
}
</style>
