<script setup>
import { login } from '@/api/user';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { validatorPass, validatorAccountNumber } from '@/utils/validate';
import { useRouter } from 'vue-router';
import { lStorage } from '@/utils/cache';
import { setToken } from '@/utils/auth';

const registerTitle = `${import.meta.env.VITE_APP_TITLE}`;

// 获取路由router
const router = useRouter();

const isRemember = ref(false);
const loginForm = ref({
    pass: '',
    accountNumber: '',
});
const loginFormRef = ref(null);
initLoginInfo();
function initLoginInfo() {
    const localLoginInfo = lStorage.get('loginInfo');
    if (localLoginInfo) {
        loginForm.value.pass = localLoginInfo.pass || '';
        loginForm.value.accountNumber = localLoginInfo.accountNumber || '';
    }
}
const rules = reactive({
    pass: [{ validator: validatorPass, trigger: ['blur', 'change'] }],
    accountNumber: [
        { validator: validatorAccountNumber, trigger: ['blur', 'change'] },
    ],
});
const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            // console.log('submit!');
            // ElMessage({
            //     message: 'submit!',
            //     type: 'success',
            //     duration: 3 * 1000,
            // });
            handleLogin();
        } else {
            console.log('error submit!');
            ElMessage({
                message: 'error submit!',
                type: 'error',
                duration: 3 * 1000,
            });
            return false;
        }
    });
};

async function handleLogin() {
    const { accountNumber, pass } = loginForm.value;
    if (!accountNumber || !pass) {
        ElMessage({
            message: '请输入账号和密码!',
            type: 'error',
            duration: 3 * 1000,
        });
        return;
    }
    try {
        const res = await login({ accountNumber, pass });
        if (res.code === 0) {
            ElMessage.success('登录成功!');
            setToken(res.data.token);
            if (isRemember.value) {
                lStorage.set('loginInfo', { accountNumber, pass });
            } else {
                lStorage.remove('loginInfo');
            }
            router.push('/');
        } else {
            ElMessage.warning(res.msg);
        }
    } catch (error) {
        ElMessage.warning(error.msg);
    }
}

const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    isRemember.value = false;
};
</script>

<template>
    <div class="RegisterForm-box">
        <el-row>
            <el-col :span="20" :offset="2">
                <h1 class="RegisterForm-box-title">
                    {{ registerTitle }}
                </h1></el-col
            >
        </el-row>
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="rules"
            label-width="90px"
            class="demo-loginForm"
        >
            <el-form-item label="用户名" prop="accountNumber">
                <el-input
                    v-model="loginForm.accountNumber"
                    type="text"
                    autocomplete="off"
                    placeholder="请输入用户名"
                />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input
                    v-model="loginForm.pass"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                />
            </el-form-item>
            <el-form-item label="记住我" prop="isRemember">
                <el-checkbox v-model="isRemember" label="是" size="large" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)"
                    >Submit</el-button
                >
                <el-button @click="resetForm(loginFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style>
.RegisterForm-box-title {
    text-align: center;
}
</style>