import { useEffect, useState } from "react";
import API from "../services/api";

const PromoPage = () => {
  const [promos, setPromos] = useState([]);

  const [form, setForm] = useState({
    code: "",
    type: "percentage",
    discount_value: "",
    min_order: "",
    usage_limit: "",
    start_date: "",
    end_date: "",
    bundle_buy: "",
    bundle_get: "",
    buy_qty: 1,
    get_qty: 1,
  });

  // 🔄 Fetch Promos
  const fetchPromos = async () => {
    try {
      const res = await API.get("/promo");
      setPromos(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // ➕ Add Promo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanForm = {
        ...form,
        discount_value: parseFloat(form.discount_value) || 0,
        min_order: parseFloat(form.min_order) || 0,
        usage_limit: parseInt(form.usage_limit) || 0,
        buy_qty: parseInt(form.buy_qty) || 1,
        get_qty: parseInt(form.get_qty) || 1,
        bundle_buy: form.bundle_buy || null,
        bundle_get: form.bundle_get || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };

      await API.post("/promo", cleanForm);

      setForm({
        code: "",
        type: "percentage",
        discount_value: "",
        min_order: "",
        usage_limit: "",
        start_date: "",
        end_date: "",
        bundle_buy: "",
        bundle_get: "",
        buy_qty: 1,
        get_qty: 1,
      });

      fetchPromos();

    } catch (err) {
      console.log("ADD ERROR:", err);
      alert("Error adding promo");
    }
  };

  // ❌ Delete Promo
  const deletePromo = async (id) => {
    if (!window.confirm("Delete promo?")) return;

    try {
      await API.delete(`/promo/${id}`);
      fetchPromos();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Promo Codes
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              discount_value: "",
              bundle_buy: "",
              bundle_get: "",
            })
          }
          className="border p-2 rounded w-full"
        >
          <option value="percentage">Percentage %</option>
          <option value="fixed">Fixed Amount</option>
          <option value="bogo">Buy 1 Get 1</option>
          <option value="bundle">Bundle</option>
        </select>

        {form.type === "percentage" && (
          <input
            placeholder="Discount %"
            value={form.discount_value}
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        )}

        {form.type === "fixed" && (
          <input
            placeholder="Discount Amount"
            value={form.discount_value}
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        )}

        {(form.type === "bogo" || form.type === "bundle") && (
          <>
            <input
              placeholder="Buy Size"
              value={form.bundle_buy}
              onChange={(e) =>
                setForm({ ...form, bundle_buy: e.target.value })
              }
              className="border p-2 rounded w-full"
            />

            <input
              placeholder="Get Size"
              value={form.bundle_get}
              onChange={(e) =>
                setForm({ ...form, bundle_get: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
             <input
            placeholder="Buy Qty"
            type="number"
            value={form.buy_qty}
            onChange={(e) =>
              setForm({ ...form, buy_qty: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          
          <input
            placeholder="Get Qty"
            type="number"
            value={form.get_qty}
            onChange={(e) =>
              setForm({ ...form, get_qty: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          </>
        )}

        <input
          placeholder="Min Order"
          value={form.min_order}
          onChange={(e) => setForm({ ...form, min_order: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Usage Limit"
          value={form.usage_limit}
          onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="datetime-local"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="datetime-local"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          className="border p-2 rounded w-full"
        />
       
        <button className="col-span-1 md:col-span-2 bg-black text-white py-2 rounded">
          Add Promo
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-[800px] w-full text-left">
          <thead className="bg-gray-100 text-sm md:text-base">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Type</th>
              <th className="p-3">Value</th>
              <th className="p-3">Buy</th>
              <th className="p-3">Get</th>
              <th className="p-3">Buy Qty</th>
              <th className="p-3">Get Qty</th>
              <th className="p-3">Used</th>
              <th className="p-3">Limit</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base">
            {promos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-semibold">{p.code}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">{p.discount_value || "-"}</td>
                <td className="p-3">{p.bundle_buy || "-"}</td>
                <td className="p-3">{p.bundle_get || "-"}</td>
                <td className="p-3">{p.buy_qty || 1}</td>
                <td className="p-3">{p.get_qty || 1}</td>
                <td className="p-3">{p.used_count}</td>
                <td className="p-3">{p.usage_limit}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs md:text-sm ${
                      p.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deletePromo(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PromoPage;
