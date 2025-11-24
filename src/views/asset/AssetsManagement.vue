<template>
  <div class="content">
    <div class="toolbar">
      <div class="toolbar__left">
        <div class="toolbar__search">
          <MsInput
            v-model="searchKeyword"
            placeholder="Tìm kiếm tài sản"
            @input="handleSearchInput"
          >
            <template #prefix>
              <i class="icon icon-search"></i>
            </template>
          </MsInput>
        </div>
        <div class="toolbar__filter">
          <MsSelect
            :options="assetTypeFilterOptions"
            v-model="filters.assetTypeId"
            placeholder="Loại tài sản"
            @change="handleFilterChange"
            prefixIcon="icon icon-funnel"
          />
        </div>
        <div class="toolbar__filter">
          <MsSelect
            :options="departmentFilterOptions"
            v-model="filters.departmentId"
            placeholder="Bộ phận sử dụng"
            @change="handleFilterChange"
            prefixIcon="icon icon-funnel"
          />
        </div>
      </div>
      <div class="toolbar__right">
        <MsButton variant="main" @click="openAddAssetModal">+ Thêm tài sản</MsButton>

        <div class="toolbar__btn-import"><span class="icon icon-excel"></span></div>
        <div
          class="toolbar__btn-delete"
          @click="confirmDeleteMultiple"
          :class="{ 'toolbar__btn-delete--disabled': selectedAssets.length === 0 }"
        >
          <span class="icon icon-bin"></span>
        </div>
      </div>
    </div>
    <div class="asset-list">
      <table class="asset-list__table">
        <thead>
          <tr>
            <th class="asset-list__checkbox-col">
              <input
                type="checkbox"
                class="asset-list__checkbox"
                @change="toggleSelectAll"
                :checked="isAllSelected"
              />
            </th>
            <th>STT</th>
            <th>Mã tài sản</th>
            <th>Tên tài sản</th>
            <th>Loại tài sản</th>
            <th>Bộ phận sử dụng</th>
            <th>Số lượng</th>
            <th>Nguyên giá</th>
            <th>HM/KH lũy kế</th>
            <th>Giá trị còn lại</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody class="asset-list__body">
          <tr v-if="loading">
            <td colspan="11" style="text-align: center; padding: 20px">Đang tải dữ liệu...</td>
          </tr>
          <tr v-else-if="assets.length === 0">
            <td colspan="11" style="text-align: center; padding: 20px">Không có dữ liệu</td>
          </tr>
          <tr
            v-else
            v-for="(asset, index) in assets"
            :key="asset.assetId"
            @mouseenter="hoveredRow = index"
            @mouseleave="hoveredRow = null"
          >
            <td class="asset-list__checkbox-col">
              <input
                type="checkbox"
                class="asset-list__checkbox"
                :value="asset.assetId"
                v-model="selectedAssets"
                @click.stop
              />
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ asset.assetCode }}</td>
            <td>{{ asset.assetName }}</td>
            <td>{{ asset.assetTypeName }}</td>
            <td>{{ asset.departmentName }}</td>
            <td>{{ formatNumber(asset.quantity) }}</td>
            <td>{{ formatCurrency(asset.originalCost) }}</td>
            <td>{{ formatCurrency(asset.accumulatedDepreciation) }}</td>
            <td>{{ formatCurrency(asset.remainingValue) }}</td>
            <td class="asset-list__actions">
              <span
                v-if="hoveredRow === index"
                class="icon icon-edit"
                title="Chỉnh sửa"
                style="cursor: pointer"
                @click="openEditModal(asset)"
              ></span>
              <span
                v-if="hoveredRow === index"
                class="icon icon-clone"
                title="Nhân bản"
                style="cursor: pointer"
                @click="openDuplicateModal(asset)"
              ></span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="asset-list__footer-cell">
              <div class="asset-list__footer-left">
                <span
                  >Tổng số: <strong>{{ totalCount }}</strong> bản ghi</span
                >
                <select
                  class="asset-list__footer-select"
                  :value="pageSize"
                  @change="changePageSize"
                >
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
              </div>
            </td>
            <td colspan="2" class="asset-list__footer-cell asset-list__footer-center">
              <div class="asset-list__footer-pagination">
                <button @click="previousPage" :disabled="pageNumber === 1">&lt;</button>
                <button
                  v-for="page in displayPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{ active: page === pageNumber }"
                >
                  {{ page }}
                </button>
                <span v-if="displayPages[displayPages.length - 1] < totalPages">...</span>
                <button
                  v-if="displayPages[displayPages.length - 1] < totalPages"
                  @click="goToPage(totalPages)"
                >
                  {{ totalPages }}
                </button>
                <button @click="nextPage" :disabled="pageNumber === totalPages">&gt;</button>
              </div>
            </td>
            <td colspan="1"></td>
            <td colspan="5" class="asset-list__footer-cell asset-list__footer-right">
              <div class="asset-list__footer-summary">
                <span
                  ><strong>{{ formatNumber(totalQuantity) }}</strong></span
                >
                <span
                  ><strong>{{ formatCurrency(totalOriginalCost) }}</strong></span
                >
                <span
                  ><strong>{{ formatCurrency(totalAccumulatedDepreciation) }}</strong></span
                >
                <span
                  ><strong>{{ formatCurrency(totalRemainingValue) }}</strong></span
                >
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="asset-list__footer"></div>
    </div>
    <AddAssetModal
      v-if="showAddAssetModal"
      :assetData="selectedAsset"
      :isDuplicateMode="isDuplicateMode"
      @close="closeModal"
      @showToast="handleShowToast"
      @save="handleAssetSaved"
    />
    <MsConfirmDialog
      :show="showDeleteConfirm"
      :message="deleteConfirmMessage"
      confirmText="Xóa"
      cancelText="Không"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
    <MsToast
      :type="toast.type"
      :message="toast.message"
      :show="toast.show"
      @close="toast.show = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 20px;
  width: 100%;
  padding-top: 0;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 56px;

  &__left {
    display: flex;
    align-items: center;
  }

  &__right {
    display: flex;
    align-items: center;
  }

  &__btn-import {
    @include flex-center;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
    width: 36px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    margin-left: 12px;
  }

  &__btn-delete {
    @include flex-center;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
    width: 36px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    margin-left: 12px;
    color: red;
  }

  &__search {
    margin-right: 12px;
    width: 250px;

    ::v-deep .ms-input__wrapper {
      gap: 0;
    }

    ::v-deep .ms-input {
      height: 35px;
      padding-left: 35px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23666' d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 10px center;
    }
  }

  &__filter {
    margin-right: 12px;
    width: 219px;

    ::v-deep .ms-select {
      height: 35px;

      &__trigger {
        height: 35px;
      }
    }
  }
}

