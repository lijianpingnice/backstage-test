<script setup>
import LeftPanel from "@/components/LeftPanel/index.vue";
import HeaderPanel from "@/components/HeaderPanel/index.vue";
</script>
<template>
  <el-container>
    <el-header><HeaderPanel /></el-header>
    <el-container>
      <el-aside width="200px"><LeftPanel /></el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>