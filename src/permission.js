import router from "./router";
import store from "./store";
import Message from "./components/Message/index.js";
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/getPageTitle";

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    // determine whether the user has obtained his permission roles through getInfo
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (hasRoles) {
      console.log(store.getters.roles);
      // user
      let isUser = false;
      store.getters.roles.forEach((role) => {
        if (role.name == "user") {
          isUser = true;
        }
      });
      if (to.path === "/login" && isUser) {
        // if user is logged in, redirect to the home page
        next({ path: "/" });
      }
      // moderator
      else if (to.path.includes("/moderator-dashboard")) {
        const sectionId = to.params.sectionId;
        console.log(sectionId);
        let isModerator = false;
        console.log(sectionId);
        store.getters.roles.forEach((role) => {
          if (role.name == "moderator" && role.sectionId == sectionId) {
            isModerator = true;
          }
        });
        if (isModerator) {
          next();
        } else {
          Message.error("您不是该版块的版主");
          next({ path: "/" });
        }
      }
      // admin
      let isAdmin = false;
      store.getters.roles.forEach((role) => {
        if (role.name == "admin") {
          isAdmin = true;
        }
      });
      if (isAdmin) {
        if (to.path == "/admin-login") {
          // if is logged in, redirect to the dashboard
          next({ path: "/admin-dashboard" });
        }
        else if (to.path.includes("/admin-dashboard")) {
          next();
        } else {
          Message.error("管理员只能访问管理员中台");
          next({ path: "/admin-dashboard" });
        }
      }
      else if (to.path.includes("/admin-dashboard")) {
        Message.error("普通用户无法访问管理员中台");
        next({ path: "/" });
      }
      next();
    } else {
      try {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

        // eslint-disable-next-line no-unused-vars
        const { roles } = await store.dispatch("user/getInfo");

        // // generate accessible routes map based on roles
        // const accessRoutes = await store.dispatch(
        //   "permission/generateRoutes",
        //   roles
        // );

        // // dynamically add accessible routes
        // // router.addRoutes(accessRoutes)
        // accessRoutes.forEach((singleRoute) => {
        //   router.addRoute(singleRoute);
        // });

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        // next({ ...to, replace: true });

        next();
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch("user/resetToken");

        Message.error("获取信息失败，请重新登录");
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    /* has no token*/
    if (to.path.includes("admin-dashboard")) {
      Message.error("管理员请先登录");
      next(`/admin-login`);
    } else if (to.path.includes("moderator-dashboard")) {
      Message.error("版主请先登录");
      next(`/login`);
    } else if (to.path.includes("account") || to.path.includes("message")) {
      Message.error("请先登录");
      next(`/login`);
    } else {
      next();
    }
  }
});

router.afterEach(() => {});
