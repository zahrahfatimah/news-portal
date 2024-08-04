import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import Detail from "../views/Detail";
// import Toastify from "toastify-js";
//impot edit page
const url = "https://h8-phase2-gc.vercel.app";

// proteksi setelah logout di router

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    // loader: () => {
      // if (!localStorage.token) {
      //   Toastify({
      //     text: "Please log in first",
      //     duration: 2000,
      //     newWindow: true,
      //     close: true,
      //     gravity: "bottom",
      //     position: "right",
      //     stopOnFocus: true,
      //     style: {
      //       background: "#EF4C54",
      //       color: "#17202A",
      //       boxShadow: "0 5px 10px black",
      //       fontWeight: "bold",
      //     },
      //   }).showToast();
      //   return redirect("/login");
      // }

      // return null;
    // },
    children: [
      {
        path: "/home",
        element: <Home url={url} />,
      },
      {
        path: "/detail/:id",
        element: <Detail url={url} />,
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
