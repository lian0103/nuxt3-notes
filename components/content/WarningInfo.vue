<script>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="flex justify-center items-center px-2 py-4">
    <Icon icon="carbon:blog" class="w-6 h-6" /><span>
      <slot />
    </span>
  </div>
</template>
