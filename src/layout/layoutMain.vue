<script setup>
import { RouterView } from 'vue-router';
import LeftPanel from '@/components/LeftPanel/index.vue';
const cRoutesData = defineProps(['cRoutes']);
</script>
<template>
    <el-container>
        <el-aside
            v-if="cRoutesData.cRoutes && cRoutesData.cRoutes.length > 0"
            width="200px"
            ><LeftPanel :routes="cRoutesData.cRoutes"
        /></el-aside>
        <el-main><RouterView /></el-main>
    </el-container>
</template>