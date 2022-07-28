<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="content-info">
    <Icon class="w-12 h-12 mr-2" icon="carbon:warning-filled" />
    <slot />
  </div>
</template>

<style>
.content-info {
  @apply bg-red-200 flex justify-center items-center p-4 rounded-md;
}
</style>
