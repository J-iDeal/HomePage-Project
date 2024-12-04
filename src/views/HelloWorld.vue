<script setup>
import { ref } from 'vue'

import pageHead from '@/components/pageHead.vue';
import pageBody from '@/components/pageBody.vue';
import pageFoot from '@/components/pageFoot.vue';

</script>

<template>
  <div class="app-box" :class="mode ? 'dark-pattern' : 'light-pattern'">
    <pageHead />
    <pageBody />
    <pageFoot />
    <div class="video-box">
      <video :controls="false" autoplay="true" muted loop>
        <source src="https://files.codelife.cc/itab/defaultWallpaper/videos/81.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-box {
  // border: 1px solid #000;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // background-image: url(https://microsoft.design/wp-content/uploads/2024/10/windows-wallpaper-expeditions-justin-chochuette.jpg);
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-color: #000 !important;
  position: relative;

  .video-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover; // 确保视频保持比例并覆盖整个容器
    }
  }
}
</style>
