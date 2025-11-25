<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :class="`toast--${type}`">
      <div class="toast__icon">
        <div v-if="type === 'success'" class="icon-wrapper">
          <span class="icon icon-check-white"></span>
        </div>
        <span v-else-if="type === 'error'" class="icon icon-error"></span>
      </div>
      <div class="toast__message">{{ message }}</div>
    </div>
  </Transition>
</template>

<script setup>
/**
 * Component hiển thị thông báo toast
 * @component MsToast
 * @description Hiển thị thông báo dạng toast ở góc trên bên phải màn hình
 * 
 * Created By CongHT - 26/11/2025
 */
import { ref, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  duration: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const visible = ref(props.show)

/**
 * Theo dõi props.show để hiển thị/ẩn toast và tự động đóng sau duration
 * 
 * Created By CongHT - 26/11/2025
 */
watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal
    if (newVal) {
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, props.duration)
    }
  },
)
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  min-width: 300px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;

    .icon-wrapper {
      position: relative;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: rgba(76, 175, 80, 0.15);
        z-index: 1;
      }

      &::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(76, 175, 80, 0.3);
        z-index: 2;
      }
    }

    .icon-check {
      background-color: #4caf50;
      color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
    }

    .icon-error {
      background-color: #f44336;
      color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
    }
  }

  &__message {
    flex: 1;
    font-size: 14px;
    color: #333333;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
