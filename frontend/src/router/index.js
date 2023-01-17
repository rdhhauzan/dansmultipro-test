import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import Home from "../pages/Home";
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
]);

export default router;
