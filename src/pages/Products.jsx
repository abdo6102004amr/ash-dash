import { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    cover: null,
    gallery: [],

   sizes: [
  { size: "10 ml", price: "", soldOut: false },
  { size: "75 ml", price: "", soldOut: false },
  { size: "250 ml", price: "", soldOut: false },
  ],
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    
    data.append("description", form.description);

    
    
    data.append(
      "sizes",
      JSON.stringify(
        form.sizes.map((s) => ({
          size: s.size,
          price: Number(s.price) || 0,
          soldOut: s.soldOut,
        }))
      )
    );
    
    if (form.cover) data.append("cover", form.cover);
    form.gallery.forEach((img) => data.append("gallery", img));

    if (editing) {
      await API.put(`/products/${editing.id}`, data);
    } else {
      await API.post("/products", data);
    }

    setEditing(null);

    setForm({
      name: "",
      description: "",
      cover: null,
      gallery: [],
      sizes: [
  { size: "10 ml", price: "", soldOut: false },
  { size: "75 ml", price: "", soldOut: false },
  { size: "250 ml", price: "", soldOut: false },
  ],
    });

    fetchProducts();
  };

  // 🟡 EDIT
  const openEdit = (p) => {
    setEditing(p);

    let sizes = [];
    try {
      sizes =
        typeof p.sizes === "string"
          ? JSON.parse(p.sizes)
          : p.sizes || [];
    } catch {}

    setForm({
      name: p.name,
      description: p.description || "",
      cover: null,
      gallery: [],
     
      sizes: 
     sizes.length
  ? sizes
  : [
      { size: "10 ml", price: "", soldOut: false },
      { size: "75 ml", price: "", soldOut: false },
      { size: "250 ml", price: "", soldOut: false },
    ],
    });
  };

  // 🔴 DELETE
  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    setEditing(null);
    fetchProducts();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 space-y-3">

        <input
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input type="file" onChange={(e) =>
          setForm({ ...form, cover: e.target.files[0] })
        } />

        <input multiple type="file" onChange={(e) =>
          setForm({ ...form, gallery: [...e.target.files] })
        } />

        
         
          

        

        {/* 🔥 SIZES */}
        {form.sizes.map((s, i) => (
          <div key={i} className="flex gap-3 items-center">

            <span className="w-16">{s.size}</span>

            <input
              type="number"
              placeholder="Price"
              value={s.price}
              className="border p-1 w-24"
              onChange={(e) => {
                const updated = [...form.sizes];
                updated[i].price = e.target.value;
                setForm({ ...form, sizes: updated });
              }}
            />

            <button
              type="button"
              className={`px-3 py-1 rounded ${
                s.soldOut ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
              onClick={() => {
                const updated = [...form.sizes];
                updated[i].soldOut = !updated[i].soldOut;
                setForm({ ...form, sizes: updated });
              }}
            >
              {s.soldOut ? "Sold Out" : "Available"}
            </button>

          </div>
        ))}
        
        <button className="bg-pink-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>

      {/* 📦 PRODUCTS */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
            onClick={() => openEdit(p)}
          >
            <img
              src={p.coverImage}
              alt={p.name}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="mt-2 font-bold">{p.name}</h2>
          </div>
        ))}
      </div>

      {/* 🔥 POPUP */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[600px] relative">

            <button
              onClick={() => setEditing(null)}
              className="absolute top-2 right-2"
            >
              ✖
            </button>

            <img
              src={editing.coverImage}
              alt={editing.name}
              className="w-full h-40 object-cover"
            />

            {/* gallery */}
            <div className="flex gap-2 mt-2">
              {(() => {
                let images = [];
                try {
                  images =
                    typeof editing.gallery === "string"
                      ? JSON.parse(editing.gallery)
                      : [];
                } catch {}

                return images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`gallery-${i}`}
                    className="w-16 h-16"
                  />
                ));
              })()}
            </div>

            <input
              value={form.name}
              className="border w-full mt-3 p-2"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <textarea
              value={form.description}
              className="border w-full mt-2 p-2"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {/* sizes */}
            {form.sizes.map((s, i) => (
              <div key={i} className="flex gap-3 mt-2">

                <span>{s.size}</span>

                <input
                  type="number"
                  value={s.price}
                  onChange={(e) => {
                    const updated = [...form.sizes];
                    updated[i].price = e.target.value;
                    setForm({ ...form, sizes: updated });
                  }}
                />

                <button
                  onClick={() => {
                    const updated = [...form.sizes];
                    updated[i].soldOut = !updated[i].soldOut;
                    setForm({ ...form, sizes: updated });
                  }}
                >
                  {s.soldOut ? "Sold Out" : "Available"}
                </button>

              </div>
            ))}

            <div className="flex gap-3 mt-4">

              <button
                onClick={handleSubmit}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => deleteProduct(editing.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
