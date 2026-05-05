import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardReviews from "./pages/DashboardReviews";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import PromoPage from "./pages/PromoPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          
            <Route path="/promos" element={<PromoPage />} />
            {/* 🔥 Reviews */}
            <Route path="/reviews" element={<DashboardReviews />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;