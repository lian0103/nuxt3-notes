<script setup>
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'));
});

useHead({
  title: 'Content Blog',
});
</script>

<template>
  <div class="dark:bg-[#0c0c0c] dark:text-white">
    <Nav />
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
.content-wrapper {
  max-height: calc(100vh - 80px);
  @apply overflow-y-scroll;
}
</style>
