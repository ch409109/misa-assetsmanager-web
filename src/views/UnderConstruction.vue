<template>
  <div class="construction-container">
    <div class="content">
      <!-- Icon minh họa đơn giản bằng CSS -->
      <div class="icon-wrapper">
        <div class="gear"></div>
        <div class="gear small"></div>
      </div>

      <h1 class="title">Đang phát triển</h1>
      <p class="message">
        Tính năng <b>{{ currentFeature }}</b> đang trong quá trình xây dựng.<br />
        Vui lòng quay lại sau!
      </p>

      <button class="back-btn" @click="goHome">Quay lại trang Tài sản</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Lấy tên tính năng dựa trên đường dẫn (để hiển thị cho xịn)
const currentFeature = computed(() => {
  switch (route.path) {
    case '/overview':
      return 'Tổng quan'
    case '/infrastructure':
      return 'Tài sản HT-DB'
    case '/tools':
      return 'Công cụ dụng cụ'
    case '/category':
      return 'Danh mục'
    case '/search':
      return 'Tra cứu'
    case '/report':
      return 'Báo cáo'
    default:
      return 'này'
  }
})

const goHome = () => {
  router.push('/assets')
}
</script>

<style lang="scss" scoped>
.construction-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f4f7ff;
}

.content {
  text-align: center;
  background: white;
  padding: 60px 80px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #1c3048;
  margin: 24px 0 16px;
}

.message {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
}

.back-btn {
  height: 36px;
  padding: 0 20px;
  background-color: #1aa4c8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background-color: #0e8bad;
  }
}

/* CSS vẽ bánh răng xoay */
.icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.gear {
  position: absolute;
  width: 50px;
  height: 50px;
  background: #e0e0e0;
  border-radius: 50%;
  border: 8px dashed #1aa4c8;
  animation: spin 4s linear infinite;
  top: 0;
  left: 0;

  &.small {
    width: 30px;
    height: 30px;
    border: 6px dashed #1c3048;
    top: 40px;
    left: 40px;
    animation: spin-reverse 4s linear infinite;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-reverse {
  100% {
    transform: rotate(-360deg);
  }
}
</style>
