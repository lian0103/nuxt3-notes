<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div
    id="profileBox"
    class="max-w-6xl flex items-center h-auto flex-wrap mx-auto py-8 lg:my-0"
  >
    <!--Main Col-->
    <div id="profile" class="profile">
      <div class="profileInner">
        <!-- Image for mobile view-->
        <div
          class="mobilePic"
          style="background-image: url('https://i.imgur.com/Bmy2WrS.jpg')"
        ></div>

        <h2 class="text-3xl">Jason Lien</h2>
        <div class="titleUnderline"></div>
        <p class="profileBody w-4/5 md:w-full mx-auto">
          <Icon class="w-4 mr-2" icon="ic:outline-work-outline" />
          web developer
        </p>
        <p class="profileBody text-gray-600 w-4/5 md:w-full mx-auto">
          <Icon class="w-4 mr-2" icon="ci:location-outline" />
          Yingge District,New Teipei City,Taiwan
        </p>
        <p class="py-8 text-sm">前端打滾<br/> 工作之餘的時間，學習新網頁知識。</p>

        <h2 class="fontIkea text-xl">FrontEnd</h2>
        <div class="iconsBox">
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
            alt="html5"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
            alt="css3"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            alt="javascript"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg"
            alt="sass"
          />
          <img
            class="icon"
            src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
            alt="tailwind"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
            alt="react"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg"
            alt="vuejs"
          />
        </div>

        <h2 class="fontIkea text-xl">BackEnd</h2>
        <div class="iconsBox">
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
            alt="nodejs"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg"
            alt="express"
          />
          <img
            class="icon"
            src="https://www.vectorlogo.zone/logos/nuxtjs/nuxtjs-icon.svg"
            alt="nuxtjs"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"
            alt="mongodb"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"
            alt="mysql"
          />
        </div>

        <h2 class="fontIkea text-xl">tools</h2>
        <div class="iconsBox">
          <img
            class="icon"
            src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
            alt="git"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg"
            alt="webpack"
          />
          <img
            class="icon"
            src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg"
            alt="heroku"
          />
          <img
            class="icon"
            src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
            alt="postman"
          />
          <img
            class="icon"
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"
            alt="docker"
          />
          <img class="icon" src="https://vitejs.dev/logo.svg" alt="docker" />
          <img
            class="icon"
            src="https://d33wubrfki0l68.cloudfront.net/ddd72aa8248a5c2f77429b9496e6e3e4da2a4e26/8afc0/logo.svg"
            alt="docker"
          />
        </div>
      </div>
    </div>

    <div class="w-full lg:w-2/5">
      <img
        src="https://i.imgur.com/Bmy2WrS.jpg"
        class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
      />
    </div>
  </div>
</template>

<style scoped>
.profile {
  @apply w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl opacity-75 mx-6 lg:mx-0;
  
  .profileInner {
    @apply p-4 md:p-8 text-center lg:text-left;
    .mobilePic {
      @apply block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center;
    }
    .titleUnderline {
      @apply mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25;
    }
    .profileBody {
      @apply pt-4 text-base font-bold flex items-center justify-center lg:justify-start;
    }
  }
}
.listIcon {
  @apply h-4 fill-current text-green-700 pr-4;
}
.iconsBox {
  @apply pb-16 lg:pb-6 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between;
  .icon {
    @apply h-8 md:h-12 fill-current text-gray-600 hover:text-green-700;
  }
}
</style>