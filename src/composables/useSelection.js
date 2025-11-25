import { ref, computed } from 'vue'

/**
 * @function useSelection
 * @description Composable xử lý logic chọn nhiều item trong danh sách
 * @param {Object} options - Các tùy chọn cấu hình
 * @param {Function} options.getItems - Hàm trả về danh sách items hiện tại
 * @param {string} [options.idField='id'] - Tên trường ID của item
 * @returns {Object} - Các state và methods cho selection
 * Created By: CongHT - 25/11/2025
 */
export function useSelection(options = {}) {
  const { getItems, idField = 'id' } = options

  /**
   * @const {Ref<Array>} selectedItems - Danh sách ID các item đã chọn
   * Created By: CongHT - 25/11/2025
   */
  const selectedItems = ref([])

  /**
   * @const {Ref<number|null>} lastSelectedIndex - Index của item được chọn cuối cùng (dùng cho Shift+Click)
   * Created By: CongHT - 25/11/2025
   */
  const lastSelectedIndex = ref(null)

  /**
   * @const {ComputedRef<boolean>} isAllSelected - Kiểm tra xem tất cả items có được chọn hay không
   * Created By: CongHT - 25/11/2025
   */
  const isAllSelected = computed(() => {
    const items = getItems()
    return items.length > 0 && selectedItems.value.length === items.length
  })

  /**
   * @const {ComputedRef<boolean>} hasSelection - Kiểm tra xem có item nào được chọn hay không
   * Created By: CongHT - 25/11/2025
   */
  const hasSelection = computed(() => {
    return selectedItems.value.length > 0
  })

  /**
   * @const {ComputedRef<number>} selectionCount - Số lượng items đã chọn
   * Created By: CongHT - 25/11/2025
   */
  const selectionCount = computed(() => {
    return selectedItems.value.length
  })

  /**
   * @function toggleSelectAll
   * @description Chọn hoặc bỏ chọn tất cả items
   * @param {Event} event - Sự kiện change của checkbox
   * Created By: CongHT - 25/11/2025
   */
  function toggleSelectAll(event) {
    const items = getItems()
    if (event.target.checked) {
      selectedItems.value = items.map((item) => item[idField])
    } else {
      selectedItems.value = []
    }
  }

  /**
   * @function handleRowClick
   * @description Xử lý click vào row với hỗ trợ Ctrl+Click và Shift+Click
   * @param {Object} item - Item được click
   * @param {number} index - Index của item trong danh sách
   * @param {MouseEvent} event - Sự kiện click
   * Created By: CongHT - 25/11/2025
   */
  function handleRowClick(item, index, event) {
    const items = getItems()
    const itemId = item[idField]

    if (event.ctrlKey || event.metaKey) {
      // Ctrl+Click: Toggle selection của item
      if (selectedItems.value.includes(itemId)) {
        selectedItems.value = selectedItems.value.filter((id) => id !== itemId)
      } else {
        selectedItems.value.push(itemId)
      }
      lastSelectedIndex.value = index
    } else if (event.shiftKey && lastSelectedIndex.value !== null) {
      // Shift+Click: Chọn range từ lastSelectedIndex đến index hiện tại
      const start = Math.min(lastSelectedIndex.value, index)
      const end = Math.max(lastSelectedIndex.value, index)

      const rangeIds = items.slice(start, end + 1).map((a) => a[idField])

      const uniqueIds = new Set([...selectedItems.value, ...rangeIds])
      selectedItems.value = Array.from(uniqueIds)
    } else {
      // Click thường: Chỉ chọn item hiện tại
      selectedItems.value = [itemId]
      lastSelectedIndex.value = index
    }
  }

  /**
   * @function clearSelection
   * @description Xóa tất cả selection
   * Created By: CongHT - 25/11/2025
   */
  function clearSelection() {
    selectedItems.value = []
    lastSelectedIndex.value = null
  }

  /**
   * @function isSelected
   * @description Kiểm tra xem item có được chọn hay không
   * @param {any} itemId - ID của item cần kiểm tra
   * @returns {boolean} - True nếu item được chọn
   * Created By: CongHT - 25/11/2025
   */
  function isSelected(itemId) {
    return selectedItems.value.includes(itemId)
  }

  return {
    // State
    selectedItems,
    lastSelectedIndex,

    // Computed
    isAllSelected,
    hasSelection,
    selectionCount,

    // Methods
    toggleSelectAll,
    handleRowClick,
    clearSelection,
    isSelected,
  }
}