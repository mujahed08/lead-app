import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import Leads from "../views/leads";
import Lead from "../views/lead";
import Remove from "../views/lead/remove";
import Edit from "../views/lead/edit";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "lead",
        element: <Lead />,
      },
      {
        path: "/lead/remove/:id",
        element: <Remove />,
      },
      {
        path: "/lead/edit/:id",
        element: <Edit />,
      },
      {
        path: "/leads",
        element: <Leads />,
      },
    ],
  },
]);

export default router;
