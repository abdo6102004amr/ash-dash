import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardReviews from "./pages/DashboardReviews";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import PromoPage from "./pages/PromoPage";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <div className="flex">

        {/* 🔥 Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* 🔥 Content */}
        <div className="flex-1 min-h-screen bg-gray-50">

          {/* 🔥 Top bar (mobile only) */}
          <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
            <h1 className="text-pink-500 font-bold">ASH Admin</h1>

            <button onClick={() => setOpen(true)}>
              ☰
            </button>
          </div>

          <div className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<h1>Dashboard</h1>} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/promos" element={<PromoPage />} />
              <Route path="/reviews" element={<DashboardReviews />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
