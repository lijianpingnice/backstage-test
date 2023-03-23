<script setup>
import { ref } from "vue";

const activeIndex = ref(1);
</script>
<template>
  <div class="header-panel-container">
    <div class="header-breadcrumb">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-menu-item index="2">
          <template #title>Workspace</template>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="header-operate">
      <el-icon><Bell /></el-icon>

      <el-dropdown>
        <span class="user-info">
          <el-avatar size="small" src="avatar.png"></el-avatar>
          <span>admin</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>切换账号</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
<style lang="less" scoped>
.flex-grow {
  width: 150px;
}
.header-panel-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;

  .header-operate {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.el-icon) {
      font-size: 20px;
      color: #333;
      cursor: pointer;
      padding: 10px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    cursor: pointer;

    span {
      margin-left: 10px;
    }
  }
}
</style>