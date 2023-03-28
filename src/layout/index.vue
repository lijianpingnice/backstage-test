<script setup>
import { RouterView } from 'vue-router';
import HeaderPanel from '@/components/HeaderPanel/index.vue';
</script>
<template>
    <el-container>
        <el-header><HeaderPanel /></el-header>
        <el-main><RouterView /></el-main>
    </el-container>
</template>