<template>
  <div class="ms-input__wrapper">
    <label v-if="label" class="ms-input__label" :class="{ required: required }">{{ label }}</label>
    <DxDateBox
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :read-only="readonly"
      :display-format="displayFormat"
      :type="type"
      :show-clear-button="showClearButton"
      :use-mask-behavior="useMaskBehavior"
      :picker-type="pickerType"
      :open-on-field-click="true"
      :class="{ error: !!errorMessage }"
      class="ms-datepicker"
      @value-changed="handleValueChanged"
    >
      <template #dropDownButton v-if="customIcon">
        <div class="custom-icon">
          <i :class="customIcon"></i>
        </div>
      </template>
    </DxDateBox>
    <span v-if="errorMessage" class="ms-input__error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { DxDateBox } from 'devextreme-vue/date-box'

/**
 * Component DatePicker
 * @const {object} props - Props của component MsDatePicker
 * @property {string} [label] - Nhãn hiển thị phía trên datepicker
 * @property {Date|string} [modelValue] - Giá trị ngày tháng (hỗ trợ v-model)
 * @property {string} [placeholder='dd/mm/yyyy'] - Text hiển thị khi chưa có giá trị
 * @property {boolean} [required=false] - Hiển thị dấu * (bắt buộc) ở label
 * @property {boolean} [disabled=false] - Vô hiệu hóa datepicker
 * @property {boolean} [readonly=false] - Chế độ chỉ đọc
 * @property {string} [displayFormat='dd/MM/yyyy'] - Định dạng hiển thị ngày
 * @property {string} [type='date'] - Loại datepicker (date, datetime, time)
 * @property {boolean} [showClearButton=true] - Hiển thị nút xóa
 * @property {boolean} [useMaskBehavior=true] - Sử dụng mask khi nhập
 * @property {string} [errorMessage] - Thông báo lỗi
 * Created By: CongHT - 15/11/2025
 */
defineProps({
  label: String,
  modelValue: [Date, String],
  placeholder: {
    type: String,
    default: 'dd/mm/yyyy',
  },
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  displayFormat: {
    type: String,
    default: 'dd/MM/yyyy',
  },
  type: {
    type: String,
    default: 'date',
  },
  showClearButton: {
    type: Boolean,
    default: true,
  },
  useMaskBehavior: {
    type: Boolean,
    default: true,
  },
  pickerType: {
    type: String,
    default: 'calendar',
  },
  customIcon: String,
  errorMessage: String,
})

/**
 * @const {Function} emit - Hàm emit sự kiện
 * @event update:modelValue - Phát ra khi giá trị thay đổi (cho v-model)
 * @event change - Phát ra khi người dùng chọn ngày mới
 * Created By: CongHT - 15/11/2025
 */
const emit = defineEmits(['update:modelValue', 'change'])

/**
 * @description Xử lý sự kiện khi giá trị thay đổi
 * @param {object} e - Event object từ DevExtreme
 * Created By: CongHT - 15/11/2025
 */
const handleValueChanged = (e) => {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}
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
    margin-top: 4px;
  }
}

:deep(.ms-datepicker) {
  width: 100%;

  .dx-texteditor {
    border: 1px solid $color-border;
    border-radius: 2.5px;
    background: $color-bg-default;
    height: 36px;

    &:hover {
      border-color: $color-border-hover;
    }

    &.dx-state-focused {
      border-color: $color-border-focus;
    }

    &.dx-state-disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  .dx-texteditor-container {
    .dx-texteditor-input-container {
      .dx-texteditor-input {
        height: 36px;
        border-radius: 2.5px;
        font-size: 14px;
        padding: 0 14px;
        border: none;
        color: $color-text-primary;
        background: transparent;

        &::placeholder {
          color: $color-text-placeholder;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 400;
          font-style: italic;
        }
      }

      .dx-placeholder {
        display: none;
      }
    }
  }

  &.error {
    .dx-texteditor {
      border-color: red;
    }
  }

  .dx-dropdowneditor-button {
    border: none;
    background: transparent;

    .dx-dropdowneditor-icon {
      color: $color-text-primary;
    }

    .custom-icon {
      @include flex-center;
      width: 100%;
      height: 100%;

      i {
        font-size: 16px;
        color: $color-text-primary;
      }
    }
  }
}
</style>
