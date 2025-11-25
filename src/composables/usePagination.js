import { ref, computed } from 'vue'

/**
 * @function usePagination
 * @description Composable xử lý logic phân trang
 * @param {Object} options - Các tùy chọn cấu hình
 * @param {number} [options.defaultPageSize=12] - Số bản ghi mặc định trên mỗi trang
 * @param {number} [options.defaultPageNumber=1] - Trang mặc định
 * @param {Function} options.fetchData - Hàm callback để fetch dữ liệu khi thay đổi trang
 * @returns {Object} - Các state và methods cho phân trang
 * Created By: CongHT - 25/11/2025
 */
export function usePagination(options = {}) {
  const { defaultPageSize = 12, defaultPageNumber = 1, fetchData } = options

  /**
   * @const {Ref<number>} pageSize - Số bản ghi trên mỗi trang
   * Created By: CongHT - 25/11/2025
   */
  const pageSize = ref(defaultPageSize)

  /**
   * @const {Ref<number>} pageNumber - Trang hiện tại
   * Created By: CongHT - 25/11/2025
   */
  const pageNumber = ref(defaultPageNumber)

  /**
   * @const {Ref<number>} totalCount - Tổng số bản ghi
   * Created By: CongHT - 25/11/2025
   */
  const totalCount = ref(0)

  /**
   * @const {Array} pageSizeOptions - Các tùy chọn số bản ghi trên trang
   * Created By: CongHT - 25/11/2025
   */
  const pageSizeOptions = [
    { value: 12, text: '12' },
    { value: 20, text: '20' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ]

  /**
   * @const {ComputedRef<number>} totalPages - Tổng số trang
   * Created By: CongHT - 25/11/2025
   */
  const totalPages = computed(() => {
    return Math.ceil(totalCount.value / pageSize.value) || 1
  })

  /**
   * @const {ComputedRef<Array>} displayPages - Các trang hiển thị trên pagination
   * Created By: CongHT - 25/11/2025
   */
  const displayPages = computed(() => {
    const pages = []
    const maxPagesToShow = 5
    const half = Math.floor(maxPagesToShow / 2)

    let start = Math.max(1, pageNumber.value - half)
    let end = Math.min(totalPages.value, start + maxPagesToShow - 1)

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  })

  /**
   * @function handlePageSizeChange
   * @description Xử lý khi thay đổi số bản ghi trên trang
   * Created By: CongHT - 25/11/2025
   */
  function handlePageSizeChange() {
    pageNumber.value = 1
    if (fetchData) {
      fetchData()
    }
  }

  /**
   * @function goToPage
   * @description Chuyển đến trang được chỉ định
   * @param {number} page - Số trang cần chuyển đến
   * Created By: CongHT - 25/11/2025
   */
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      pageNumber.value = page
      if (fetchData) {
        fetchData()
      }
    }
  }

  /**
   * @function previousPage
   * @description Chuyển đến trang trước
   * Created By: CongHT - 25/11/2025
   */
  function previousPage() {
    if (pageNumber.value > 1) {
      pageNumber.value--
      if (fetchData) {
        fetchData()
      }
    }
  }

  /**
   * @function nextPage
   * @description Chuyển đến trang sau
   * Created By: CongHT - 25/11/2025
   */
  function nextPage() {
    if (pageNumber.value < totalPages.value) {
      pageNumber.value++
      if (fetchData) {
        fetchData()
      }
    }
  }

  /**
   * @function resetPagination
   * @description Reset về trang đầu tiên
   * Created By: CongHT - 25/11/2025
   */
  function resetPagination() {
    pageNumber.value = 1
  }

  /**
   * @function setTotalCount
   * @description Cập nhật tổng số bản ghi
   * @param {number} count - Tổng số bản ghi
   * Created By: CongHT - 25/11/2025
   */
  function setTotalCount(count) {
    totalCount.value = count
  }

  return {
    // State
    pageSize,
    pageNumber,
    totalCount,
    pageSizeOptions,

    // Computed
    totalPages,
    displayPages,

    // Methods
    handlePageSizeChange,
    goToPage,
    previousPage,
    nextPage,
    resetPagination,
    setTotalCount,
  }
}