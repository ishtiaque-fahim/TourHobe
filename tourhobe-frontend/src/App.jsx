import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resorts from "./pages/Resorts";
import ResortDetail from "./pages/ResortDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="resorts" element={<Resorts />} />
          <Route path="resorts/:id" element={<ResortDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;