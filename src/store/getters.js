const getters = {
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  is_authenticated: state => state.user.is_authenticated,
}
export default getters