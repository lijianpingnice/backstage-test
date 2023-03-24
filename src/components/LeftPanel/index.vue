<script setup>
import MenuItem from '@/components/LeftPanel/MenuItem.vue';
const props = defineProps(['routes']);
</script>
<template>
    <div class="left-panel-container">
        <el-menu
            style="border: none"
            background-color="#2a5eff"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
        >
            <MenuItem
                v-for="route in props.routes"
                :route="route"
                :key="route.path"
            />
        </el-menu>
    </div>
</template>
<style lang="less" scoped>
.right-panel-container {
    width: 100%;
    height: 100vh;
    background-color: #2a5eff;
    color: #fff;
    overflow-y: auto;

    :deep(.el-menu .el-sub-menu.is-active .el-sub-menu__title),
    :deep(.el-menu .el-menu-item.is-active) {
        background-color: var(--el-menu-hover-bg-color);
        color: #52cca3;
    }

    :deep(.el-menu .el-menu-item.is-active) {
        border-left: 3px solid #52cca3;
    }

    :deep(.el-sub-menu .el-menu) {
        background-color: darken(#224bcc, 10%);
    }
}

.right-logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;

    .right-logo {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;

        img {
            height: 48px;
        }
    }
}
</style>