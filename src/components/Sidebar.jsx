import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const linkClass = (path) =>
    `block transition ${
      location.pathname === path
        ? "text-pink-500 font-bold"
        : "text-gray-700 hover:text-pink-500"
    }`;

  return (
    <>
      {/* 🔥 Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
        fixed md:static z-50
        h-screen bg-white shadow-xl p-6 rounded-r-3xl
        w-64
        transform transition-transform duration-300
        
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        {/* 🔥 Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-pink-500">
            ASH Admin
          </h1>

          {/* زرار قفل في الموبايل */}
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* 🔥 Links */}
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

          <Link to="/reviews" className={linkClass("/reviews")}>
            Reviews
          </Link>

          <Link to="/promos" className={linkClass("/promos")}>
            Promo Codes
          </Link>

        </nav>
      </div>
    </>
  );
}
