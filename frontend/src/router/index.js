import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/job/:id",
    element: <JobDetail />,
    loader: async () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
    },
  },
]);

export default router;
