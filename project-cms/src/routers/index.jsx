import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import AddForm from "../views/AddPage";
import EditForm from "../views/EditPage";
import AddUser from "../views/AddUser";
import Categories from "../views/Category";

const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/home");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.token) {
        Toastify({
          text: "Please log in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/home",
        element: <Home url={url} />,
      },
      {
        path: "/add",
        element: <AddForm url={url} />,
      },
      {
        path: "/addUser",
        element: <AddUser url={url} />,
      },
      {
        path: "/categories",
        element: <Categories url={url} />,
      },
      {
        path: `/edit/:id`,
        element: <EditForm url={url} />,
      },
      {
        path: "/", // Default route
        element: <Home url={url} />,
      },
      {
        path: "*", // Route not found
        element: <Home url={url} />,
      },
    ],
  },
]);

export default router;
