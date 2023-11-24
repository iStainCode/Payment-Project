import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import AdMainDashboard from "./pages/admin/AdMain";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<LayoutAdmin />}>
              <Route index element={<AdMainDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
