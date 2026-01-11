import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { FetchRQ } from "./Pages/FetchRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Pages/Home";
import { FetchOld } from "./Pages/FetchOld";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchIndv from "./UI/FetchIndv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fetchold",
        element: <FetchOld />,
      },
      {
        path: "/fetchrq",
        element: <FetchRQ />,
      },
      {
        path: "/fetchrq/:id",
        element: <FetchIndv />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
};

export default App;