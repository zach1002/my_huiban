export default {
  siderType: (state) => state.app.siderType,
  isLogin: (state) => state.user.isLogin,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.userInfo.avatar,
  name: state => state.user.userInfo.name,
  email: state => state.user.userInfo.email,
  phone: state => state.user.userInfo.phone,
  role: state => state.user.userInfo.role,
}
