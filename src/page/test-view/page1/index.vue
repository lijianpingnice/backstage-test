<script setup>
import { onMounted } from 'vue';
import LayoutMain from '@/layout/layoutMain.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
    // 打印
    console.log('router:', router.currentRoute);
    console.log('router:', router.options);
});
</script>

<template><LayoutMain /></template>

<style>
</style>