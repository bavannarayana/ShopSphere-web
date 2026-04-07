import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { lazy } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import ThemeProvider from "./context/ThemeProvider";

const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Products = lazy(() => import("./components/Products"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
