import { useEffect, useState } from "react";
import apiClient from "../services/api";

const DashboardReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await apiClient.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete review?")) return;

    try {
      await apiClient.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-500">
        Reviews
      </h2>

      <div className="grid gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow-md p-4 rounded-xl"
          >
            <h4 className="font-bold text-lg">{r.name}</h4>

            <p className="text-sm text-gray-500">
              Product: {r.productName || "Deleted Product"}
            </p>

            <p className="text-yellow-500">⭐ {r.rating}</p>

            <p className="text-gray-700">{r.comment}</p>

            <button
              onClick={() => handleDelete(r.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardReviews;