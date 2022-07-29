<script setup>
import { Icon } from '@iconify/vue';

const scrollTop = ref(0);
const contentPath = useRoute().params.slug.toString().replace(/,/g, '/');
const folderPath =
  '/' + contentPath.split('/')[0] + '/' + contentPath.split('/')[1];

// console.log('contentPath', contentPath);
// console.log('folderPath', folderPath);

const { data: blog = null } = await useAsyncData(
  'content-' + contentPath,
  () => {
    return queryContent(contentPath).findOne();
  }
);

const { data: prevNextData = null } = await useAsyncData(
  'content-around-' + contentPath,
  () => {
    return queryContent(folderPath)
      .only(['_id', '_path', 'title'])
      .findSurround({
        _path: '/' + contentPath,
      });
  }
);

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollTop.value = window.scrollY;
  });
});

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

useHead({
  title: `${blog?.value?.title || '404'}`,
});
</script>

<template>
  <main class="relative">
    <article
      v-if="blog?.excerpt"
      class="pt-0 md:pb-28 relative flex items-start lg:space-x-10 px-[5%] lg:px-[10%]"
    >
      <div class="sticky md:top-[90px] hidden lg:block">
        <h2 class="font-bold text-base py-3">筆記內容</h2>
        <div class="w-[300px] p-5 border rounded-md tocBox">
          <Toc :links="blog.body.toc.links" />
        </div>

        <PrevNext
          v-if="prevNextData"
          class="w-full mt-8"
          :prev="prevNextData[0]"
          :next="prevNextData[1]"
        />
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
.tocBox {
  border-color: var(--border-color);
}

.blog-link {
  @apply prose-a:text-blue-600 no-underline;
}
.prose {
  color: var(--mode-text-color);
}

.prose :where(a):not(:where([class~='not-prose'] *)) {
  text-decoration: none;
  @apply no-underline;
}

.prose-sm :where(pre):not(:where([class~='not-prose'] *)) {
  max-width: 90vw;
  margin: auto;
  overflow-y: scroll;
}

.prose :where(blockquote):not(:where([class~='not-prose'] *)) {
  color: var(--mode-text-color);
}

.prose :where(h1):not(:where([class~='not-prose'] *)) {
  color: var(--mode-text-color);
}
</style>
