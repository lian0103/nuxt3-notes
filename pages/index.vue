<script setup>
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'));
});

const { data } = await useAsyncData('pratices', () => {
  return queryContent('pratices').find();
});

const dataComputed = computed(() => {
  // console.log(data.value[0]);
  if (data.value[0]?.body) {
    return data.value[0].body;
  }
  return [];
});

useHead({
  title: 'Content Blog',
});
</script>

<template>
  <main>
    <section class="lg:px-[10%] px-[5%] lg:pt-20 pt-2">
      <h1
        class="lg:text-6xl text-4xl text-center leading-normal font-bold rainbow-text my-12"
      >
        Learn. Share. Grow.
      </h1>

      <h2 class="h2title">筆記分類</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          class="px-7 py-5 rounded-lg border-2 listBox"
          v-for="(b, i) in blogNav[0]?.children"
          :key="`blogNavItem-${b._path}-${i}`"
        >
          <h2 class="text-lg font-semibold rainbow-text">
            {{ b.title }}
          </h2>
          <!-- Loop over files inside the content dir -->
          <ul
            v-if="b?.children"
            class="list-disc list-inside mt-4 pl-2 space-y-3"
          >
            <li
              v-for="(child, k) in b.children"
              :key="`childNav-${child._path}-${k}-${i}`"
              class="listItem"
            >
              <NuxtLink :to="`/notes${child._path}`">
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <h2 class="h2title">實作專案</h2>
      <Timeline :data="dataComputed" />
    </section>
  </main>
</template>

<style>
.listBox {
  border-color: var(--border-color);
}

.listItem {
  @apply list-item text-sm text-gray-600 underline underline-offset-4 decoration-transparent hover:decoration-primary/60 transition-all;
  color: var(--mode-text-colo);
}
.listItem:hover {
  color: var(--mode-text-colo);
}

@media screen and (min-width: 480px) {
  /* width */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #edf2f7;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 100vh;
    border: 1px solid #edf2f7;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
}

.h2title {
  @apply py-6 text-lg font-bold flex items-center justify-center lg:justify-start w-full text-center;
}
</style>
