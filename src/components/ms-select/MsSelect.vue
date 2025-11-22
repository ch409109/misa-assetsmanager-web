<template>
  <div class="ms-input__wrapper">
    <label v-if="label" class="ms-input__label" :class="{ required: required }">{{ label }}</label>
    <div class="ms-select" :class="{ disabled: disabled }">
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
        tabindex="0"
        @keydown.enter.prevent="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
      >
        <i v-if="prefixIcon" :class="['ms-select__prefix-icon', 'icon', prefixIcon]"></i>
        <span class="ms-select__text" :class="{ 'text-placeholder': !selectedOption }">
          {{ selectedOption ? selectedOption.text : placeholder }}
        </span>
        <i class="icon icon-rectangle-down"></i>
      </div>
      <div v-if="isOpen && !disabled" class="ms-select__dropdown">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Component Select (Dropdown)
 * Created by: CongHT - 15/11/2025
 */

/**
 * @const {object} props - Props của component MsSelect
 * @property {string} [label] - Nhãn (label) hiển thị phía trên select box.
 * @property {string|number} [modelValue] - Giá trị đang được chọn (hỗ trợ v-model).
 * @property {Array<object>} [options=[]] - Danh sách các tùy chọn. Mỗi
 * option là object { value: any, text: string }.
 * @property {string} [placeholder='Chọn'] - Text hiển thị khi chưa có giá trị nào được chọn.
 * @property {boolean} [required=false] - Hiển thị dấu * (bắt buộc) ở label.
 * @property {boolean} [disabled=false] - Vô hiệu hóa select box.
 * @property {string} [errorMessage] - Thông báo lỗi hiển thị bên dưới.
 * @property {string} [prefixIcon] - Tên class icon hiển thị ở phía trước text.
 * Created By: CongHT - 15/11/2025
 */
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

/**
 * @const {Function} emit - Hàm emit sự kiện của Vue
 * @event update:modelValue - Phát ra khi giá trị thay đổi (cho v-model).
 * @event change - Phát ra khi người dùng chọn một option mới.
 * Created By: CongHT - 15/11/2025
 */
const emit = defineEmits(['update:modelValue', 'change'])

/**
 * @type {import('vue').Ref<boolean>}
 * @description Trạng thái mở/đóng của dropdown.
 * Created By: CongHT - 15/11/2025
 */
const isOpen = ref(false)

/**
 * @type {import('vue').ComputedRef<object|null>}
 * @description Tính toán object option ({value, text}) đang được chọn
 * dựa trên `modelValue`.
 * Created By: CongHT - 15/11/2025
 */
const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue) || null
})

/**
 * @description Xử lý bật/tắt dropdown khi click vào trigger.
 * Created By: CongHT - 15/11/2025
 */
const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

/**
 * @description Xử lý khi người dùng click chọn một option.
 * Emit sự kiện và đóng dropdown.
 * @param {object} option - Option ({value, text}) đã được chọn.
 * Created By: CongHT - 15/11/2025
 */
const selectOption = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option)
  isOpen.value = false
}

/**
 * @description Xử lý sự kiện click bên ngoài component để đóng dropdown.
 * @param {MouseEvent} event - Sự kiện click.
 * Created By: CongHT - 15/11/2025
 */
const handleClickOutside = (event) => {
  const target = event.target
  // Nếu click không nằm trong component '.ms-select' này thì đóng dropdown
  if (!target.closest('.ms-select')) {
    isOpen.value = false
  }
}

/**
 * @description Lifecycle hook: Gắn listener 'click' khi component được mount.
 * Created By: CongHT - 15/11/2025
 */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

/**
 * @description Lifecycle hook: Gỡ listener 'click' khi component bị unmount.
 * Created By: CongHT - 15/11/2025
 */
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

/**
 * @type {import('vue').Ref<HTMLElement|null>}
 * @description Tham chiếu (ref) đến <div> trigger (dùng để focus).
 * Created By: CongHT - 15/11/2025
 */
const selectTriggerRef = ref(null)

/**
 * @description Expose (cung cấp) hàm focus ra bên ngoài
 * để component cha có thể gọi.
 * Created By: CongHT - 15/11/2025
 */
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
  height: 36px;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 14px;
    border: 1px solid $color-border;
    border-radius: 2.5px;
    cursor: pointer;
    background: $color-bg-default;

    &:hover {
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
    font-size: 14px;

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
  }

  &__option {
    height: 36px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: $color-bg-hover;
    }

    &.selected {
      color: &$color-primary;
    }
  }
}
</style>
