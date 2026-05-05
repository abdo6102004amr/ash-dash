export default function Navbar() {
    return (
      <div className="backdrop-blur-md bg-white/60 shadow-md p-4 flex justify-between items-center rounded-xl mx-4 mt-4">
        <h2 className="font-bold text-lg">ASH Dashboard</h2>
  
        <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition">
          Logout
        </button>
      </div>
    );
  }