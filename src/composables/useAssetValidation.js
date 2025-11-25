import { ref } from 'vue'
import { formatCurrency } from '@/utils/formatters.js'

/**
 * @function useAssetValidation
 * @description Composable xử lý logic validation cho form tài sản
 * @param {Object} options - Các tùy chọn cấu hình
 * @param {Function} options.getFormData - Hàm trả về formData hiện tại
 * @param {Function} options.parseNumber - Hàm parse số từ chuỗi format
 * @param {Function} options.showWarningDialog - Hàm hiển thị dialog cảnh báo
 * @returns {Object} - Các state và methods cho validation
 * Created By: CongHT - 25/11/2025
 */
export function useAssetValidation(options = {}) {
  const { getFormData, parseNumber, showWarningDialog } = options

  /**
   * @const {Ref<Object>} errors - Object chứa các lỗi validation
   * Created By: CongHT - 25/11/2025
   */
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

  /**
   * @function resetErrors
   * @description Reset tất cả lỗi về rỗng
   * Created By: CongHT - 25/11/2025
   */
  function resetErrors() {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = ''
    })
  }

  /**
   * @function validateDepreciationRate
   * @description Validate tỷ lệ hao mòn phải bằng 1/Số năm sử dụng
   * Created By: CongHT - 25/11/2025
   */
  function validateDepreciationRate() {
    const formData = getFormData()
    const usageYear = Number(formData.assetUsageYear)
    const depreciationRate = Number(formData.depreciationRate)

    if (usageYear > 0 && depreciationRate > 0) {
      const expectedRate = 100 / usageYear
      const tolerance = 0.01

      if (Math.abs(depreciationRate - expectedRate) > tolerance) {
        errors.value.depreciationRate = `Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng (${expectedRate.toFixed(2)}%)`
        errors.value.assetUsageYear = `Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng (${expectedRate.toFixed(2)}%)`

        if (showWarningDialog) {
          showWarningDialog(
            'Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng',
            `Với số năm sử dụng là ${usageYear} năm, tỷ lệ hao mòn phải là ${expectedRate.toFixed(2)}%`,
          )
        }
      } else {
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
   * @function validateAnnualDepreciation
   * @description Validate hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá
   * Created By: CongHT - 25/11/2025
   */
  function validateAnnualDepreciation() {
    const formData = getFormData()
    const originalCost = parseNumber(formData.assetOriginalCost)
    const annualDepreciation = parseNumber(formData.assetAnnualDepreciation)

    if (originalCost > 0 && annualDepreciation > originalCost) {
      errors.value.assetAnnualDepreciation = 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá'

      if (showWarningDialog) {
        showWarningDialog(
          'Hao mòn năm vượt quá nguyên giá',
          `Hao mòn năm (${formatCurrency(annualDepreciation)}) phải nhỏ hơn hoặc bằng nguyên giá (${formatCurrency(originalCost)})`,
        )
      }
    } else {
      if (errors.value.assetAnnualDepreciation === 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá') {
        errors.value.assetAnnualDepreciation = ''
      }
    }
  }

  /**
   * @function validateField
   * @description Validate từng field riêng lẻ
   * @param {string} fieldName - Tên field cần validate
   * Created By: CongHT - 25/11/2025
   */
  function validateField(fieldName) {
    const formData = getFormData()

    switch (fieldName) {
      case 'assetCode':
        if (!formData.assetCode || formData.assetCode.trim() === '') {
          errors.value.assetCode = 'Mã tài sản không được để trống'
        } else {
          errors.value.assetCode = ''
        }
        break

      case 'assetName':
        if (!formData.assetName || formData.assetName.trim() === '') {
          errors.value.assetName = 'Tên tài sản không được để trống'
        } else {
          errors.value.assetName = ''
        }
        break

      case 'departmentId':
        if (!formData.departmentId) {
          errors.value.departmentId = 'Mã bộ phận sử dụng không được để trống'
        } else {
          errors.value.departmentId = ''
        }
        break

      case 'assetTypeId':
        if (!formData.assetTypeId) {
          errors.value.assetTypeId = 'Mã loại tài sản không được để trống'
        } else {
          errors.value.assetTypeId = ''
        }
        break

      case 'assetQuantity':
        if (!formData.assetQuantity || formData.assetQuantity <= 0) {
          errors.value.assetQuantity = 'Số lượng phải lớn hơn 0'
        } else {
          errors.value.assetQuantity = ''
        }
        break

      case 'assetOriginalCost':
        if (!formData.assetOriginalCost || parseNumber(formData.assetOriginalCost) <= 0) {
          errors.value.assetOriginalCost = 'Nguyên giá phải lớn hơn 0'
        } else {
          errors.value.assetOriginalCost = ''
          validateAnnualDepreciation()
        }
        break

      case 'depreciationRate':
        if (!formData.depreciationRate) {
          errors.value.depreciationRate = 'Tỉ lệ hao mòn không được để trống'
        } else {
          errors.value.depreciationRate = ''
          validateDepreciationRate()
        }
        break

      case 'assetPurchaseDate':
        if (!formData.assetPurchaseDate) {
          errors.value.assetPurchaseDate = 'Ngày mua không được để trống'
        } else {
          errors.value.assetPurchaseDate = ''
        }
        break

      case 'assetUsageStartDate':
        if (!formData.assetUsageStartDate) {
          errors.value.assetUsageStartDate = 'Ngày bắt đầu sử dụng không được để trống'
        } else {
          errors.value.assetUsageStartDate = ''
        }
        break

      case 'assetUsageYear':
        if (!formData.assetUsageYear || formData.assetUsageYear <= 0) {
          errors.value.assetUsageYear = 'Số năm sử dụng phải lớn hơn 0'
        } else {
          errors.value.assetUsageYear = ''
          validateDepreciationRate()
        }
        break

      case 'assetAnnualDepreciation':
        if (!formData.assetAnnualDepreciation || parseNumber(formData.assetAnnualDepreciation) <= 0) {
          errors.value.assetAnnualDepreciation = 'Giá trị hao mòn năm không được để trống'
        } else {
          errors.value.assetAnnualDepreciation = ''
          validateAnnualDepreciation()
        }
        break
    }
  }

  /**
   * @function validateForm
   * @description Validate toàn bộ form
   * @returns {boolean} - True nếu form hợp lệ
   * Created By: CongHT - 25/11/2025
   */
  function validateForm() {
    const formData = getFormData()
    let isValid = true

    // Reset errors
    resetErrors()

    // Validate required fields
    if (!formData.assetCode || formData.assetCode.trim() === '') {
      errors.value.assetCode = 'Mã tài sản không được để trống'
      isValid = false
    }
    if (!formData.assetName || formData.assetName.trim() === '') {
      errors.value.assetName = 'Tên tài sản không được để trống'
      isValid = false
    }
    if (!formData.departmentId) {
      errors.value.departmentId = 'Mã bộ phận sử dụng không được để trống'
      isValid = false
    }
    if (!formData.assetTypeId) {
      errors.value.assetTypeId = 'Mã loại tài sản không được để trống'
      isValid = false
    }
    if (!formData.assetQuantity || formData.assetQuantity <= 0) {
      errors.value.assetQuantity = 'Số lượng phải lớn hơn 0'
      isValid = false
    }
    if (!formData.assetOriginalCost || parseNumber(formData.assetOriginalCost) <= 0) {
      errors.value.assetOriginalCost = 'Nguyên giá phải lớn hơn 0'
      isValid = false
    }
    if (!formData.assetPurchaseDate) {
      errors.value.assetPurchaseDate = 'Ngày mua không được để trống'
      isValid = false
    }
    if (!formData.assetUsageStartDate) {
      errors.value.assetUsageStartDate = 'Ngày bắt đầu sử dụng không được để trống'
      isValid = false
    }
    if (!formData.assetUsageYear || formData.assetUsageYear <= 0) {
      errors.value.assetUsageYear = 'Số năm sử dụng phải lớn hơn 0'
      isValid = false
    }
    if (!formData.depreciationRate) {
      errors.value.depreciationRate = 'Tỉ lệ hao mòn không được để trống'
      isValid = false
    }
    if (!formData.assetAnnualDepreciation || parseNumber(formData.assetAnnualDepreciation) <= 0) {
      errors.value.assetAnnualDepreciation = 'Giá trị hao mòn năm không được để trống'
      isValid = false
    }

    // Validate business rules
    validateAnnualDepreciation()
    validateDepreciationRate()

    // Check if any error exists
    Object.keys(errors.value).forEach((key) => {
      if (errors.value[key]) {
        isValid = false
      }
    })

    return isValid
  }

  /**
   * @function setFieldError
   * @description Set lỗi cho một field cụ thể
   * @param {string} fieldName - Tên field
   * @param {string} errorMessage - Thông báo lỗi
   * Created By: CongHT - 25/11/2025
   */
  function setFieldError(fieldName, errorMessage) {
    errors.value[fieldName] = errorMessage
  }

  /**
   * @function clearFieldError
   * @description Xóa lỗi của một field cụ thể
   * @param {string} fieldName - Tên field
   * Created By: CongHT - 25/11/2025
   */
  function clearFieldError(fieldName) {
    errors.value[fieldName] = ''
  }

  /**
   * @function hasErrors
   * @description Kiểm tra xem có lỗi nào không
   * @returns {boolean} - True nếu có lỗi
   * Created By: CongHT - 25/11/2025
   */
  function hasErrors() {
    return Object.values(errors.value).some((error) => error !== '')
  }

  return {
    // State
    errors,

    // Methods
    validateForm,
    validateField,
    validateDepreciationRate,
    validateAnnualDepreciation,
    resetErrors,
    setFieldError,
    clearFieldError,
    hasErrors,
  }
}