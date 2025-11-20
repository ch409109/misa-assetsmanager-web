<template>
  <div class="content">
    <div class="toolbar">
      <div class="toolbar__left">
        <div class="toolbar__search">
          <input type="text" placeholder="Tìm kiếm tài sản" class="toolbar__search-input" />
        </div>
        <div class="toolbar__filter">
          <select class="toolbar__filter-select">
            <option>Loại tài sản</option>
          </select>
        </div>
        <div class="toolbar__filter">
          <select class="toolbar__filter-select">
            <option>Bộ phận sử dụng</option>
          </select>
        </div>
      </div>
      <div class="toolbar__right">
        <div class="toolbar__btn-add" @click="openAddAssetModal">+ Thêm tài sản</div>
        <div class="toolbar__btn-import"><span class="icon icon-excel"></span></div>
        <div class="toolbar__btn-delete"><span class="icon icon-bin"></span></div>
      </div>
    </div>
    <div class="asset-list">
      <table class="asset-list__table">
        <thead>
          <tr>
            <th class="asset-list__checkbox-col">
              <input type="checkbox" class="asset-list__checkbox" />
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
            :key="asset.id"
            @mouseenter="hoveredRow = index"
            @mouseleave="hoveredRow = null"
          >
            <td class="asset-list__checkbox-col">
              <input type="checkbox" class="asset-list__checkbox" />
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
              ></span>
              <span
                v-if="hoveredRow === index"
                class="icon icon-clone"
                title="Nhân bản"
                style="cursor: pointer"
              ></span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="asset-list__footer-cell">
              <div class="asset-list__footer-left">
                <span
                  >Tổng số: <strong>{{ totalCount }}</strong> bản ghi</span
                >
                <select class="asset-list__footer-select">
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </td>
            <td colspan="2" class="asset-list__footer-cell asset-list__footer-center">
              <div class="asset-list__footer-pagination">
                <button>&lt;</button>
                <button>1</button>
                <button>2</button>
                <span>...</span>
                <button>10</button>
                <button>&gt;</button>
              </div>
            </td>
            <td colspan="2"></td>
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
      @close="showAddAssetModal = false"
      @showToast="handleShowToast"
      @save="handleAssetSaved"
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

  &__search-input {
    background-color: #ffffff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 179px;
    height: 35px;
    overflow: hidden;
    margin-right: 12px;
  }

  &__filter-select {
    background-color: #ffffff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 219px;
    height: 35px;
    overflow: hidden;
    margin-right: 12px;
  }

  &__right {
    display: flex;
    align-items: center;
  }

  &__btn-add {
    background-color: #1aa4c8;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
    width: 110px;
    height: 36px;
    overflow: hidden;
    color: #ffffff;
    font-size: 13px;
    @include flex-center;
    cursor: pointer;
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
import { ref, onMounted } from 'vue'
import AddAssetModal from './AddAssetModal.vue'
import MsToast from '@/components/ms-toast/MsToast.vue'
import AssetAPI from '@/apis/modules/AssetAPI.js'

const showAddAssetModal = ref(false)
const assets = ref([])
const totalCount = ref(0)
const loading = ref(false)
const hoveredRow = ref(null)

const totalQuantity = ref(0)
const totalOriginalCost = ref(0)
const totalAccumulatedDepreciation = ref(0)
const totalRemainingValue = ref(0)

function openAddAssetModal() {
  showAddAssetModal.value = true
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

async function handleAssetSaved() {
  await fetchAssets()
}

async function fetchAssets() {
  loading.value = true
  try {
    loading.value = true
    const response = await AssetAPI.getAll()

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

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

onMounted(() => {
  fetchAssets()
})
</script>
