import { Routes, Navigate, Route, Outlet } from "react-router-dom";

// Pages
import Catalogo from "./Pages/Catalago";
import SidePanelLayout from "./Navigation/SidePanelLayout";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AppNavBar from "./AppNavBar";
import Producto from "./Pages/Producto";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <div>
            <AppNavBar />
            <SidePanelLayout render={<Outlet />} />
          </div>
        }
      >
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto" element={<Producto />} />
      </Route>
      
      <Route
        element={
          <div>
            <AppNavBar />
            <SidePanelLayout render={<Outlet />} />
          </div>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route
        element={
          <div>
            <Login />
          </div>
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
        
      
      <Route path="*" element={<Navigate to="/catalogo" replace />} />
    </Routes>
  );
};

export default AppRouter;
