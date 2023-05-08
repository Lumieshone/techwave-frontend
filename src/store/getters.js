const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  total: state => state.count.total,
  likeCount: state => state.count.likeCount,
  replyCount: state => state.count.replyCount,
  notificationCount: state => state.count.notificationCount,
  listCount: state => state.count.listCount
}
export default getters