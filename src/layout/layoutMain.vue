<script setup>
import { RouterView } from 'vue-router';
import { asyncRoutes } from '@/router/routes';
import LeftPanel from '@/components/LeftPanel/index.vue';
</script>
<template>
    <el-container>
        <el-aside v-if="asyncRoutes && asyncRoutes.length > 0" width="200px"
            ><LeftPanel :routes="asyncRoutes"
        /></el-aside>
        <el-main><RouterView /></el-main>
    </el-container>
</template>