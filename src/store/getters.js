export default {
  siderType: (state) => state.app.siderType,
  isLogin: (state) => state.user.isLogin,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  email: state => state.user.email,
  phone: state => state.user.phone,
}
