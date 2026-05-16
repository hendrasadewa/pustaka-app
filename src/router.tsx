import { createBrowserRouter } from "react-router";
import { Root } from "./root";
import HomePage from "./pages";
import LoginPage from "./pages/login";
import DashboardLayout from "./components/DashboardLayout";
import AdminBooksPage from "./pages/admin/books";
import { BookDetailPage } from "./pages/admin/books/id";
import { EditBookPage } from "./pages/admin/books/id/edit";
import { CreateBookPage } from "./pages/admin/books/create";
import { LogoutPage } from "./pages/logout";
import RegisterPage from "./pages/register";
import BookByISBNPage from "./pages/books/isbn";

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
        path: "/book/isbn/:isbn",
        element: <BookByISBNPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
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
                    path: "/admin/books",
                    index: true,
                    element: <AdminBooksPage />,
                  },
                  {
                    path: "/admin/books/create",
                    element: <CreateBookPage />,
                  },
                  {
                    path: "/admin/books/:id",
                    element: <BookDetailPage />,
                  },
                  {
                    path: "/admin/books/:id/edit",
                    element: <EditBookPage />,
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
