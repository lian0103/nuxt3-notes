<script setup>
import { Icon } from '@iconify/vue';

const slug = useRoute().params.slug.toString().replace(/,/g, '/');
const { data: blog } = await useAsyncData(slug, () => {
  return queryContent(slug).findOne();
});

const toc = computed(() => {
  if (!blog.value) return [];
  const items = blog.value?.excerpt?.children;
  if (!items) return [];
  const toc = [];
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  // console.log(blog.value)
  items.forEach((item) => {
    if (tags.includes(item.tag)) {
      toc.push({
        id: item.props.id,
        title: item.props.id.toString().replace(/-/g, ' '),
        depth: Number(item.tag.replace(/h/g, '')),
      });
    }
  });
  return toc;
});

const scrollTop = ref(0);

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollTop.value = window.scrollY;
  });
});

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

useHead({
  title: `${blog.value?.title || '404'}`,
});
</script>

<template>
  <main class="relative">
    <article
      class="pt-10 md:pt-0 md:pb-20 relative flex items-start lg:space-x-10 px-[5%] lg:px-[10%]"
    >
      <div
        v-if="blog?.excerpt"
        class="w-[300px] p-5 sticky md:top-[20px] border rounded-md bg-white hidden lg:block"
      >
        <h2
          class="text-sm font-bold mb-4 cursor-pointer"
          @click="handleScrollTop"
        >
          Top
        </h2>
        <ul class="space-y-2 overflow-hidden">
          <li
            class="whitespace-nowrap"
            v-for="(t, k) in toc"
            :key="`toc-item-${k}`"
          >
            <NuxtLink
              :class="{
                'text-sm ml-4': t.depth == 2,
                'text-[13px] ml-6': t.depth > 2,
              }"
              class="capitalize"
              :to="`#${t.id}`"
              >{{ t?.title }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <ClientOnly>
        <ContentRenderer
          class="prose lg:prose-base prose-sm prose-slate blog-link pr-7"
          :value="blog"
        >
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </ClientOnly>
    </article>
    <span
      v-show="scrollTop > 0"
      @click="handleScrollTop"
      class="text-2xl rounded-full fixed right-10 bottom-20 cursor-pointer"
    >
      <Icon icon="bx:arrow-to-top" />
    </span>
  </main>
</template>

<style scoped>
.blog-link {
  @apply prose-a:text-gray-600 no-underline;
}
.prose :where(a):not(:where([class~='not-prose'] *)) {
  text-decoration: none;
  @apply prose-a:text-gray-600 no-underline;
}
</style>
