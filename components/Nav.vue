<script setup>
import { Icon } from '@iconify/vue';
const links = [
  {
    name: 'Notes',
    icon: 'carbon:blog',
    link: '/',
  },
  {
    name: 'About',
    icon: 'mdi:face-man-profile',
    link: '/about',
  },
];

const modeIconMap = {
  light: 'akar-icons:sun',
  dark: 'akar-icons:moon-fill',
  sepia: 'bi:cloud-moon',
};

const colorEnum = {
  DARK: 'dark',
  LIGHT: 'light',
  SEPIA: 'sepia',
};

const appMode = useState('appMode', () => null);

const handleAppMode = () => {
  switch (appMode.value) {
    case colorEnum.LIGHT: {
      appMode.value = colorEnum.DARK;
      break;
    }
    case colorEnum.DARK: {
      appMode.value = colorEnum.SEPIA;
      break;
    }
    case colorEnum.SEPIA: {
      appMode.value = colorEnum.LIGHT;
      break;
    }
  }
  setTimeout(() => {
    addModeClass(appMode.value);
  }, 100);
};

const addModeClass = (mode = null) => {
  if (mode) {
    localStorage.setItem('nuxt3-app-color-mode', mode);
  }

  document
    ?.getElementsByTagName('body')[0]
    ?.setAttribute('class', `${mode || appMode.value}-mode`);
};

onMounted(() => {
  let mode = colorEnum.LIGHT;
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    mode = colorEnum.DARK;
  }

  if (localStorage.getItem('nuxt3-app-color-mode')) {
    mode = localStorage.getItem('nuxt3-app-color-mode');
  }

  appMode.value = mode;
  addModeClass();
});
</script>

<template>
  <header class="nav-header">
    <div class="wrapper">
      <NuxtLink to="/" class="font-bold text-2xl lg:text-4xl relative">
        <span class="text-primary">N</span>otes
        <div
          class="w-full text-center text-xs font-normal text-gray-400 md:py-1"
        >
          Nuxt3 App
        </div>
      </NuxtLink>
      <nav class="flex items-center space-x-7 text-gray-600">
        <NuxtLink
          v-for="(n, i) in links"
          :key="`navLink-${i}`"
          :to="n.link"
          class="flex items-center nav-link hover:text-primary group"
        >
          <div class="flex items-center md:space-x-2">
            <Icon :icon="n.icon" class="w-4 h-4" />
            <span class="font-medium text-sm md:text-base"> {{ n.name }}</span>
          </div>
          <div
            class="h-0.5 w-4/5 bg-primary mt-1 -translate-y-full scale-0 group-hover:scale-100 group-hover:translate-y-full transition-all"
          ></div>
        </NuxtLink>
        <div class="cursor-pointer hover:text-primary" @click="handleAppMode">
          <Icon class="w-5 h-5" :icon="modeIconMap[appMode]" />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link.router-link-active.router-link-exact-active {
  @apply text-primary;
}

.nav-header {
  width: 100%;
  @apply sticky left-0 top-0 w-full z-20;
  @apply bg-white bg-opacity-40 backdrop-blur-lg;
}

.nav-header > .wrapper {
  @apply flex items-center justify-between m-auto;
  @apply flex items-center justify-between h-20 px-[5%] lg:px-[15%];
}
</style>
