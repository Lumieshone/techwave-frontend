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
    hidden: true,
  },

  {
    path: "/admin-login",
    component: () => import("@/views/admin-login/index"),
    meta: { title: "管理员登录" },

    hidden: true,
  },

  {
    path: "/admin-dashboard",
    component: () => import("@/views/admin-dashboard/index"),
    meta: { title: "管理面板" },

    children: [], //TODO: 未做的管理员功能
    hidden: true,
  },

  {
    path: "/register",
    component: () => import("@/views/register/index"),
    meta: { title: "注册" },

    hidden: true,
  },

  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    redirect: "/news",
    hidden: true,
    component: () => import("@/components/HeaderBar"),
    children: [
      {
        path: "/news",
        meta: { title: "首页资讯" },
        component: () => import("@/views/home/get-news/index"),
      },
      {
        path: "/forum",
        meta: { title: "论坛首页" },

        component: () => import("@/views/home/forum/index"),
      },
      {
        path: "/section/:section_id/",
        meta: { title: "版块" },

        component: () => import("@/views/home/section/index"),
      },
      {
        path: "/post/:post_id/",
        meta: { title: "帖子" },

        component: () => import("@/views/home/post/index"),
      },
      {
        path: "/account",
        meta: { title: "个人管理" },
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
            name: "reply",
            path: "/account/reply",
            meta: { title: "回复我的" },
            component: () => import("@/views/home/account/AccountReply"),
          },
          {
            name: "transaction",
            path: "/account/transaction",
            meta: { title: "我的交易" },
            component: () => import("@/views/home/account/AccountTransaction"),
          },
          {
            name:"section",
            path: "/account/section",
            meta: { title: "我的版块" },
            component: () => import("@/views/home/account/AccountSection"),
          },
          {
            name: "safety",
            path: "/account/safety",
            meta: { title: "安全设置" },
            component: () => import("@/views/home/account/AccountSafety"),
          },
          {
            name: "certify",
            path: "/account/certify",
            meta: { title: "学生认证" },
            component: () => import("@/views/home/account/AccountCertify"),
          },
        ],
      },
      {
        path: "/sale",
        meta: { title: "交易求购" },

        component: () => import("@/views/home/sale/index"),
      },
      {
        path: "/transaction/:transaction_id",
        meta: { title: "交易帖子" },

        component: () => import("@/views/home/transaction/index"),
      },
    ],
  },

  {
    path: "/404",
    meta: { title: "404" },

    component: () => import("@/views/page-404"),
    hidden: true,
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
