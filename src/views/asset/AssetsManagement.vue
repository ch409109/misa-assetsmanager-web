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
          <!-- Asset rows will go here -->
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="asset-list__footer-cell">
              <div class="asset-list__footer-left">
                <span>Tổng số: <strong>200</strong> bản ghi</span>
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
                <span><strong>13</strong></span>
                <span><strong>249.000.000</strong></span>
                <span><strong>19.716.000</strong></span>
                <span><strong>229.284.000</strong></span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="asset-list__footer"></div>
    </div>
    <AddAssetModal v-if="showAddAssetModal" @close="showAddAssetModal = false" />
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

  &__table {
    width: 100%;
    background-color: #ffffff;
    border-radius: 3.5px;
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    height: 530px;
    overflow: hidden;
    border-collapse: collapse;

    th {
      background-color: #f5f5f5;
      text-align: left;
      height: 40px;
      font-size: 14px;
      padding: 0 12px;
    }
  }

  &__checkbox-col {
    width: 40px;
    text-align: center;
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
import { ref } from 'vue'
import AddAssetModal from './AddAssetModal.vue'
const showAddAssetModal = ref(false)

function openAddAssetModal() {
  showAddAssetModal.value = true
}
</script>
