<script setup>
import { Icon } from '@iconify/vue';

// console.log(useRoute(useRoute().params))
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
  // console.log(blog.value);
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
      class="pt-0 md:pb-20 relative flex items-start lg:space-x-10 px-[5%] lg:px-[10%]"
    >
      <div
        v-if="blog?.excerpt"
        class="w-[300px] p-5 sticky md:top-[90px] border rounded-md bg-white hidden lg:block"
      >
        <Toc :links="blog.body.toc.links" />
      </div>

      <ContentRenderer
        class="prose lg:prose-base prose-sm prose-slate blog-link md:pr-7"
        :value="blog"
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
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

<style>
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
  color: #6d28d9 !important;
  font-weight: bold !important;
}

.blog-link {
  @apply prose-a:text-blue-600 no-underline;
}
.prose :where(a):not(:where([class~='not-prose'] *)) {
  text-decoration: none;
  @apply prose-a:text-gray-600 no-underline;
}

.prose-sm :where(pre):not(:where([class~='not-prose'] *)) {
  max-width: 90vw;
  margin: auto;
  overflow-y: scroll;
}
</style>
