import { useEffect, useState } from "react";

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
  });

  // 🔄 Fetch
  const fetchPromos = async () => {
    const res = await fetch("https://ashbackend-production.up.railway.app/api/promo");
    const data = await res.json();
    setPromos(data);
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // ➕ Add Promo
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 🔥 تنظيف البيانات قبل الإرسال
      const cleanForm = {
        ...form,
        discount_value: parseFloat(form.discount_value) || 0,
        min_order: parseFloat(form.min_order) || 0,
        usage_limit: parseInt(form.usage_limit) || 0,
        bundle_buy: form.bundle_buy || null,
        bundle_get: form.bundle_get || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };
  
      const res = await fetch("https://ashbackend-production.up.railway.app/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanForm),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Error adding promo");
        return;
      }
  
      // reset form
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
      });
  
      fetchPromos();
  
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // ❌ Delete
  const deletePromo = async (id) => {
    try {
      await fetch(`https://ashbackend-production.up.railway.app/api/promo/${id}`, {
        method: "DELETE",
      });

      fetchPromos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Promo Codes</h1>

      {/* 🔥 FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-2 gap-4"
      >
        {/* CODE */}
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border p-2 rounded"
        />

        {/* TYPE */}
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
          className="border p-2 rounded"
        >
          <option value="percentage">Percentage %</option>
          <option value="fixed">Fixed Amount</option>
          <option value="bogo">Buy 1 Get 1</option>
          <option value="bundle">Bundle</option>
        </select>

        {/* 🔥 DYNAMIC FIELDS */}

        {form.type === "percentage" && (
          <input
            placeholder="Discount %"
            value={form.discount_value}
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
            className="border p-2 rounded"
          />
        )}

        {form.type === "fixed" && (
          <input
            placeholder="Discount Amount"
            value={form.discount_value}
            onChange={(e) =>
              setForm({ ...form, discount_value: e.target.value })
            }
            className="border p-2 rounded"
          />
        )}

        {(form.type === "bogo" || form.type === "bundle") && (
          <>
            <input
              placeholder="Buy Size (e.g 250ml)"
              value={form.bundle_buy}
              onChange={(e) =>
                setForm({ ...form, bundle_buy: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Get Size (e.g 70ml)"
              value={form.bundle_get}
              onChange={(e) =>
                setForm({ ...form, bundle_get: e.target.value })
              }
              className="border p-2 rounded"
            />
          </>
        )}

        {/* COMMON */}
        <input
          placeholder="Min Order"
          value={form.min_order}
          onChange={(e) => setForm({ ...form, min_order: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Usage Limit"
          value={form.usage_limit}
          onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-black text-white py-2 rounded hover:opacity-90"
        >
          Add Promo
        </button>
      </form>

      {/* 📊 TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Type</th>
              <th className="p-3">Value</th>
              <th className="p-3">Buy</th>
              <th className="p-3">Get</th>
              <th className="p-3">Used</th>
              <th className="p-3">Limit</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {promos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-semibold">{p.code}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">{p.discount_value || "-"}</td>
                <td className="p-3">{p.bundle_buy || "-"}</td>
                <td className="p-3">{p.bundle_get || "-"}</td>
                <td className="p-3">{p.used_count}</td>
                <td className="p-3">{p.usage_limit}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
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
                    className="bg-red-500 text-white px-3 py-1 rounded"
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