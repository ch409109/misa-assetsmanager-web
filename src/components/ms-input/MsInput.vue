<template>
  <div class="ms-input__wrapper">
    <label v-if="label" class="ms-input__label" :class="{ required: required }">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :class="{ error: error }"
      @input="handleInput"
      @blur="handleBlur"
      class="ms-input"
    />
    <span v-if="errorMessage" class="ms-input__error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
/**
 * @const {object} props - Component props
 * @property {string} label - Nhãn của input
 * @property {string} modelValue - Giá trị input (v-model)
 * @property {string} type - Loại input (text, number, email, ...)
 * @property {string} placeholder - Placeholder
 * @property {boolean} required - Bắt buộc nhập
 * @property {boolean} disabled - Vô hiệu hóa
 * @property {boolean} error - Trạng thái lỗi
 * @property {string} errorMessage - Thông báo lỗi
 * Created by: CongHT - 14/11/2025
 */
defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
  errorMessage: String,
})

/**
 * @const {object} emit - Component emits
 * Created by: CongHT - 14/11/2025
 */
const emit = defineEmits(['update:modelValue', 'blur'])

/**
 * Xử lý sự kiện input
 * @param {Event} event - Input event
 * Created by: CongHT - 14/11/2025
 */
const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

/**
 * Xử lý sự kiện blur
 * @param {Event} event - Blur event
 * Created by: CongHT - 14/11/2025
 */
const handleBlur = (event) => {
  emit('blur', event.target.value)
}
</script>

<style lang="scss" scoped>
.ms-input {
  height: 36px;
  border-radius: 2.5px;
  font-size: 14px;
  padding: 14px;
  border: 1px solid $color-border;
  color: $color-text-primary;
  background: $color-bg-default;

  &::placeholder {
    color: $color-text-placeholder;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
  }

  &:hover {
    border-color: $color-border-hover;
  }

  &:focus {
    border-color: $color-border-focus;
    outline: none;
  }

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
    margin-top: 8px;
  }
}
</style>
