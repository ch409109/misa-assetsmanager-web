<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['ms-button', `ms-button--${variant}`, { 'ms-button--disabled': disabled }]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
/**
 * Component MsButton - Nút bấm có thể tái sử dụng
 * Created by: CongHT - 22/11/2025
 */

/**
 * @const {object} props - Props của component MsButton
 * @property {string} [variant='main'] - Loại variant của button (main, sub, outline)
 * @property {string} [type='button'] - Loại button (button, submit, reset)
 * @property {boolean} [disabled=false] - Trạng thái disabled của button
 * Created By: CongHT - 22/11/2025
 */
const props = defineProps({
  variant: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'sub', 'outline', 'secondary'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * @const {Function} emit - Hàm emit sự kiện của Vue
 * @event click - Phát ra khi button được click
 * Created By: CongHT - 22/11/2025
 */
const emit = defineEmits(['click'])

/**
 * @description Xử lý sự kiện click
 * @param {MouseEvent} event - Sự kiện click
 * Created By: CongHT - 22/11/2025
 */
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.ms-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  min-width: 100px;
  height: 36px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  outline: none;

  &:focus {
    outline: none;
  }

  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  // Main Button Variant
  &--main {
    background-color: #1aa4c8;
    color: #ffffff;
    border: 2px solid #1aa4c8;

    &:hover:not(.ms-button--disabled) {
      background-color: #0582a2;
      border: 2px solid #0582a2;
    }

    &:active:not(.ms-button--disabled) {
      background-color: #28b7dc;
      border: 2px solid #28b7dc;
    }

    &:focus:not(.ms-button--disabled) {
      background-color: #1aa4c8;
      border: 2px solid #1aa4c8;
      box-shadow: 0 0 0 3px rgba(26, 164, 200, 0.2);
    }

    &.ms-button--disabled {
      background-color: #8cd1e3;
      border: 2px solid #8cd1e3;
      opacity: 0.6;
    }
  }

  // Sub Button Variant
  &--sub {
    background-color: #ffffff;
    color: #000000;
    border: 2px solid #9ad6e6;

    &:hover:not(.ms-button--disabled) {
      background-color: #d1edf4;
      border: 2px solid #9ad6e6;
    }

    &:active:not(.ms-button--disabled) {
      background-color: #ffffff;
      border: 2px solid #9ad6e6;
    }

    &:focus:not(.ms-button--disabled) {
      background-color: #ffffff;
      border: 2px solid #9ad6e6;
      box-shadow: 0 0 0 3px rgba(154, 214, 230, 0.2);
    }

    &.ms-button--disabled {
      background-color: #ffffff;
      border: 2px solid #9ad6e6;
      opacity: 0.5;
    }
  }

  // Outline Button Variant
  &--outline {
    background-color: #ffffff;
    color: #000000;
    border: 2px solid #e1e1e1;

    &:hover:not(.ms-button--disabled) {
      background-color: #1aa4c8;
      border: 2px solid #1aa4c8;
      color: #ffffff;
    }

    &:active:not(.ms-button--disabled) {
      background-color: #1aa4c8;
      border: 2px solid #1aa4c8;
      color: #ffffff;
    }

    &:focus:not(.ms-button--disabled) {
      background-color: #1aa4c8;
      border: 2px solid #1aa4c8;
      color: #ffffff;
      box-shadow: 0 0 0 3px rgba(26, 164, 200, 0.2);
    }

    &.ms-button--disabled {
      background-color: #f5f5f5;
      border: 2px solid #e1e1e1;
      opacity: 0.5;
    }
  }

  &--secondary {
    background-color: #ffffff;
    color: #000000;

    &:hover:not(.ms-button--disabled) {
      background-color: #f5f5f5;
      border: 2px solid #d0d0d0;
    }

    &:active:not(.ms-button--disabled) {
      background-color: #e8e8e8;
      border: 2px solid #c0c0c0;
    }

    &:focus:not(.ms-button--disabled) {
      background-color: #ffffff;
      border: 2px solid #e0e0e0;
      box-shadow: 0 0 0 3px rgba(224, 224, 224, 0.3);
    }

    &.ms-button--disabled {
      background-color: #fafafa;
      border: 2px solid #e0e0e0;
      opacity: 0.5;
      color: #9e9e9e;
    }
  }
}
</style>
