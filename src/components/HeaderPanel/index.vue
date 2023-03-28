<script setup>
import { ref, computed, toRaw } from 'vue';
import { useUserStore } from '@/store/modules/user';
import usePermissionStore from '@/store/modules/permission';
import { sStorage } from '@/utils/cache';
// 回到登录页方法
import { toLogin, removeToken } from '@/utils/auth';

const permissionStore = usePermissionStore();
const myMenus = computed(() => {
    let list = [];
    permissionStore.menus.forEach((e) => {
        list.push(toRaw(e));
    });
    return list;
});
const activeIndex = ref('1');
const userStore = useUserStore();
const name = computed(() => userStore.name);
const avatar = computed(() => userStore.avatar);

function logout() {
    // 清空token
    removeToken();
    // 清空sessionStorage
    sStorage.clear();
    // 跳转到登录页
    toLogin();
}
</script>
<template>
    <div class="header-panel-container">
        <div class="header-breadcrumb">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                router
            >
                <el-menu-item index="index">LOGO</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="index">首页</el-menu-item>
                <template v-if="myMenus && myMenus.length > 0">
                    <el-menu-item
                        v-for="route in myMenus"
                        :key="route.children[0].path"
                        :index="route.children[0].path"
                        >{{
                            (
                                route.children[0].meta || {
                                    title: route.children[0].path,
                                }
                            ).title
                        }}</el-menu-item
                    >
                </template>
            </el-menu>
        </div>

        <div class="header-operate">
            <el-icon><Bell /></el-icon>

            <el-dropdown>
                <span class="user-info">
                    <el-avatar size="small" :src="avatar"></el-avatar>
                    <span>{{ name }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout"
                            >退出登录</el-dropdown-item
                        >
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