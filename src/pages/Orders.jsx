import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // 🔥 popup

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  const resolveImage = (img) => {
    if (!img) return null;
  
    if (img.startsWith("http")) return img; // Supabase
    if (img.startsWith("data:image")) return img;
  
    return `https://ashbackend-production.up.railway.app/uploads/${img}`;
  };
  console.log("ORDERS:", orders);
  const doneOrders = orders.filter(o => o.status === "Done");

    const totalRevenue = doneOrders.reduce((sum, o) => {
      return sum + Number(o.totalPrice || 0) + 60;
    }, 0);

    const totalOrders = orders.length;
    const doneCount = doneOrders.length;
    const deleteOrder = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) return;
    
      try {
        await API.delete(`/orders/${id}`);
        fetchOrders(); // refresh
      } catch (err) {
        console.error(err);
      }
    };
  return (
    
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="bg-white p-4 rounded-xl shadow">
        <h3>Total Orders</h3>
        <p className="text-xl font-bold">{totalOrders}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3>Done Orders</h3>
        <p className="text-xl font-bold">{doneCount}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3>Total Revenue</h3>
        <p className="text-xl font-bold">{totalRevenue} EGP</p>
      </div>

      </div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)} // 🔥 click
            className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-5 flex justify-between items-center hover:scale-[1.01] transition cursor-pointer"
          >
            <div>
              <h2 className="font-bold text-lg">
                {order.customerName}
              </h2>

              <p>{order.phone}</p>

              <p className="text-sm text-gray-600 mt-1">
                Payment:{" "}
                <span className="font-semibold">
                  {order.payment_method === "instapay"
                    ? "InstaPay"
                    : "Cash"}
                </span>
              </p>

              <span className="text-sm px-3 py-1 rounded-full bg-pink-100 text-pink-600">
                {order.status}
              </span>
            </div>

            {order.payment_method === "instapay" &&
              resolveImage(order.paymentScreenshot) && (
                <img
                  src={resolveImage(order.paymentScreenshot)}
                  alt="payment"
                  className="w-24 h-24 object-cover rounded-xl shadow"
                />
              )}

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(order.id, "Confirmed");
                }}
                className="bg-green-500 text-white px-4 py-1 rounded-full"
              >
                Confirm
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(order.id, "Shipped");
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded-full"
              >
                Ship
              </button>
              <button
                onClick={() => updateStatus(order.id, "Done")}
                className="bg-purple-500 text-white px-4 py-1 rounded-full hover:scale-105 transition"
              >
                Done
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 POPUP */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder.id}
            </h2>

            {/* 👤 Customer */}
            <div className="mb-4">
              <p><b>Name:</b> {selectedOrder.customerName}</p>
              <p><b>Phone:</b> {selectedOrder.phone}</p>
              <p><b>Email:</b> {selectedOrder.email}</p>
              <p><b>Address:</b> {selectedOrder.address}</p>
            </div>

            {/* 💳 Payment */}
            <div className="mb-4">
              <p><b>Payment:</b> {selectedOrder.payment_method}</p>

              {selectedOrder.payment_method === "instapay" &&
                resolveImage(selectedOrder.paymentScreenshot) && (
                  <img
                    src={resolveImage(selectedOrder.paymentScreenshot)}
                    className="w-full rounded-xl mt-2"
                  />
                )}
            </div>

            {/* 🛒 Items */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Items</h3>

              {selectedOrder.items?.map((item, i) => (
                <div
                  key={i}
                  className="border-b py-2 text-sm"
                >
                  <p>{item.name}</p>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>{item.price} EGP</p>
                </div>
              ))}
            </div>
            {selectedOrder.promoCode && (
              <div>
                <p><b>Promo Code:</b> {selectedOrder.promoCode}</p>
                <p><b>Discount:</b> {selectedOrder.discount}</p>
              </div>
            )}

            {/* 💰 Total */}
            <p className="font-bold text-lg">
            Total: {Number(selectedOrder.totalPrice) + 60} EGP
            </p>
            

            {/* ❌ Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-xl"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
  
}
