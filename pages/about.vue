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
    <section class="lg:px-[10%] px-0 top80 pb-[80px]">
      <Profile />
      <div class="w-full px-6">
        <Timeline :data="dataComputed" />
      </div>
    </section>
  </main>
</template>

<style>
.top80 {
  padding-top: 80px;
}
</style>
