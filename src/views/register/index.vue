<template>
  <div class="login-container">
    <div class="sidebar-head">
      <img src="@/assets/images/th.png" alt="logo" class="sidebar-logo">
      <h1 class="sidebar-title">假会伴 </h1>
    </div>

    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
        <div class="title-container">
            <h3 class="title">{{$t('register.title')}}</h3>
        </div>
        <el-form-item prop="username">
            <el-icon :size="20" class="svg-container">
                <User />
            </el-icon>
            <el-input v-model="form.username" :placeholder="$t('register.nameInput')" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-icon :size="20" class="svg-container">
                <Lock />
            </el-icon>
            <el-input v-model="form.password" :placeholder="$t('register.passwordInput')" :type="passwordType"></el-input>
            <el-icon :size="20" class="svg-container" @click="changeType" v-if="passwordType === 'password'">
                <Hide />
            </el-icon>
            <el-icon :size="20" class="svg-container" @click="changeType" v-else>
                <View />
            </el-icon>
        </el-form-item>
        <el-form-item prop="password">
            <el-icon :size="20" class="svg-container">
              <Warning />
            </el-icon>
            <el-input v-model="form.checkpassword" :placeholder="$t('register.passwordCheck')" :type="passwordType"></el-input>
            <el-icon :size="20" class="svg-container" @click="changeType" v-if="passwordType === 'password'">
                <Hide />
            </el-icon>
            <el-icon :size="20" class="svg-container" @click="changeType" v-else>
                <View />
            </el-icon>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" class="login-button" @click="handleForRegister">{{$t('register.btnTitle')}}</el-button>
          <el-button type="primary" class="register-button"  @click="handleToLogin">{{$t('register.btnLogin')}}</el-button>
        </div>

    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock, View, Hide, Warning} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ElForm, ElFormItem, ElInput, ElButton, ElIcon, ElMessage } from 'element-plus';
import { useStore } from 'vuex';

const form = ref({
    username: '',
    password: '',
    checkpassword: ''
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
            message: 'Please input Activity password',
            trigger: 'blur',
        }
    ],
    checkpassword: [
        {
            required: true,
            message: 'Please input Activity password',
            trigger: 'blur',
        }
    ]
})

// 统一校验
const formRef = ref(null)
const router = useRouter();
const store = useStore();
// 处理注册
const handleForRegister = () => {
  store.dispatch('user/register', form.value).then(() => {
    ElMessage.success({ message: '注册成功', duration: 1000 });
  }).catch((msg) => {
        ElMessage.error(msg);
      });
};

const handleToLogin = () => {
  router.push('/login');
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

$bg: #ffffff;
$dark_gray: #82afc7;
$light_gray: #ba4747;
$cursor: #dd9c9c;

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
    .button-container {
      width: 100%;
      display: flex;
      justify-content: space-between; /* 左右分布 */
      align-items: center; /* 水平居中对齐 */
      gap: 10px; /* 按钮之间的间距 */

      .login-button {
        width: 40%;
        box-sizing: border-box;
        margin-left: 5%;
      }

      .register-button {
        width: 40%;
        box-sizing: border-box;
        //margin-top: 10px;
        margin-right: 5%;
      }
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

.sidebar-title {
      display: inline-block;
      margin: 0;
      color: #ffffff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}

.sidebar-head {
  width: 50%; /* 或者固定宽度，如 300px */
  margin-left: 30px;
  margin-top: 10px;
}


</style>
