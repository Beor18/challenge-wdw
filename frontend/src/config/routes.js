import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/*",
    isPrivate: true,
  },
];

export default routes;
