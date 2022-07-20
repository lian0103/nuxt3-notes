<script setup>
import { Icon } from '@iconify/vue';
const links = [
  {
    name: 'Notes',
    icon: 'carbon:blog',
    link: '/',
  },
  {
    name: 'About',
    icon: 'mdi:face-man-profile',
    link: '/about',
  },
];

const outLinks = [
  {
    name: 'GitHub',
    icon: 'akar-icons:github-fill',
    link: 'https://github.com/lian0103',
  },
];
</script>

<template>
  <header
    class="flex items-center justify-between h-20 px-[5%] lg:px-[15%] nav-header"
  >
    <NuxtLink to="/" class="font-bold text-2xl lg:text-4xl">
      <span class="text-primary">N</span>otes
    </NuxtLink>
    <nav class="flex items-center space-x-7 text-gray-600">
      <NuxtLink
        v-for="(n, i) in links"
        :key="`navLink-${i}`"
        :to="n.link"
        class="inline-block nav-link hover:text-primary group"
      >
        <div class="flex items-center md:space-x-2">
          <Icon :icon="n.icon" class="w-4 h-4" />
          <span class="font-medium text-sm md:text-base"> {{ n.name }}</span>
        </div>
        <div
          class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
        ></div>
      </NuxtLink>
      <div
        v-for="(n, i) in outLinks"
        :key="`outLink-${i}`"
        class="inline-block nav-link hover:text-primary group cursor-pointer"
      >
        <a
          class="flex items-center md:space-x-2"
          target="_blank"
          :href="n.link"
        >
          <Icon :icon="n.icon" class="w-4 h-4" />
          <span class="font-medium text-sm md:text-base"> {{ n.name }}</span>
        </a>
        <div
          class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
        ></div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link.router-link-active.router-link-exact-active {
  @apply text-primary;
}

.nav-header {
  @apply fixed left-0 top-0 w-full;
  z-index: 9999;
  @apply bg-white;
  max-width: 100vw;
}
</style>
