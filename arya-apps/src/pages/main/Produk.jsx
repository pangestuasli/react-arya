import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function Produk() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", stock: "", image_url: ""
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "", image_url: "" });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      image_url: form.image_url,
    };

    if (editingProduct) {
      await supabase.from('products').update(payload).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([payload]);
    }
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div>
      <PageHeader title="Products" breadcrumb={["Home", "Products"]}>
        {isAdmin && (
          <button id="add-button" onClick={handleAdd}>
            + Add Product
          </button>
        )}
      </PageHeader>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Produk</h1>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading products...</div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-semibold text-gray-600">Nama Produk</th>
                <th className="p-4 font-semibold text-gray-600">Kategori</th>
                <th className="p-4 font-semibold text-gray-600">Stock</th>
                <th className="p-4 font-semibold text-gray-600">Harga</th>
                {isAdmin && <th className="p-4 font-semibold text-gray-600">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <Link 
                      to={`/products/${item.id}`} 
                      className="text-emerald-500 font-bold hover:text-emerald-700"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-600">{item.description || '-'}</td>
                  <td className="p-4 text-gray-600">{item.stock}</td>
                  <td className="p-4 font-medium text-gray-800">Rp {Number(item.price).toLocaleString("id-ID")}</td>
                  {isAdmin && (
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #fca5a5", cursor: "pointer", fontSize: "0.8rem", color: "#dc2626" }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && isAdmin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "16px" }}>
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
              />
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
              />
              <input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
              />
              <input
                placeholder="Image URL"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
              <button onClick={() => setShowForm(false)} style={{ padding: "10px 18px", borderRadius: "12px", border: "1px solid #e5e7eb", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleSubmit} id="add-button" style={{ padding: "10px 18px" }}>
                {editingProduct ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
