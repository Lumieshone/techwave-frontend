import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','user']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录" },
  },

  {
    path: "/admin-login",
    component: () => import("@/views/admin-login/index"),
    meta: { title: "管理员登录" },
  },

  {
    // TODO: 加上权限控制
    path: "/admin-dashboard",
    component: () => import("@/views/admin-dashboard/index"),
    meta: { title: "管理员中台" },

    children: [
      {
        path: "/admin-dashboard/process-report",
        meta: { title: "处理举报" },
        component: () => import("@/views/admin-dashboard/ProcessReport/index"),
      },
      {
        path: "/admin-dashboard/process-section-request",
        meta: { title: "处理版块申请" },
        component: () =>
          import("@/views/admin-dashboard/ProcessSectionRequest/index"),
      },
    ],
    hidden: true,
  },

  {
    // TODO: 加上权限控制
    path: "/moderator-dashboard/:sectionId/",
    component: () => import("@/views/moderator-dashboard/index"),
    meta: { title: "版主中台" },
    children: [
      {
        path: "/moderator-dashboard/:sectionId/process-report",
        meta: { title: "处理举报" },
        component: () =>
          import("@/views/moderator-dashboard/ProcessReport/index"),
      },
      {
        path: "/moderator-dashboard/:sectionId/edit-section",
        meta: { title: "编辑版块" },
        component: () =>
          import("@/views/moderator-dashboard/EditSectionData/index"),
      },
      {
        path: "/moderator-dashboard/:sectionId/highlight-post",
        meta: { title: "设为精华" },
        component: () =>
          import("@/views/moderator-dashboard/HighlightPost/index"),
      },
      {
        path: "/moderator-dashboard/:sectionId/pin-post",
        meta: { title: "置顶帖子" },
        component: () => import("@/views/moderator-dashboard/PinPost/index"),
      },
      {
        path: "/moderator-dashboard/:sectionId/ban-user",
        meta: { title: "封禁用户" },
        component: () => import("@/views/moderator-dashboard/BanUser/index"),
      },
    ],
  },

  {
    path: "/register",
    component: () => import("@/views/register/index"),
    meta: { title: "注册" },
  },

  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    redirect: "/news",
    component: () => import("@/components/HeaderBar"),
    children: [
      {
        path: "/news",
        meta: { title: "首页资讯" },
        component: () => import("@/views/home/news/index"),
      },
      {
        path: "/forum",
        meta: { title: "论坛首页" },

        component: () => import("@/views/home/forum/index"),
      },
      {
        path: "/section/:sectionId/",
        meta: { title: "版块" },

        component: () => import("@/views/home/section/index"),
      },
      {
        path: "/post/:postId/",
        meta: { title: "帖子" },

        component: () => import("@/views/home/post/index"),
      },
      {
        path: "/message/",
        meta: { title: "消息" },
        component: () => import("@/views/home/message/index"),
        redirect: "/message/my-message",
        children: [
          {
            path: "/message/my-message",
            meta: { title: "我的消息" },
            component: () => import("@/views/home/message/MyMessages"),
          },
          {
            path: "/message/system-notification",
            meta: { title: "系统通知" },
            component: () => import("@/views/home/message/SystemNotification"),
          },
          {
            path: "/message/received-like",
            meta: { title: "收到的赞" },
            component: () => import("@/views/home/message/ReceivedLikes"),
          },
          {
            path: "/message/reply-me",
            meta: { title: "回复我的" },
            component: () => import("@/views/home/message/ReplyMe"),
          },
        ],
      },
      {
        path: "/account",
        meta: { title: "个人中心" },
        component: () => import("@/views/home/account/index"),
        redirect: "/account/info",
        children: [
          {
            name: "info",
            path: "/account/info",
            meta: { title: "个人信息" },
            component: () => import("@/views/home/account/AccountInfo"),
          },
          {
            name: "collect",
            path: "/account/collect",
            meta: { title: "我的收藏" },
            component: () => import("@/views/home/account/AccountCollect"),
          },
          {
            name: "post",
            path: "/account/post",
            meta: { title: "我的帖子" },
            component: () => import("@/views/home/account/AccountPost"),
          },

          {
            name: "section",
            path: "/account/section",
            meta: { title: "创建版块" },
            component: () => import("@/views/home/account/AccountSection"),
          },
          {
            name: "safety",
            path: "/account/safety",
            meta: { title: "安全设置" },
            component: () => import("@/views/home/account/AccountSafety"),
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    meta: { title: "404" },
    component: () => import("@/views/page-404"),
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
//  export const asyncRoutes = [
//   {
//     path: '/admin-dashboard',
//     component: () => import('@/views/admin-dashboard/index'),
//     meta: {roles:['admin']},
//     hidden: true,
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
