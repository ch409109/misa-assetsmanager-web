<template>
  <div v-if="show" class="ms-confirm-dialog">
    <div class="ms-confirm-dialog__overlay">
      <div class="ms-confirm-dialog__container">
        <div class="ms-confirm-dialog__content">
          <div class="ms-confirm-dialog__icon">
            <span class="icon icon-warning"></span>
          </div>
          <div class="ms-confirm-dialog__message">{{ message }}</div>
        </div>
        
        <div class="ms-confirm-dialog__footer">
          <button 
            class="ms-confirm-dialog__btn ms-confirm-dialog__btn--cancel"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button 
            class="ms-confirm-dialog__btn ms-confirm-dialog__btn--confirm"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Component props
 * Created by: CongHT - 22/11/2025
 */
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Hủy bỏ'
  },
  cancelText: {
    type: String,
    default: 'Không'
  }
})

/**
 * Component emits
 * Created by: CongHT - 22/11/2025
 */
const emit = defineEmits(['confirm', 'cancel'])

/**
 * Handle confirm action
 * Created by: CongHT - 22/11/2025
 */
const handleConfirm = () => {
  emit('confirm')
}

/**
 * Handle cancel action
 * Created by: CongHT - 22/11/2025
 */
const handleCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.ms-confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 400px;
    max-width: 500px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }

  &__content {
    padding: 32px 24px 24px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__message {
    font-size: 14px;
    color: #333333;
    line-height: 1.4;
    flex: 1;
    margin-top: 2px;
  }

  &__footer {
    padding: 16px 24px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    background-color: #ffffff;
  }

  &__btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 70px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--cancel {
      background-color: #ffffff;
      border-color: #d1d5db;
      color: #374151;

      &:hover {
        background-color: #f9fafb;
        border-color: #9ca3af;
      }
    }

    &--confirm {
      background-color: #1aa4c8;
      border-color: #1aa4c8;
      color: #ffffff;

      &:hover {
        background-color: #1593b3;
        border-color: #1593b3;
      }
    }
  }
}
</style>