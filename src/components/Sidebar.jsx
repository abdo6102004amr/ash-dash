import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `transition ${
      location.pathname === path
        ? "text-pink-500 font-bold"
        : "text-gray-700 hover:text-pink-500"
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-xl p-6 rounded-r-3xl">
      <h1 className="text-2xl font-bold text-pink-500 mb-10">
        ASH Admin
      </h1>

      <nav className="flex flex-col gap-6">

        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/orders" className={linkClass("/orders")}>
          Orders
        </Link>

        <Link to="/products" className={linkClass("/products")}>
          Products
        </Link>

        {/* 🔥 Reviews */}
        <Link to="/reviews" className={linkClass("/reviews")}>
          Reviews
        </Link>
        <Link to="/promos" className={linkClass("/promos")}>
           Promo Codes
        </Link>

      </nav>
    </div>
  );
}