.asset-list {
  display: flex;
  flex-direction: column;

  th:nth-child(1) {
    width: 25px;
  }
  th:nth-child(2) {
    width: 40px;
  }
  th:nth-child(3) {
    width: 90px;
  }
  th:nth-child(4) {
    width: 100px;
  }
  th:nth-child(5) {
    width: 110px;
  }
  th:nth-child(6) {
    width: 120px;
  }
  th:nth-child(7) {
    width: 65px;
  }
  th:nth-child(8) {
    width: 80px;
  }
  th:nth-child(9) {
    width: 80px;
  }
  th:nth-child(10) {
    width: 80px;
  }
  th:nth-child(11) {
    width: 65px;
  }

  &__table {
    width: 100%;
    background-color: #ffffff;
    border-radius: 3.5px;
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    height: 575px;
    overflow: hidden;
    border-collapse: collapse;
    table-layout: fixed;

    tbody tr {
      cursor: pointer;

      &:hover {
        background-color: rgba(26, 164, 200, 0.2);
      }
    }

    th {
      background-color: #f5f5f5;
      text-align: left;
      height: 40px;
      font-size: 13px;
      padding: 0 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        text-align: left;
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(7) {
        text-align: center;
      }

      &:nth-child(8),
      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(11) {
        text-align: right;
      }
    }

    td {
      font-size: 13px;
      padding: 7px;
      border-top: 1px solid #e0e0e0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        text-align: left;
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(7) {
        text-align: center;
      }

      &:nth-child(8),
      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(11) {
        text-align: right;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  &__checkbox-col {
    text-align: center;
    width: 20px;
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__footer-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      border: 1px solid #afafaf;
      border-radius: 3px;
      padding: 4px 8px;
      background-color: #ffffff;
      cursor: pointer;
      min-width: 32px;

      &:hover:not(:disabled) {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: #1aa4c8;
        color: #ffffff;
        border-color: #1aa4c8;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }

  &__footer-cell {
    padding: 12px;
    height: 50px;
    vertical-align: middle;
  }

  &__footer-left {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    padding-left: 6px;
  }

  &__footer-select {
    margin-left: 8px;
    background-color: #ffffff;
    border-radius: 2.625px;
    border: 1px solid #afafaf;
    width: 59px;
    height: 25px;
    overflow: hidden;
  }

  &__footer-center {
    text-align: center;
  }

  &__footer-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      border: 1px solid #afafaf;
      border-radius: 3px;
      padding: 4px 8px;
      background-color: #ffffff;
      cursor: pointer;
      min-width: 32px;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  &__footer-right {
    text-align: right;
  }

  &__footer-summary {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AddAssetModal from './AddAssetModal.vue'
import MsToast from '@/components/ms-toast/MsToast.vue'
import AssetAPI from '@/apis/modules/AssetAPI.js'
import MsSelect from '@/components/ms-select/MsSelect.vue'
import DepartmentAPI from '@/apis/modules/DepartmentAPI.js'
import AssetTypeAPI from '@/apis/modules/AssetTypeAPI.js'
import MsInput from '@/components/ms-input/MsInput.vue'
import MsConfirmDialog from '@/components/ms-dialog/MsConfirmDialog.vue'
import MsButton from '@/components/ms-button/MsButton.vue'

const showAddAssetModal = ref(false)
const selectedAsset = ref(null)
const isDuplicateMode = ref(false)
const assets = ref([])
const totalCount = ref(0)
const loading = ref(false)
const hoveredRow = ref(null)

const totalQuantity = ref(0)
const totalOriginalCost = ref(0)
const totalAccumulatedDepreciation = ref(0)
const totalRemainingValue = ref(0)

const selectedAssets = ref([])

const pageSize = ref(12)
const pageNumber = ref(1)

const filters = ref({
  assetTypeId: '',
  departmentId: '',
})

const departments = ref([])
const assetTypes = ref([])

const searchKeyword = ref('')
let searchTimeout = null

const showDeleteConfirm = ref(false)
const deleteConfirmMessage = computed(() => {
  const count = selectedAssets.value.length

  if (count === 0) {
    return ''
  } else if (count === 1) {
    const asset = assets.value.find((a) => a.assetId === selectedAssets.value[0])
    return `Bạn có muốn xóa tài sản <<${asset?.assetCode} - ${asset?.assetName}>> ?`
  } else {
    return `${count} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`
  }
})

function confirmDeleteMultiple() {
  if (selectedAssets.value.length === 0) {
    handleShowToast({
      message: 'Vui lòng chọn ít nhất 1 tài sản để xóa',
      type: 'error',
    })
    return
  }

  showDeleteConfirm.value = true
}

async function handleConfirmDelete() {
  showDeleteConfirm.value = false
  await handleDeleteMultiple()
}

function handleCancelDelete() {
  showDeleteConfirm.value = false
}

function handleSearchInput() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    pageNumber.value = 1
    fetchAssets()
  }, 500)
}

const departmentFilterOptions = computed(() => [
  { value: '', text: 'Bộ phận sử dụng' },
  ...departments.value.map((dept) => ({
    value: dept.departmentId,
    text: dept.departmentName,
  })),
])

const assetTypeFilterOptions = computed(() => [
  { value: '', text: 'Loại tài sản' },
  ...assetTypes.value.map((type) => ({
    value: type.assetTypeId,
    text: type.assetTypeName,
  })),
])

function handleFilterChange() {
  pageNumber.value = 1
  fetchAssets()
}

const totalPages = computed(() => {
  return Math.ceil(totalCount.value / pageSize.value)
})

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

const isAllSelected = computed(() => {
  return assets.value.length > 0 && selectedAssets.value.length === assets.value.length
})

function toggleSelectAll(event) {
  if (event.target.checked) {
    selectedAssets.value = assets.value.map((asset) => asset.assetId)
  } else {
    selectedAssets.value = []
  }
}

async function handleDeleteMultiple() {
  try {
    loading.value = true

    const response = await AssetAPI.deleteMultiple(selectedAssets.value)

    if (response.data.success) {
      const count = selectedAssets.value.length
      handleShowToast({
        message: `Đã xóa ${count} tài sản thành công`,
        type: 'success',
      })

      selectedAssets.value = []
      await fetchAssets()
    } else {
      handleShowToast({
        message: response.data.userMessage || 'Có lỗi xảy ra khi xóa tài sản',
        type: 'error',
      })
    }
  } catch (error) {
    console.error('Error deleting assets:', error)
    handleShowToast({
      message: error.response?.data?.userMessage || 'Lỗi khi xóa tài sản',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

function openAddAssetModal() {
  showAddAssetModal.value = true
  selectedAsset.value = null
  isDuplicateMode.value = false
}

async function openEditModal(asset) {
  try {
    loading.value = true

    const response = await AssetAPI.getById(asset.assetId)

    if (response.data.success) {
      selectedAsset.value = response.data.data
      isDuplicateMode.value = false
      showAddAssetModal.value = true
    } else {
      handleShowToast({
        message: 'Không tải được dữ liệu tài sản',
        type: 'error',
      })
    }
  } catch (error) {
    console.error('Error fetching asset detail:', error)
    handleShowToast({
      message: 'Lỗi khi lấy thông tin tài sản',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

async function openDuplicateModal(asset) {
  try {
    loading.value = true

    const response = await AssetAPI.getById(asset.assetId)

    if (response.data.success) {
      selectedAsset.value = response.data.data
      isDuplicateMode.value = true
      showAddAssetModal.value = true
    } else {
      handleShowToast({
        message: 'Không tải được dữ liệu tài sản',
        type: 'error',
      })
    }
  } catch (error) {
    console.error('Error fetching asset detail:', error)
    handleShowToast({
      message: 'Lỗi khi lấy thông tin tài sản',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

function closeModal() {
  showAddAssetModal.value = false
  selectedAsset.value = null
  isDuplicateMode.value = false
}

async function handleAssetSaved() {
  await fetchAssets()
}

const toast = ref({
  show: false,
  message: '',
  type: 'success',
})

function handleShowToast({ message, type }) {
  toast.value = {
    show: true,
    message,
    type,
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    pageNumber.value = page
    fetchAssets()
  }
}

function previousPage() {
  if (pageNumber.value > 1) {
    pageNumber.value--
    fetchAssets()
  }
}

function nextPage() {
  if (pageNumber.value < totalPages.value) {
    pageNumber.value++
    fetchAssets()
  }
}

function changePageSize(event) {
  pageSize.value = parseInt(event.target.value)
  pageNumber.value = 1
  fetchAssets()
}

async function fetchAssets() {
  loading.value = true
  try {
    const params = {
      pageSize: pageSize.value,
      pageNumber: pageNumber.value,
    }

    if (searchKeyword.value && searchKeyword.value.trim() !== '') {
      params.keyword = searchKeyword.value.trim()
    }

    if (filters.value.assetTypeId) {
      const selectedAssetType = assetTypes.value.find(
        (type) => type.assetTypeId === filters.value.assetTypeId,
      )
      if (selectedAssetType) {
        params.assetTypeName = selectedAssetType.assetTypeName
      }
    }

    if (filters.value.departmentId) {
      const selectedDepartment = departments.value.find(
        (dept) => dept.departmentId === filters.value.departmentId,
      )
      if (selectedDepartment) {
        params.departmentName = selectedDepartment.departmentName
      }
    }

    const response = await AssetAPI.getAll(params)

    if (response.data.success) {
      assets.value = response.data.data.data
      totalCount.value = response.data.data.totalCount

      totalQuantity.value = response.data.data.totalQuantity
      totalOriginalCost.value = response.data.data.totalOriginalCost
      totalAccumulatedDepreciation.value = response.data.data.totalAccumulatedDepreciation
      totalRemainingValue.value = response.data.data.totalRemainingValue
    } else {
      console.error('Failed to fetch assets:', response.data.message)
    }
  } catch (error) {
    console.error('Error fetching assets:', error)
  } finally {
    loading.value = false
  }
}

async function fetchDepartments() {
  try {
    const response = await DepartmentAPI.getAll()
    if (response.data && Array.isArray(response.data)) {
      departments.value = response.data
    }
  } catch (error) {
    console.error('Error fetching departments:', error)
  }
}

async function fetchAssetTypes() {
  try {
    const response = await AssetTypeAPI.getAll()
    if (response.data && Array.isArray(response.data)) {
      assetTypes.value = response.data
    }
  } catch (error) {
    console.error('Error fetching asset types:', error)
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

onMounted(() => {
  fetchAssets()
  fetchDepartments()
  fetchAssetTypes()
})
</script>
