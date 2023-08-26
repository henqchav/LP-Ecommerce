import { Routes, Navigate, Route, Outlet } from "react-router-dom";

// Pages
import Catalogo from "./Pages/Catalago";
import AppNavBar from "./AppNavBar";
import SidePanelLayout from "./Navigation/SidepanelLayout";

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
      </Route>
      <Route path="*" element={<Navigate to="/catalogo" replace />} />
    </Routes>
  );
};

export default AppRouter;
