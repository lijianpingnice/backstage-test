<script setup>
import RegisterForm from './RegisterForm.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="6">
                        <RegisterForm />
                    </el-col>
                </el-row>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style>
</style>