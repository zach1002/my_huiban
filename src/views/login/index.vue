<template>
    <div class="login-container">
        <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
            <div class="title-container">
                <h3 class="title">用户登陆</h3>
            </div>
            <el-form-item prop="username">
                <el-icon :size="20" class="svg-container">
                    <User />
                </el-icon>
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-icon :size="20" class="svg-container">
                    <Lock />
                </el-icon>
                <el-input v-model="form.password" :type="passwordType"></el-input>
                <el-icon :size="20" class="svg-container" @click="changeType" v-if="passwordType === 'password'">
                    <Hide />
                </el-icon>
                <el-icon :size="20" class="svg-container" @click="changeType" v-else>
                    <View />
                </el-icon>
            </el-form-item>
            <el-button type="primary" class="login-button" @click="handleLogin">登陆</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ElForm, ElFormItem, ElInput, ElButton, ElIcon, ElMessage } from 'element-plus';
const form = ref({
    username: 'admin',
    password: '123456'
})

// 表单校验，验证用户名密码是否符合规则
const rules = ref({
    username: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        }
    ],
    password: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        }
    ]
})

// 统一校验
const formRef = ref(null)
const router = useRouter();
// 处理登录
const handleLogin = () => {
   // 静态验证用户名和密码
    if (form.value.username === 'admin' && form.value.password === '123456') {
        ElMessage.success({ message: '登录成功', duration: 1000 });
        setTimeout(() => {
          router.push('/welcome');
        }, 1000);
    } else {
        ElMessage.error('用户名或密码错误');
    }
};

const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>

<style lang="scss" scoped>
@mixin appearance($value) {
  -webkit-appearance: $value; // Chrome, Safari, newer versions of Opera
  -moz-appearance: $value;    // Firefox
  -ms-appearance: $value;     // Internet Explorer
  -o-appearance: $value;      // Older versions of Opera
  appearance: $value;
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 82%;

      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
        width: 80%
      }

      input {
        background: transparent;
        border: 0px;
        @include appearance(none);
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
