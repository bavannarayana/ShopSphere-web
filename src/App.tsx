import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { lazy } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import ThemeProvider from "./context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Products = lazy(() => import("./components/Products"));

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route element={<HomeLayout />}>
                  <Route path="/dashboard" element={<Products />} />
                </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
