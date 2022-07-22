<script setup>
const { data } = await useAsyncData('timeline', () => {
  return queryContent('timeline').find();
});

const dataComputed = computed(() => {
  // console.log(data.value[0].body);
  if (data.value[0].body) {
    return data.value[0].body;
  }
  return [];
});
</script>

<template>
  <main>
    <section class="lg:px-[10%] pt-24 md:pt-0 px-0 pb-[10px] md:pb-[20px]">
      <Profile />
      <div class="w-full md:w-4/5 px-6 md:px-0">
        <h2 class="timeline-title">Work history</h2>
        <Timeline :data="dataComputed" />
      </div>
    </section>
  </main>
</template>

<style>
.timeline-title {
  @apply py-4 text-lg font-bold flex items-center justify-center lg:justify-start;
}
</style>
