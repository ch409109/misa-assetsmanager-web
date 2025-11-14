<script setup>
import TheHeader from './layouts/TheHeader.vue'
import TheSidebar from './layouts/TheSidebar.vue'
</script>

<template>
  <div class="container">
    <TheSidebar />
    <div class="main-content">
      <TheHeader />
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.content-area {
  display: flex;
  flex: 1;
  background-color: #f4f7ff;
}
</style>
