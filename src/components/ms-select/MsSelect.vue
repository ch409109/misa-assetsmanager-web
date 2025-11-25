<template>
  <div class="ms-input__wrapper">
    <label v-if="label" class="ms-input__label" :class="{ required: required }">{{ label }}</label>
    <div class="ms-select" :class="{ disabled: disabled }" ref="selectContainerRef">
      <div
        class="ms-select__trigger"
        ref="selectTriggerRef"
        :class="{
          active: isOpen,
          disabled: disabled,
          error: !!errorMessage,
          'has-prefix-icon': prefixIcon,
        }"
        @click="toggleDropdown"
        @blur="handleBlur"
        tabindex="0"
        @keydown.enter.prevent="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
        @keydown.esc="closeDropdown"
      >
        <i v-if="prefixIcon" :class="['ms-select__prefix-icon', 'icon', prefixIcon]"></i>
        <span class="ms-select__text" :class="{ 'text-placeholder': !selectedOption }">
          {{ selectedOption ? selectedOption.text : placeholder }}
        </span>
        <i class="icon icon-rectangle-down"></i>
      </div>
      <div 
        v-if="isOpen && !disabled" 
        class="ms-select__dropdown" 
        :class="{ 'ms-select__dropdown--top': dropdownPosition === 'top' }"
        ref="dropdownRef"
      >
        <div class="options-list">
          <div
            v-for="option in options"
            :key="option.value"
            class="ms-select__option"
            @click="selectOption(option)"
            :class="{ selected: option.value === modelValue }"
          >
            <span class="option-text">{{ option.text }}</span>
            <i v-if="option.value === modelValue" class="icon icon-check"></i>
          </div>
        </div>
      </div>
    </div>
    <span v-if="errorMessage" class="ms-input__error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Chọn',
  },
  required: Boolean,
  disabled: Boolean,
  errorMessage: String,
  prefixIcon: String,
})

const emit = defineEmits(['update:modelValue', 'change', 'blur'])

const isOpen = ref(false)
const dropdownPosition = ref('bottom') // 'top' hoặc 'bottom'
const selectContainerRef = ref(null)
const dropdownRef = ref(null)

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue) || null
})

/**
 * @description Tính toán vị trí hiển thị dropdown
 * Created By: CongHT - 24/11/2025
 */
const calculateDropdownPosition = () => {
  if (!selectContainerRef.value) return

  const rect = selectContainerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const spaceBelow = windowHeight - rect.bottom
  const spaceAbove = rect.top
  
  // Ước tính chiều cao dropdown (tối đa 300px)
  const dropdownHeight = Math.min(props.options.length * 36 + 16, 300)
  
  // Nếu không đủ không gian bên dưới nhưng có đủ không gian bên trên
  if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
    dropdownPosition.value = 'top'
  } else {
    dropdownPosition.value = 'bottom'
  }
}

/**
 * @description Đóng dropdown
 * Created By: CongHT - 24/11/2025
 */
const closeDropdown = () => {
  isOpen.value = false
}

/**
 * @description Xử lý bật/tắt dropdown khi click vào trigger.
 * Created By: CongHT - 15/11/2025
 */
const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    
    if (isOpen.value) {
      nextTick(() => {
        calculateDropdownPosition()
      })
    }
  }
}

/**
 * @description Xử lý khi người dùng click chọn một option.
 * @param {object} option - Option ({value, text}) đã được chọn.
 * Created By: CongHT - 15/11/2025
 */
const selectOption = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option)
  isOpen.value = false
}

/**
 * @description Xử lý sự kiện blur
 * Created By: CongHT - 24/11/2025
 */
const handleBlur = (event) => {
  setTimeout(() => {
    isOpen.value = false
    emit('blur', event)
  }, 200)
}

/**
 * @description Xử lý sự kiện click bên ngoài component để đóng dropdown.
 * @param {MouseEvent} event - Sự kiện click.
 * Created By: CongHT - 15/11/2025
 */
const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('.ms-select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', calculateDropdownPosition, true)
  window.addEventListener('resize', calculateDropdownPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', calculateDropdownPosition, true)
  window.removeEventListener('resize', calculateDropdownPosition)
})

const selectTriggerRef = ref(null)

defineExpose({
  focus: () => {
    selectTriggerRef.value?.focus()
  },
})
</script>

<style lang="scss" scoped>
.ms-input {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: black;

    &.required::after {
      content: '*';
      color: red;
      margin-left: 2px;
    }
  }

  &__error {
    font-size: 12px;
    color: red;
    margin-top: -4px;
  }
}

.ms-select {
  position: relative;
  height: 35px;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 100%;
    width: 100%;
    padding: 14px;
    border: 1px solid $color-border;
    border-radius: 2.5px;
    cursor: pointer;
    background: $color-bg-default;

    &:hover:not(.disabled) {
      border-color: $color-border-hover;
    }

    &.active {
      border-color: $color-border-focus;

      &.error {
        border-color: $color-border-error;
      }
    }

    &.error {
      border-color: $color-border-error;
    }

    &.disabled {
      background-color: $color-bg-disabled;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__text {
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex: 1;

    &.text-placeholder {
      color: $color-text-placeholder;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 400;
      font-style: italic;
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid $color-border;
    border-radius: 2.5px;
    background: $color-bg-default;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 8px 0;
    margin-top: 2px;

    // Khi hiển thị lên trên
    &--top {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: 2px;
    }
  }

  &__option {
    min-height: 36px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.4;
    word-wrap: break-word;
    white-space: normal;

    .option-text {
      flex: 1;
      padding-right: 8px;
    }

    .icon-check {
      flex-shrink: 0;
    }

    &:hover {
      background-color: $color-bg-hover;
    }

    &.selected {
      color: $color-primary;
    }
  }
}
</style>