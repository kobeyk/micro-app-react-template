import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LazyComponent from "@components/LazyComponent";

const DefaultRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: LazyComponent(lazy(() => import("@pages/IndexPage"))),
      children: [
        {
          path: "",
          /** 项目启动后，子路由重定向到map路由组件 */
          element: <Navigate to="map" replace/>
        },
        {
          path: "map",
          element: LazyComponent(lazy(() => import("@pages/map"))),
        },
        {
          path: "login",
          element: LazyComponent(lazy(() => import("@pages/user/user-login"))),
        },
        {
          path: "users",
          element: LazyComponent(lazy(() => import("@pages/user/user-list"))),
        },
      ],
    },
  ]);
};
export default DefaultRoutes;
