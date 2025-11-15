<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__container">
        <!-- Modal Header -->
        <div class="modal__header">
          <div class="modal__title">Thêm tài sản</div>
          <div class="modal__close-btn" @click="$emit('close')">
            <span class="icon icon-close"></span>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal__body">
          <form class="asset-form">
            <!-- Row 1 -->
            <div class="asset-form__row">
              <MsInput
                class="asset-form__input--1"
                label="Mã tài sản"
                placeholder="Nhập mã tài sản"
                required
              />
              <MsInput
                class="asset-form__input--2"
                label="Tên tài sản"
                placeholder="Nhập tên tài sản"
                required
              />
            </div>

            <!-- Row 2 -->
            <div class="asset-form__row">
              <MsSelect
                class="asset-form__input--1"
                label="Mã bộ phận sử dụng"
                :options="[
                  { value: 'type1', text: 'Loại 1' },
                  { value: 'type2', text: 'Loại 2' },
                ]"
                placeholder="Chọn mã bộ phận sử dụng"
                required
              />
              <MsInput class="asset-form__input--2" label="Tên bộ phận sử dụng" disabled />
            </div>

            <!-- Row 3 -->
            <div class="asset-form__row">
              <MsSelect
                class="asset-form__input--1"
                label="Mã loại tài sản"
                :options="[
                  { value: 'type1', text: 'Loại 1' },
                  { value: 'type2', text: 'Loại 2' },
                ]"
                placeholder="Chọn mã loại tài sản"
                required
              />
              <MsInput class="asset-form__input--2" label="Tên loại tài sản" disabled />
            </div>

            <!-- Row 4 -->
            <div class="asset-form__row">
              <MsInput class="asset-form__input--1" label="Số lượng" required />
              <div class="asset-form__field-group">
                <MsInput class="asset-form__input--1" label="Nguyên giá" required />
                <MsInput class="asset-form__input--1" label="Tỉ lệ hao mòn (%)" required />
              </div>
            </div>

            <!-- Row 5 -->
            <div class="asset-form__row">
              <MsDatePicker
                class="asset-form__input--1"
                label="Ngày bắt đầu sử dụng"
                placeholder="dd/mm/yyyy"
                v-model="startDate"
                required
                custom-icon="icon-schedule"
              />
              <div class="asset-form__field-group">
                <MsDatePicker
                  class="asset-form__input--1"
                  label="Ngày bắt đầu sử dụng"
                  v-model="purchaseDate"
                  required
                  custom-icon="icon-schedule"
                />
                <MsInput
                  class="asset-form__input--1"
                  label="Năm theo dõi"
                  v-model="trackingYear"
                  required
                  disabled
                />
              </div>
            </div>

            <!-- Row 6 -->
            <div class="asset-form__row">
              <MsInput class="asset-form__input--1" label="Số năm sử dụng" required />
              <MsInput class="asset-form__input--1" label="Giá trị hao mòn năm" required />
              <div class="asset-form__input--1"></div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="modal__footer">
          <div class="modal__btn--cancel">Hủy</div>
          <div class="modal__btn--save">Lưu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &__overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
  }

  &__container {
    display: flex;
    height: 90vh;
    width: 1000px;
    flex-direction: column;
    border-radius: 4px;
    background-color: #ffffff;
    // padding: 20px 16px 0 16px;
  }

  &__header {
    height: 40px;
    display: flex;
    justify-content: space-between;
  }

  &__footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    height: 52px;
    background-color: #f1f2f5;
    align-items: center;
  }

  &__body {
    flex: 1;
    padding: 20px 16px 30px 16px;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    padding-top: 20px;
    padding-left: 16px;
  }

  &__close-btn {
    padding-top: 20px;
    padding-right: 16px;
    cursor: pointer;
  }

  &__btn--save {
    background-color: #1aa4c8;
    border-radius: 4px;
    color: #ffffff;
    width: 100px;
    height: 36px;
    @include flex-center;
    cursor: pointer;
    margin-right: 18px;
  }

  &__btn--cancel {
    background-color: #ffffff;
    border-radius: 4px;
    color: #000000;
    width: 100px;
    height: 36px;
    margin-right: 10px;
    @include flex-center;
    cursor: pointer;
  }

  .asset-form {
    &__row {
      display: flex;
      width: 100%;
      gap: 20px;
      margin-bottom: 20px;
    }

    &__input--1 {
      flex: 1;
    }

    &__input--2 {
      flex: 2;
    }

    &__field-group {
      display: flex;
      gap: 20px;
      flex: 2;
    }
  }
}
</style>

<script setup>
import { ref } from 'vue'
import MsInput from '@/components/ms-input/MsInput.vue'
import MsSelect from '@/components/ms-select/MsSelect.vue'
import MsDatePicker from '@/components/ms-datepicker/MsDatePicker.vue'

// Form data
const startDate = ref(null)
const purchaseDate = ref(null)
const trackingYear = ref(new Date().getFullYear())
</script>
