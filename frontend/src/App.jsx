import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <NavLink to="/" className="brand">
          BlackBeltBot
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Overview
          </NavLink>
          <NavLink to="/items">API demo</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </main>
    </div>
  );
}
