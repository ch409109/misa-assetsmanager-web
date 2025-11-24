<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__container">
        <!-- Modal Header -->
        <div class="modal__header">
          <div class="modal__title">
            {{ isDuplicateMode ? 'Nhân bản tài sản' : isEditMode ? 'Sửa tài sản' : 'Thêm tài sản' }}
          </div>
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
                v-model="formData.assetCode"
                :error="!!errors.assetCode"
                :errorMessage="errors.assetCode"
                @blur="validateField('assetCode')"
                required
              />
              <MsInput
                class="asset-form__input--2"
                label="Tên tài sản"
                placeholder="Nhập tên tài sản"
                v-model="formData.assetName"
                :error="!!errors.assetName"
                :errorMessage="errors.assetName"
                @blur="validateField('assetName')"
                required
              />
            </div>

            <!-- Row 2 -->
            <div class="asset-form__row">
              <MsSelect
                class="asset-form__input--1"
                label="Mã bộ phận sử dụng"
                :options="departmentOptions"
                @change="handleDepartmentChange"
                v-model="formData.departmentId"
                :error="!!errors.departmentId"
                :errorMessage="errors.departmentId"
                placeholder="Chọn mã bộ phận sử dụng"
                @blur="validateField('departmentId')"
                required
              />
              <MsInput
                class="asset-form__input--2"
                label="Tên bộ phận sử dụng"
                v-model="formData.departmentName"
                disabled
              />
            </div>

            <!-- Row 3 -->
            <div class="asset-form__row">
              <MsSelect
                class="asset-form__input--1"
                label="Mã loại tài sản"
                :options="assetTypeOptions"
                @change="handleAssetTypeChange"
                v-model="formData.assetTypeId"
                :error="!!errors.assetTypeId"
                :errorMessage="errors.assetTypeId"
                placeholder="Chọn mã loại tài sản"
                @blur="validateField('assetTypeId')"
                required
              />
              <MsInput
                class="asset-form__input--2"
                label="Tên loại tài sản"
                v-model="formData.assetTypeName"
                disabled
              />
            </div>

            <!-- Row 4 -->
            <div class="asset-form__row">
              <MsInput
                class="asset-form__input--1"
                type="number"
                label="Số lượng"
                :error="!!errors.assetQuantity"
                :errorMessage="errors.assetQuantity"
                v-model="formData.assetQuantity"
                required
                @blur="validateField('assetQuantity')"
                textAlign="right"
              />
              <div class="asset-form__field-group">
                <MsInput
                  class="asset-form__input--1"
                  label="Nguyên giá"
                  :error="!!errors.assetOriginalCost"
                  :errorMessage="errors.assetOriginalCost"
                  v-model="formData.assetOriginalCost"
                  required
                  @blur="validateField('assetOriginalCost')"
                  textAlign="right"
                />
                <MsInput
                  class="asset-form__input--1"
                  label="Tỉ lệ hao mòn (%)"
                  v-model="formData.depreciationRate"
                  :error="!!errors.depreciationRate"
                  :errorMessage="errors.depreciationRate"
                  required
                  @blur="validateField('depreciationRate')"
                  textAlign="right"
                />
              </div>
            </div>

            <!-- Row 5 -->
            <div class="asset-form__row">
              <MsDatePicker
                class="asset-form__input--1"
                label="Ngày mua"
                placeholder="dd/mm/yyyy"
                v-model="formData.assetPurchaseDate"
                :error="!!errors.assetPurchaseDate"
                :errorMessage="errors.assetPurchaseDate"
                required
                @blur="validateField('assetPurchaseDate')"
                custom-icon="icon-schedule"
              />
              <div class="asset-form__field-group">
                <MsDatePicker
                  class="asset-form__input--1"
                  label="Ngày bắt đầu sử dụng"
                  v-model="formData.assetUsageStartDate"
                  :error="!!errors.assetUsageStartDate"
                  :errorMessage="errors.assetUsageStartDate"
                  required
                  @blur="validateField('assetUsageStartDate')"
                  custom-icon="icon-schedule"
                />
                <MsInput
                  class="asset-form__input--1"
                  label="Năm theo dõi"
                  v-model="formData.assetTrackingStartYear"
                  disabled
                />
              </div>
            </div>

            <!-- Row 6 -->
            <div class="asset-form__row">
              <MsInput
                class="asset-form__input--1"
                type="number"
                v-model="formData.assetUsageYear"
                label="Số năm sử dụng"
                :error="!!errors.assetUsageYear"
                :errorMessage="errors.assetUsageYear"
                required
                @blur="validateField('assetUsageYear')"
                textAlign="right"
              />

              <div class="asset-form__field-group">
                <MsInput
                  class="asset-form__input--1"
                  label="Giá trị hao mòn năm"
                  required
                  v-model="formData.assetAnnualDepreciation"
                  :error="!!errors.assetAnnualDepreciation"
                  :errorMessage="errors.assetAnnualDepreciation"
                  @blur="validateField('assetAnnualDepreciation')"
                  textAlign="right"
                />
                <div class="asset-form__input--1"></div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="modal__footer">
          <MsButton variant="secondary" @click="handleCloseModal">Hủy</MsButton>
          <MsButton variant="main" @click="handleSave">Lưu</MsButton>
        </div>
      </div>
    </div>

    <MsConfirmDialog
      :show="showConfirmDialog"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      :type="confirmDialog.type"
      :confirmText="confirmDialog.confirmText"
      :cancelText="confirmDialog.cancelText"
      :rejectText="confirmDialog.rejectText"
      @confirm="handleConfirmAction"
      @cancel="handleCancelAction"
      @reject="handleRejectAction"
    />
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
    max-height: 90vh;
    width: 1000px;
    flex-direction: column;
    border-radius: 4px;
    background-color: #ffffff;
  }

  &__header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
  }

  &__footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    height: 52px;
    background-color: #f1f2f5;
    align-items: center;
    flex-shrink: 0;
    gap: 10px;
    padding-right: 18px;
  }

  &__body {
    flex: 1;
    padding: 20px 16px 30px 16px;
    overflow-y: auto;
    min-height: 0;
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
import { ref, computed, onMounted, watch } from 'vue'
import MsInput from '@/components/ms-input/MsInput.vue'
import MsSelect from '@/components/ms-select/MsSelect.vue'
import MsDatePicker from '@/components/ms-datepicker/MsDatePicker.vue'
import DepartmentAPI from '@/apis/modules/DepartmentAPI.js'
import AssetTypeAPI from '@/apis/modules/AssetTypeAPI.js'
import AssetAPI from '@/apis/modules/AssetAPI.js'
import MsConfirmDialog from '@/components/ms-dialog/MsConfirmDialog.vue'
import MsButton from '@/components/ms-button/MsButton.vue'

const props = defineProps({
  assetData: {
    type: Object,
    default: null,
  },
  isDuplicateMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save', 'showToast'])

const isEditMode = computed(() => !!props.assetData && !props.isDuplicateMode)

const showConfirmDialog = ref(false)
const confirmDialog = ref({
  message: '',
  type: 'question',
  confirmText: 'Có',
  cancelText: '',
  rejectText: '',
  action: null,
})

const formData = ref({
  assetCode: '',
  assetName: '',
  assetPurchaseDate: new Date().toISOString(),
  assetUsageStartDate: new Date().toISOString(),
  assetTrackingStartYear: new Date().getFullYear(),
  assetQuantity: 1,
  assetOriginalCost: 0,
  assetAnnualDepreciation: 0,
  departmentId: '',
  departmentName: '',
  assetTypeId: '',
  assetTypeName: '',
  depreciationRate: 0,
  assetUsageYear: 0,
})

const errors = ref({
  assetCode: '',
  assetName: '',
  assetPurchaseDate: '',
  assetUsageStartDate: '',
  assetTrackingStartYear: '',
  assetQuantity: '',
  assetOriginalCost: '',
  assetAnnualDepreciation: '',
  departmentId: '',
  assetTypeId: '',
  depreciationRate: '',
  assetUsageYear: '',
})

const departments = ref([])
const assetTypes = ref([])

const handleCloseModal = () => {
  if (isEditMode.value) {
    confirmDialog.value = {
      message:
        'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?',
      type: 'warning',
      confirmText: 'Lưu',
      cancelText: 'Hủy bỏ',
      rejectText: 'Không lưu',
      action: 'close-edit',
    }
    showConfirmDialog.value = true
  } else if (!props.isDuplicateMode) {
    confirmDialog.value = {
      message: 'Bạn có muốn hủy bỏ khai báo tài sản này?',
      type: 'warning',
      confirmText: 'Hủy bỏ',
      cancelText: 'Không',
      action: 'close-new',
    }
    showConfirmDialog.value = true
  } else {
    emit('close')
  }
}

const handleConfirmAction = () => {
  if (confirmDialog.value.action === 'close-edit') {
    showConfirmDialog.value = false
    handleSave()
  } else if (confirmDialog.value.action === 'close-new') {
    showConfirmDialog.value = false
    emit('close')
  } else if (confirmDialog.value.action === 'warning') {
    showConfirmDialog.value = false
  }
}

const handleCancelAction = () => {
  showConfirmDialog.value = false
}

const handleRejectAction = () => {
  if (confirmDialog.value.action === 'close-edit') {
    showConfirmDialog.value = false
    emit('close')
  }
}

const validateForm = () => {
  let isValid = true

  // Reset errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = ''
  })

  // Validate required fields
  if (!formData.value.assetCode || formData.value.assetCode.trim() === '') {
    errors.value.assetCode = 'Mã tài sản không được để trống'
    isValid = false
  }
  if (!formData.value.assetName || formData.value.assetName.trim() === '') {
    errors.value.assetName = 'Tên tài sản không được để trống'
    isValid = false
  }
  if (!formData.value.departmentId) {
    errors.value.departmentId = 'Mã bộ phận sử dụng không được để trống'
    isValid = false
  }
  if (!formData.value.assetTypeId) {
    errors.value.assetTypeId = 'Mã loại tài sản không được để trống'
    isValid = false
  }
  if (!formData.value.assetQuantity || formData.value.assetQuantity <= 0) {
    errors.value.assetQuantity = 'Số lượng phải lớn hơn 0'
    isValid = false
  }
  if (!formData.value.assetOriginalCost || formData.value.assetOriginalCost <= 0) {
    errors.value.assetOriginalCost = 'Nguyên giá phải lớn hơn 0'
    isValid = false
  }
  if (!formData.value.assetPurchaseDate) {
    errors.value.assetPurchaseDate = 'Ngày mua không được để trống'
    isValid = false
  }
  if (!formData.value.assetUsageStartDate) {
    errors.value.assetUsageStartDate = 'Ngày bắt đầu sử dụng không được để trống'
    isValid = false
  }
  if (!formData.value.assetUsageYear || formData.value.assetUsageYear <= 0) {
    errors.value.assetUsageYear = 'Số năm sử dụng phải lớn hơn 0'
    isValid = false
  }
  if (!formData.value.depreciationRate) {
    errors.value.depreciationRate = 'Tỉ lệ hao mòn không được để trống'
    isValid = false
  }
  if (!formData.value.assetAnnualDepreciation || formData.value.assetAnnualDepreciation <= 0) {
    errors.value.assetAnnualDepreciation = 'Giá trị hao mòn năm không được để trống'
    isValid = false
  }

  validateAnnualDepreciation()
  validateDepreciationRate()

  Object.keys(errors.value).forEach((key) => {
    if (errors.value[key]) {
      isValid = false
    }
  })

  return isValid
}

const validateField = (fieldName) => {
  switch (fieldName) {
    case 'assetCode':
      if (!formData.value.assetCode || formData.value.assetCode.trim() === '') {
        errors.value.assetCode = 'Mã tài sản không được để trống'
      } else {
        errors.value.assetCode = ''
      }
      break

    case 'assetName':
      if (!formData.value.assetName || formData.value.assetName.trim() === '') {
        errors.value.assetName = 'Tên tài sản không được để trống'
      } else {
        errors.value.assetName = ''
      }
      break

    case 'departmentId':
      if (!formData.value.departmentId) {
        errors.value.departmentId = 'Mã bộ phận sử dụng không được để trống'
      } else {
        errors.value.departmentId = ''
      }
      break

    case 'assetTypeId':
      if (!formData.value.assetTypeId) {
        errors.value.assetTypeId = 'Mã loại tài sản không được để trống'
      } else {
        errors.value.assetTypeId = ''
      }
      break

    case 'assetQuantity':
      if (!formData.value.assetQuantity || formData.value.assetQuantity <= 0) {
        errors.value.assetQuantity = 'Số lượng phải lớn hơn 0'
      } else {
        errors.value.assetQuantity = ''
      }
      break

    case 'assetOriginalCost':
      if (!formData.value.assetOriginalCost || formData.value.assetOriginalCost <= 0) {
        errors.value.assetOriginalCost = 'Nguyên giá phải lớn hơn 0'
      } else {
        errors.value.assetOriginalCost = ''
        validateAnnualDepreciation()
      }
      break

    case 'depreciationRate':
      if (!formData.value.depreciationRate) {
        errors.value.depreciationRate = 'Tỉ lệ hao mòn không được để trống'
      } else {
        errors.value.depreciationRate = ''
        validateDepreciationRate()
      }
      break

    case 'assetPurchaseDate':
      if (!formData.value.assetPurchaseDate) {
        errors.value.assetPurchaseDate = 'Ngày mua không được để trống'
      } else {
        errors.value.assetPurchaseDate = ''
      }
      break

    case 'assetUsageStartDate':
      if (!formData.value.assetUsageStartDate) {
        errors.value.assetUsageStartDate = 'Ngày bắt đầu sử dụng không được để trống'
      } else {
        errors.value.assetUsageStartDate = ''
      }
      break

    case 'assetUsageYear':
      if (!formData.value.assetUsageYear || formData.value.assetUsageYear <= 0) {
        errors.value.assetUsageYear = 'Số năm sử dụng phải lớn hơn 0'
      } else {
        errors.value.assetUsageYear = ''
        validateDepreciationRate()
      }
      break

    case 'assetAnnualDepreciation':
      if (!formData.value.assetAnnualDepreciation || formData.value.assetAnnualDepreciation <= 0) {
        errors.value.assetAnnualDepreciation = 'Giá trị hao mòn năm không được để trống'
      } else {
        errors.value.assetAnnualDepreciation = ''
        validateAnnualDepreciation()
      }
      break
  }
}

const validateDepreciationRate = () => {
  const usageYear = Number(formData.value.assetUsageYear)
  const depreciationRate = Number(formData.value.depreciationRate)

  if (usageYear > 0 && depreciationRate > 0) {
    const expectedRate = 100 / usageYear
    const tolerance = 0.01 // Cho phép sai số nhỏ (0.01%)

    if (Math.abs(depreciationRate - expectedRate) > tolerance) {
      errors.value.depreciationRate = `Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng (${expectedRate.toFixed(2)}%)`
      errors.value.assetUsageYear = `Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng (${expectedRate.toFixed(2)}%)`

      // Hiển thị dialog cảnh báo
      showWarningDialog(
        'Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng',
        `Với số năm sử dụng là ${usageYear} năm, tỷ lệ hao mòn phải là ${expectedRate.toFixed(2)}%`,
      )
    } else {
      // Xóa lỗi nếu hợp lệ
      if (errors.value.depreciationRate.includes('Tỷ lệ hao mòn phải bằng')) {
        errors.value.depreciationRate = ''
      }
      if (errors.value.assetUsageYear.includes('Tỷ lệ hao mòn phải bằng')) {
        errors.value.assetUsageYear = ''
      }
    }
  }
}

/**
 * Validate: Hao mòn năm <= Nguyên giá
 */
const validateAnnualDepreciation = () => {
  const originalCost = Number(formData.value.assetOriginalCost)
  const annualDepreciation = Number(formData.value.assetAnnualDepreciation)

  if (originalCost > 0 && annualDepreciation > originalCost) {
    errors.value.assetAnnualDepreciation = 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá'

    // Hiển thị dialog cảnh báo
    showWarningDialog(
      'Hao mòn năm vượt quá nguyên giá',
      `Hao mòn năm (${formatCurrency(annualDepreciation)}) phải nhỏ hơn hoặc bằng nguyên giá (${formatCurrency(originalCost)})`,
    )
  } else {
    // Xóa lỗi nếu hợp lệ
    if (errors.value.assetAnnualDepreciation === 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá') {
      errors.value.assetAnnualDepreciation = ''
    }
  }
}

const showWarningDialog = (title, message) => {
  confirmDialog.value = {
    title: title,
    message: message,
    type: 'warning',
    confirmText: 'Đóng',
    cancelText: '',
    action: 'warning',
  }
  showConfirmDialog.value = true
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

const departmentOptions = computed(() =>
  departments.value.map((dept) => ({
    value: dept.departmentId,
    text: dept.departmentCode,
  })),
)

const assetTypeOptions = computed(() =>
  assetTypes.value.map((type) => ({
    value: type.assetTypeId,
    text: type.assetTypeCode,
  })),
)

const handleDepartmentChange = (selectedOption) => {
  const department = departments.value.find((dept) => dept.departmentId === selectedOption.value)
  if (department) {
    formData.value.departmentName = department.departmentName
  }
}

const handleAssetTypeChange = (selectedOption) => {
  const assetType = assetTypes.value.find((type) => type.assetTypeId === selectedOption.value)
  if (assetType) {
    formData.value.assetTypeName = assetType.assetTypeName
    formData.value.depreciationRate = assetType.depreciationRate
    formData.value.assetUsageYear = assetType.depreciationYear

    calculateAnnualDepreciation()
  }
}

const calculateAnnualDepreciation = () => {
  const cost = Number(formData.value.assetOriginalCost) || 0
  const rate = Number(formData.value.depreciationRate) || 0
  formData.value.assetAnnualDepreciation = (cost * rate) / 100
}

watch(
  () => formData.value.assetPurchaseDate,
  (newDate) => {
    if (newDate) {
      const year = new Date(newDate).getFullYear()
      formData.value.assetTrackingStartYear = year
    }
  },
)

watch(
  () => formData.value.assetUsageYear,
  () => {
    if (formData.value.depreciationRate) {
      validateDepreciationRate()
    }
  },
)

watch(
  () => formData.value.depreciationRate,
  () => {
    if (formData.value.assetUsageYear) {
      validateDepreciationRate()
    }
    calculateAnnualDepreciation()
  },
)

watch(
  () => formData.value.assetOriginalCost,
  () => {
    calculateAnnualDepreciation()
    if (formData.value.assetAnnualDepreciation) {
      validateAnnualDepreciation()
    }
  },
)

watch(
  () => formData.value.assetAnnualDepreciation,
  () => {
    if (formData.value.assetOriginalCost) {
      validateAnnualDepreciation()
    }
  },
)

const fetchDepartments = async () => {
  try {
    const response = await DepartmentAPI.getAll()

    if (response.data && Array.isArray(response.data)) {
      departments.value = response.data
    }
  } catch (error) {
    console.error('Error fetching departments:', error)
  }
}

const fetchAssetTypes = async () => {
  try {
    const response = await AssetTypeAPI.getAll()

    if (response.data && Array.isArray(response.data)) {
      assetTypes.value = response.data
    }
  } catch (error) {
    console.error('Error fetching asset types:', error)
  }
}

const handleSave = async () => {
  if (!validateForm()) {
    emit('showToast', {
      message: 'Vui lòng diền đầy đủ thông tin bắt buộc',
      type: 'error',
    })
    return
  }

  try {
    const payload = {
      assetCode: formData.value.assetCode,
      assetName: formData.value.assetName,
      assetPurchaseDate: formData.value.assetPurchaseDate,
      assetUsageStartDate: formData.value.assetUsageStartDate,
      assetTrackingStartYear: Number(formData.value.assetTrackingStartYear),
      assetQuantity: Number(formData.value.assetQuantity),
      assetOriginalCost: Number(formData.value.assetOriginalCost),
      assetAnnualDepreciation: Number(formData.value.assetAnnualDepreciation),
      departmentId: formData.value.departmentId,
      assetTypeId: formData.value.assetTypeId,
      assetUsageYear: Number(formData.value.assetUsageYear),
    }

    let response

    if (isEditMode.value) {
      response = await AssetAPI.update(props.assetData.assetId, payload)
    } else {
      response = await AssetAPI.create(payload)
    }

    if (response && response.status >= 200 && response.status < 300) {
      const message = isEditMode.value
        ? 'Cập nhật dữ liệu thành công'
        : props.isDuplicateMode
          ? 'Nhân bản tài sản thành công'
          : 'Lưu dữ liệu thành công'

      emit('showToast', {
        message,
        type: 'success',
      })
      emit('save', formData.value)
      emit('close')
    } else {
      emit('showToast', {
        message: response.data.message || 'Có lỗi xảy ra',
        type: 'error',
      })
    }
  } catch (error) {
    if (error.response?.status === 409) {
      const errorData = error.response.data

      let errorMessage = errorData.userMessage || 'Mã tài sản đã tồn tại'

      if (errorData.validateInfo && errorData.validateInfo.length > 0) {
        const duplicateValue = errorData.validateInfo.find((info) =>
          info.includes('Giá trị đã tồn tại:'),
        )
        if (duplicateValue) {
          errorMessage = `Mã tài sản ${formData.value.assetCode} đã tồn tại. Vui lòng nhập mã khác.`
        }
      }

      emit('showToast', {
        message: errorMessage,
        type: 'error',
      })

      errors.value.assetCode = errorMessage
    } else {
      emit('showToast', {
        message: error.response?.data?.userMessage || 'Lỗi kết nối máy chủ',
        type: 'error',
      })
    }
  }
}

const fetchNewAssetCode = async () => {
  try {
    const response = await AssetAPI.getNewAssetCode()
    if (response.data.success) {
      formData.value.assetCode = response.data.data
    }
  } catch (error) {
    console.error('Error fetching new asset code:', error)
  }
}

const loadAssetData = async () => {
  if (props.assetData) {
    formData.value = {
      assetId: props.assetData.assetId,
      assetCode: props.assetData.assetCode,
      assetName: props.assetData.assetName,
      assetPurchaseDate: props.assetData.assetPurchaseDate,
      assetUsageStartDate: props.assetData.assetUsageStartDate,
      assetTrackingStartYear: props.assetData.assetTrackingStartYear,
      assetQuantity: props.assetData.assetQuantity,
      assetOriginalCost: props.assetData.assetOriginalCost,
      assetAnnualDepreciation: props.assetData.assetAnnualDepreciation,
      departmentId: props.assetData.departmentId,
      departmentName: '',
      assetTypeId: props.assetData.assetTypeId,
      assetTypeName: '',
      depreciationRate: 0,
      assetUsageYear: props.assetData.assetUsageYear || 0,
    }

    if (props.isDuplicateMode) {
      await fetchNewAssetCode()
    }

    const dept = departments.value.find((d) => d.departmentId === props.assetData.departmentId)
    if (dept) {
      formData.value.departmentName = dept.departmentName
    }

    const assetType = assetTypes.value.find((at) => at.assetTypeId === props.assetData.assetTypeId)
    if (assetType) {
      formData.value.assetTypeName = assetType.assetTypeName
      formData.value.depreciationRate = assetType.depreciationRate

      if (!formData.value.assetUsageYear) {
        formData.value.assetUsageYear = assetType.depreciationYear || assetType.assetUsageYear || 0
      }

      if (!formData.value.assetAnnualDepreciation) {
        calculateAnnualDepreciation()
      }
    }
  }
}

watch(
  [() => props.assetData, departments, assetTypes],
  () => {
    if (props.assetData && departments.value.length > 0 && assetTypes.value.length > 0) {
      loadAssetData()
    }
  },
  { immediate: true },
)

onMounted(() => {
  fetchDepartments()
  fetchAssetTypes()

  if (isEditMode.value) {
    loadAssetData()
  } else {
    fetchNewAssetCode()
  }
})
</script>
