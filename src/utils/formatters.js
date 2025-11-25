/**
 * @function formatCurrency
 * @description Format số thành định dạng tiền tệ Việt Nam
 * @param {number} value - Giá trị cần format
 * @returns {string} - Chuỗi đã được format theo định dạng tiền tệ VN
 * Created By: CongHT - 25/11/2025
 */
export function formatCurrency(value) {
  if (value === null || value === undefined) {
    return '0'
  }
  return new Intl.NumberFormat('vi-VN').format(value)
}

/**
 * @function formatNumber
 * @description Format số thành định dạng số Việt Nam (có dấu phân cách hàng nghìn)
 * @param {number} value - Giá trị cần format
 * @returns {string} - Chuỗi đã được format theo định dạng số VN
 * Created By: CongHT - 25/11/2025
 */
export function formatNumber(value) {
  if (value === null || value === undefined) {
    return '0'
  }
  return new Intl.NumberFormat('vi-VN').format(value)
}