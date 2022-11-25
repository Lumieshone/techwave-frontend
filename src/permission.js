import router from "./router";
import store from "./store";
// import { Message } from 'element-ui'
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        if (
          to.path === "/admin-login" &&
          store.getters.roles.includes("admin")
        ) {
          // if is logged in, redirect to the home page
          next({ path: "/admin-dashboard" });
        } else {
          next();
        }
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

          // TODO: 报错提示
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* has no token*/
    if (to.path.indexOf("admin-dashboard") !== -1) {
      next(`/admin-login`);
    } else {
      next();
    }
  }
});

router.afterEach(() => {});
