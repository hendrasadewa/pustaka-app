import { createBrowserRouter } from "react-router";
import { Root } from "./root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import BookDirectoryPage from "./pages/BookDirectoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin",
            children: [
              {
                path: "/admin/books",
                children: [
                  {
                    index: true,
                    path: "/admin/books",
                    element: <BookDirectoryPage />,
                  },
                  {
                    path: "/admin/books/loan",
                    element: <HomePage />,
                  },
                  {
                    path: "/admin/books/return",
                    element: <HomePage />,
                  },
                ],
              },
              {
                path: "/admin/members",
                element: <HomePage />,
              },
              {
                path: "/admin/settings",
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
