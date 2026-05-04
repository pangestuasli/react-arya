import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Produk() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=30")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Produk</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">Nama Produk</th>
              <th className="p-4 font-semibold text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-gray-600">Brand</th>
              <th className="p-4 font-semibold text-gray-600">Harga</th>
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
                    {item.title}
                  </Link>
                </td>
                <td className="p-4 text-gray-600">{item.category}</td>
                <td className="p-4 text-gray-600">{item.brand}</td>
                <td className="p-4 font-medium text-gray-800">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}