import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ContentProvider, useContent } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function PublicLayout() {
  const { settings } = useContent();
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer settings={settings} />
      <FloatingActions whatsapp={settings?.company?.whatsapp || "919825012345"} />
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContentProvider>
          <AuthProvider>
            <ScrollTop />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AuthProvider>
        </ContentProvider>
      </BrowserRouter>
    </div>
  );
}
