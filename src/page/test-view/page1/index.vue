<script setup>
import { onMounted } from 'vue';
import LayoutMain from '@/layout/layoutMain.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const currentRouteName = router.currentRoute.value.name;
const allRoutes = router.getRoutes();
let childrenRoutes = allRoutes.filter((r) => r.name === currentRouteName);
</script>

<template><LayoutMain :cRoutes="childrenRoutes[0].children" /></template>

<style>
</style>