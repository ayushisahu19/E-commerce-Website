import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
