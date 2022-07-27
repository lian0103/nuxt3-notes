<!-- ./components/Toc.vue -->

<script setup>
// define links prop
defineProps(['links']);

// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
  let _links = links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);

  // console.log({ _links });

  return _links;
};
</script>

<template>
  <ul class="toc-links">
    <!-- render each link with depth class -->
    <li
      v-for="link of flattenLinks(links)"
      :key="link.id"
      :class="`toc-link _${link.depth}`"
    >
      <a :href="`#${link.id}`">
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>

<style scoped>
.toc-links {
  @apply flex flex-col gap-2 px-2 text-sm;
}

.toc-link {
  @apply text-slate-500;
}

.toc-link._3 {
  @apply pl-3;
}

.toc-link._4 {
  @apply pl-6;
}

.toc-link._undefined {
  @apply pl-8;
}
</style>
