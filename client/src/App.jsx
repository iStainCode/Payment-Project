import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import AdMainDashboard from "./pages/admin/AdMain";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdProducts from "./pages/admin/Products/AdProducts";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { UserProvider } from "./context/UserContext"
import NewProduct from "./pages/admin/Products/NewProduct";
import EditProducts from "./pages/admin/Products/EditProducts";
import AdCategorys from "./pages/admin/Categorys/AdCategorys";
import NewCategory from "./pages/admin/Categorys/NewCategory";
import AdUsers from "./pages/admin/Users/AdUser";
import NewUser from "./pages/admin/Users/NewUser";
import EditUsers from "./pages/admin/Users/EditUser";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>
          <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<LayoutAdmin />}>
                  <Route index element={<AdMainDashboard />} />
                  <Route path="/dashboard/products" element={<AdProducts />} />
                  <Route
                    path="/dashboard/newProduct"
                    element={<NewProduct />}
                  />
                  <Route
                    path="/dashboard/product/:id"
                    element={<EditProducts />}
                  />
                  <Route path="/dashboard/categorys" element={<AdCategorys />} />
                  <Route path="/dashboard/newCategory" element={<NewCategory />} />
                  <Route path="/dashboard/users" element={<AdUsers />} />
                  <Route path="/dashboard/newUser" element={<NewUser />} />
                  <Route path="/dashboard/user/:id" element={<EditUsers />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          </UserProvider>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
