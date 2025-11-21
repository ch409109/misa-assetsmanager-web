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
              />
              <div class="asset-form__field-group">
                <MsInput
                  class="asset-form__input--1"
                  type="number"
                  label="Nguyên giá"
                  :error="!!errors.assetOriginalCost"
                  :errorMessage="errors.assetOriginalCost"
                  v-model="formData.assetOriginalCost"
                  required
                  @blur="validateField('assetOriginalCost')"
                />
                <MsInput
                  class="asset-form__input--1"
                  type="number"
                  label="Tỉ lệ hao mòn (%)"
                  v-model="formData.depreciationRate"
                  :error="!!errors.depreciationRate"
                  :errorMessage="errors.depreciationRate"
                  required
                  @blur="validateField('depreciationRate')"
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
              />

              <div class="asset-form__field-group">
                <MsInput
                  class="asset-form__input--1"
                  type="number"
                  label="Giá trị hao mòn năm"
                  required
                  v-model="formData.assetAnnualDepreciation"
                  :error="!!errors.assetAnnualDepreciation"
                  :errorMessage="errors.assetAnnualDepreciation"
                  @blur="validateField('assetAnnualDepreciation')"
                />
                <div class="asset-form__input--1"></div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="modal__footer">
          <div class="modal__btn--cancel" @click="handleCloseModal">Hủy</div>
          <div class="modal__btn--save" @click="handleSave">Lưu</div>
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
      @confirm="handleConfirmAction"
      @cancel="handleCancelAction"
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
    // padding: 20px 16px 0 16px;
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
import { ref, computed, onMounted, watch } from 'vue'
import MsInput from '@/components/ms-input/MsInput.vue'
import MsSelect from '@/components/ms-select/MsSelect.vue'
import MsDatePicker from '@/components/ms-datepicker/MsDatePicker.vue'
import DepartmentAPI from '@/apis/modules/DepartmentAPI.js'
import AssetTypeAPI from '@/apis/modules/AssetTypeAPI.js'
import AssetAPI from '@/apis/modules/AssetAPI.js'
import MsConfirmDialog from '@/components/ms-dialog/MsConfirmDialog.vue'

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
  title: '',
  message: '',
  type: 'question',
  confirmText: 'Có',
  cancelText: 'Không',
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
  if (!isEditMode.value && !props.isDuplicateMode) {
    confirmDialog.value = {
      message: 'Bạn có muốn hủy bỏ khai báo tài sản này?',
      type: 'warning',
      confirmText: 'Hủy bỏ',
      cancelText: 'Không',
      action: 'close',
    }
    showConfirmDialog.value = true
  } else {
    emit('close')
  }
}

const handleConfirmAction = () => {
  showConfirmDialog.value = false

  if (confirmDialog.value.action === 'close') {
    emit('close')
  }
}

const handleCancelAction = () => {
  showConfirmDialog.value = false
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
      }
      break

    case 'depreciationRate':
      if (!formData.value.depreciationRate) {
        errors.value.depreciationRate = 'Tỉ lệ hao mòn không được để trống'
      } else {
        errors.value.depreciationRate = ''
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
      }
      break

    case 'assetAnnualDepreciation':
      if (!formData.value.assetAnnualDepreciation || formData.value.assetAnnualDepreciation <= 0) {
        errors.value.assetAnnualDepreciation = 'Giá trị hao mòn năm không được để trống'
      } else {
        errors.value.assetAnnualDepreciation = ''
      }
      break
  }
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
  () => formData.value.assetOriginalCost,
  () => {
    calculateAnnualDepreciation()
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
    emit('showToast', {
      message: error.response?.data?.message || 'Lỗi kết nối máy chủ',
      type: 'error',
    })
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
