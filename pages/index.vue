<script setup>
const { data: blogNav } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(queryContent('blog'));
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

      <p
        class="text-center uppercase font-medium tracking-wider mb-10 text-gray-500"
      >
        筆記分類
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          class="px-7 py-5 rounded-lg border-2"
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
              class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all"
            >
              <NuxtLink :to="`/notes${child._path}`">
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
          <ul v-else class="list-disc list-inside mt-4 pl-2 space-y-3">
            <li
              class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
            >
              <NuxtLink :to="`/notes${b._path}`"> Get Started </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
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
</style>
