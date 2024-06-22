import ReactDOM from "react-dom";
import "./index.css";
// import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./Routes/Routes.jsx";

import AuthProvider from "./Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

// Initialize the QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </QueryClientProvider>
);
