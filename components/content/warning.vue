<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="content-info">
    <Icon class="w-6 h-6 mr-2" icon="carbon:warning-filled" />
    <slot />
  </div>
</template>

<style>
.content-info {
  @apply bg-red-200 flex justify-start items-center p-4 rounded-md;
  color: rgba(0, 0, 0, 0.8);
}
</style>
