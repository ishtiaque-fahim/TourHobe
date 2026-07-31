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

const PublicRoute = ({ children }) => {
  const { currentUser, loading, redirecting } = useAuth();
  if (loading || redirecting) return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
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