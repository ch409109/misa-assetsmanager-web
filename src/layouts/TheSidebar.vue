<template>
  <div class="sidebar" :class="{ 'sidebar--collapsed': isCollapsed }">
    <div class="sidebar__header">
      <div class="icon icon-logo"></div>
      <span class="sidebar__title" v-show="!isCollapsed"> MISA QTTS</span>
    </div>
    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/overview' }"
          @click="navigate('/overview')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-overview"></span>
            <span class="sidebar__item-text">Tổng quan</span>
          </div>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path.includes('/assets') }"
          @click="navigate('/assets')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-asset"></span>
            <span class="sidebar__item-text">Tài sản</span>
          </div>
          <span class="icon icon-expand-down" v-show="!isCollapsed"></span>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/infrastructure' }"
          @click="navigate('/infrastructure')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-road-infrastructure"></span>
            <span class="sidebar__item-text">Tài sản HT-DB</span>
          </div>
          <span class="icon icon-expand-down" v-show="!isCollapsed"></span>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/tools' }"
          @click="navigate('/tools')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-tool"></span>
            <span class="sidebar__item-text">Công cụ dụng cụ</span>
          </div>
          <span class="icon icon-expand-down" v-show="!isCollapsed"></span>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/category' }"
          @click="navigate('/category')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-category"></span>
            <span class="sidebar__item-text">Danh mục</span>
          </div>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/search' }"
          @click="navigate('/search')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-lookup"></span>
            <span class="sidebar__item-text">Tra cứu</span>
          </div>
          <span class="icon icon-expand-down" v-show="!isCollapsed"></span>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: route.path === '/report' }"
          @click="navigate('/report')"
        >
          <div class="sidebar__item-content">
            <span class="icon icon-report"></span>
            <span class="sidebar__item-text">Báo cáo</span>
          </div>
          <span class="icon icon-expand-down" v-show="!isCollapsed"></span>
        </li>
      </ul>

      <div class="sidebar__collapse" @click="toggleSidebar">
        <span class="icon icon-collapse" :class="{ 'icon-collapse--rotated': isCollapsed }"></span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  width: auto;
  height: 100vh;
  background-color: #1c3048;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 14px 7px 0 7px;
  flex-direction: column;
  transition: width 0.3s ease;

  &--collapsed {
    width: 60px;

    .sidebar__item-text {
      display: none;
    }

    .sidebar__item {
      justify-content: center;
    }

    .icon:not(.icon-collapse) {
      margin-right: 0;
    }
  }

  &__header {
    @include flex-center;
    height: 50px;
  }

  &__title {
    color: #ffffff;
    font-size: 20px;
    font-weight: 800;
    transition: opacity 0.3s ease;
  }

  &__nav {
    margin-top: 20px;
    color: #ffffff;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    font-size: 14px;
    color: #c5ccd5;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #1aa4c8;
      border-radius: 4px;
      color: #ffffff;

      .icon {
        filter: brightness(0) invert(1);
      }
    }

    &.active {
      background-color: #1aa4c8;
      border-radius: 4px;
      color: #ffffff;
      font-weight: 700;

      .icon {
        filter: brightness(0) invert(1);
      }
    }

    &-content {
      display: flex;
      align-items: center;
    }

    &-text {
      white-space: nowrap;
      overflow: hidden;
      transition: opacity 0.3s ease;
    }
  }

  &__icon {
    margin-right: 12px;
    align-items: center;
  }

  &__collapse {
    height: 40px;
    margin-top: auto;
    background-color: #1c3048;
    border-top: #878b91 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    transition: all 0.3s ease;
  }
}

.icon {
  margin-right: 12px;
  transition: margin 0.3s ease;

  &.icon-expand-down {
    margin-right: 0px;
    margin-left: 12px;
  }

  &.icon-collapse--rotated {
    transform: rotate(180deg);
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)

const navigate = (path) => {
  router.push(path)
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
