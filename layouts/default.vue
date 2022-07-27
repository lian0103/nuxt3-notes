<script setup>
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'));
});

useHead({
  title: 'Content Blog',
});
</script>

<template>
  <div>
    <Nav />
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style>
.content-wrapper {
  width: 100%;
  @apply md:max-w-screen-xl mx-auto pb-12 md:pb-0;
}
@media screen and (max-width: 650px) {
  .content-wrapper {
    @apply overflow-y-scroll;
  }
}
</style>
