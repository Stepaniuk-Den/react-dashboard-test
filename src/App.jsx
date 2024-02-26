import { Suspense, lazy } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.scss";
import PrivateRoute from "./guards/PrivateRoute.jsx";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Loader from "./components/loader/Loader.jsx";

const Home = lazy(() => import("./pages/home/Home"));
const User = lazy(() => import("./pages/user/User"));
const Users = lazy(() => import("./pages/users/Users"));
const Product = lazy(() => import("./pages/product/Product"));
const Products = lazy(() => import("./pages/products/Products"));

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute>{<Home />}</PrivateRoute>} />
          <Route
            path="users"
            element={<PrivateRoute>{<Users />}</PrivateRoute>}
          />
          <Route
            path="/users/:id"
            element={<PrivateRoute>{<User />}</PrivateRoute>}
          />
          <Route
            path="products"
            element={<PrivateRoute>{<Products />}</PrivateRoute>}
          />
          <Route
            path="products/:id"
            element={<PrivateRoute>{<Product />}</PrivateRoute>}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
