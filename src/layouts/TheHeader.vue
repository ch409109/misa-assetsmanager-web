<template>
  <div class="header">
    <div class="header__title">Danh sách tài sản</div>
    <div class="header__menu">
      <span class="header__menu-department">Sở tài chính</span>

      <div class="header__menu-year">
        <span class="header__menu-year-label">Năm</span>
        <span class="header__menu-year-value">2025</span>
        <div class="header__menu-year-icon">
          <span class="icon icon-rectangle-up"></span>
          <span class="icon icon-rectangle-down"></span>
        </div>
      </div>

      <div class="header__menu-actions">
        <span class="icon icon-notification"></span>
        <span class="icon icon-extension"></span>
        <span class="icon icon-question"></span>
        <div class="header__menu-avatar">
          <span class="icon icon-avatar"></span>
          <div class="icon icon-rectangle-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background-color: #ffffff;
  padding: 0 20px;

  &__title {
    font-weight: 700;
    font-size: 14px;
  }

  &__menu {
    display: flex;
    align-items: center;

    &-department {
      padding-right: 24px;
      font-size: 14px;
    }

    &-year {
      margin-right: 24px;
      font-size: 14px;
      display: flex;
      align-items: center;
      background-color: rgba(26, 164, 200, 0.2);
      border-radius: 3px;
      width: 112px;
      height: 30px;
      overflow: hidden;
      cursor: pointer;
      justify-content: center;

      &-label {
        margin-right: 8px;
      }

      &-value {
        font-weight: 700;
        margin-right: 8px;
      }

      &-icon {
        display: inline-flex;
        flex-direction: column;
        gap: 2px;
      }
    }

    &-actions {
      display: flex;
      align-items: center;
    }
    
    &-avatar {
      display: flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;

      .icon-avatar {
        margin-right: 0px;
      }

      .icon-rectangle-down {
        margin-right: 0;
      }
    }
  }
}

.icon {
  margin-right: 20px;
  cursor: pointer;

  &.icon-rectangle-up,
  &.icon-rectangle-down {
    margin-right: 0;
  }
}
</style>
