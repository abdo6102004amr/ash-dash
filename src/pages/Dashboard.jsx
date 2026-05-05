export default function Dashboard() {
    return (
      <div className="bg-pink-50 min-h-screen p-6">
  
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  
        {/* 🔥 CARDS */}
        <div className="grid grid-cols-3 gap-6">
  
          {/* 💰 Revenue */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-gray-400">Total Revenue</h2>
            <p className="text-2xl font-bold text-pink-500">
              12,500 EGP
            </p>
          </div>
  
          {/* 📦 Products */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-gray-400">Products</h2>
            <p className="text-2xl font-bold text-blue-500">
              24
            </p>
          </div>
  
          {/* 🛒 Orders */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h2 className="text-gray-400">Orders</h2>
            <p className="text-2xl font-bold text-green-500">
              18
            </p>
          </div>
  
        </div>
  
      </div>
    );
  }