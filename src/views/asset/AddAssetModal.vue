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
                  :modelValue="formData.assetOriginalCost"
                  @update:modelValue="
                    (val) => (formData.assetOriginalCost = formatNumberInput(val))
                  "
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
                  :modelValue="formData.assetAnnualDepreciation"
                  @update:modelValue="
                    (val) => (formData.assetAnnualDepreciation = formatNumberInput(val))
                  "
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
import {useAssetValidation} from '@/composables/useAssetValidation.js'

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

/**
 * Kiểm tra xem modal đang ở chế độ chỉnh sửa hay không
 * @returns {boolean} True nếu đang ở chế độ chỉnh sửa
 * 
 * Created By CongHT - 26/11/2025
 */
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

const departments = ref([])
const assetTypes = ref([])

/**
 * Format giá trị số thành chuỗi có định dạng số Việt Nam
 * @param {string|number} value - Giá trị cần format
 * @returns {string} Chuỗi đã được format
 * 
 * Created By CongHT - 26/11/2025
 */
const formatNumberInput = (value) => {
  if (value === null || value === undefined || value === '') return ''
  const cleanValue = value.toString().replace(/\D/g, '')
  return new Intl.NumberFormat('vi-VN').format(cleanValue)
}

/**
 * Chuyển đổi chuỗi có định dạng số thành số
 * @param {string|number} value - Giá trị cần chuyển đổi
 * @returns {number} Giá trị số
 * 
 * Created By CongHT - 26/11/2025
 */
const parseNumber = (value) => {
  if (!value) return 0
  if (typeof value === 'number') return value
  return Number(value.toString().replace(/\./g, ''))
}

/**
 * Hiển thị dialog cảnh báo
 * @param {string} title - Tiêu đề dialog
 * @param {string} message - Nội dung thông báo
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
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

const {
  errors,
  validateForm,
  validateField,
  validateDepreciationRate,
  validateAnnualDepreciation,
  setFieldError,
} = useAssetValidation({
  getFormData: () => formData.value,
  parseNumber,
  showWarningDialog,
})

/**
 * Xử lý đóng modal với xác nhận nếu có thay đổi
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
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

/**
 * Xử lý khi người dùng xác nhận action trong dialog
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
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

/**
 * Xử lý khi người dùng hủy action trong dialog
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
const handleCancelAction = () => {
  showConfirmDialog.value = false
}

/**
 * Xử lý khi người dùng từ chối action trong dialog
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
const handleRejectAction = () => {
  if (confirmDialog.value.action === 'close-edit') {
    showConfirmDialog.value = false
    emit('close')
  }
}

/**
 * Tạo danh sách options cho dropdown bộ phận sử dụng
 * @returns {Array<{value: string, text: string}>} Danh sách options
 * 
 * Created By CongHT - 26/11/2025
 */
const departmentOptions = computed(() =>
  departments.value.map((dept) => ({
    value: dept.departmentId,
    text: dept.departmentCode,
  })),
)

/**
 * Tạo danh sách options cho dropdown loại tài sản
 * @returns {Array<{value: string, text: string}>} Danh sách options
 * 
 * Created By CongHT - 26/11/2025
 */
const assetTypeOptions = computed(() =>
  assetTypes.value.map((type) => ({
    value: type.assetTypeId,
    text: type.assetTypeCode,
  })),
)

/**
 * Xử lý khi thay đổi bộ phận sử dụng, cập nhật tên bộ phận
 * @param {Object} selectedOption - Option được chọn
 * @param {string} selectedOption.value - ID của bộ phận
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
const handleDepartmentChange = (selectedOption) => {
  const department = departments.value.find((dept) => dept.departmentId === selectedOption.value)
  if (department) {
    formData.value.departmentName = department.departmentName
  }
}

/**
 * Xử lý khi thay đổi loại tài sản, cập nhật thông tin liên quan
 * @param {Object} selectedOption - Option được chọn
 * @param {string} selectedOption.value - ID của loại tài sản
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
const handleAssetTypeChange = (selectedOption) => {
  const assetType = assetTypes.value.find((type) => type.assetTypeId === selectedOption.value)
  if (assetType) {
    formData.value.assetTypeName = assetType.assetTypeName
    formData.value.depreciationRate = assetType.depreciationRate
    formData.value.assetUsageYear = assetType.depreciationYear

    calculateAnnualDepreciation()
  }
}

/**
 * Tính toán giá trị hao mòn năm dựa trên nguyên giá và tỉ lệ hao mòn
 * @returns {void}
 * 
 * Created By CongHT - 26/11/2025
 */
const calculateAnnualDepreciation = () => {
  const cost = parseNumber(formData.value.assetOriginalCost) || 0
  const rate = Number(formData.value.depreciationRate) || 0
  formData.value.assetAnnualDepreciation = formatNumberInput((cost * rate) / 100)
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

/**
 * Lấy danh sách bộ phận sử dụng từ API
 * @returns {Promise<void>}
 * 
 * Created By CongHT - 26/11/2025
 */
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

/**
 * Lấy danh sách loại tài sản từ API
 * @returns {Promise<void>}
 * 
 * Created By CongHT - 26/11/2025
 */
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

/**
 * Xử lý lưu tài sản (thêm mới hoặc cập nhật)
 * @returns {Promise<void>}
 * 
 * Created By CongHT - 26/11/2025
 */
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
      assetOriginalCost: parseNumber(formData.value.assetOriginalCost),
      assetAnnualDepreciation: parseNumber(formData.value.assetAnnualDepreciation),
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

      setFieldError('assetCode', errorMessage)
    } else {
      emit('showToast', {
        message: error.response?.data?.userMessage || 'Lỗi kết nối máy chủ',
        type: 'error',
      })
    }
  }
}

/**
 * Lấy mã tài sản mới từ API
 * @returns {Promise<void>}
 * 
 * Created By CongHT - 26/11/2025
 */
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

/**
 * Load dữ liệu tài sản vào form (cho chế độ sửa hoặc nhân bản)
 * @returns {Promise<void>}
 * 
 * Created By CongHT - 26/11/2025
 */
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
      assetOriginalCost: formatNumberInput(props.assetData.assetOriginalCost),
      assetAnnualDepreciation: formatNumberInput(props.assetData.assetAnnualDepreciation),
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
