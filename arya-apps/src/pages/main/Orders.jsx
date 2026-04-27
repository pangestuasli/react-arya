import { useState } from "react";
import ordersData from "../../data/orders.json";
import PageHeader from "../../components/PageHeader";

const statusClass = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
    const [orders, setOrders] = useState(ordersData);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        orderId: "", customerName: "", status: "Pending", totalPrice: "", orderDate: ""
    });

    const handleSubmit = () => {
        setOrders([...orders, form]);
        setShowForm(false);
        setForm({ orderId: "", customerName: "", status: "Pending", totalPrice: "", orderDate: "" });
    };

    return (
        <div>
            <PageHeader title="Orders" breadcrumb={["Home", "Orders"]}>
                <button id="add-button" onClick={() => setShowForm(true)}>
                    + Add Orders
                </button>
            </PageHeader>

            {/* Tabel */}
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "16px", overflow: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "0.78rem", textTransform: "uppercase" }}>
                        <tr>
                            {["Order ID", "Customer Name", "Status", "Total Price", "Order Date"].map((h) => (
                                <th key={h} style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "14px 20px", fontWeight: 600 }}>{order.orderId}</td>
                                <td style={{ padding: "14px 20px" }}>{order.customerName}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>Rp {Number(order.totalPrice).toLocaleString("id-ID")}</td>
                                <td style={{ padding: "14px 20px" }}>{order.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
                    <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
                        <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "16px" }}>Add Order</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { key: "orderId", label: "Order ID" },
                                { key: "customerName", label: "Customer Name" },
                                { key: "totalPrice", label: "Total Price" },
                                { key: "orderDate", label: "Order Date (YYYY-MM-DD)" },
                            ].map(({ key, label }) => (
                                <input
                                    key={key}
                                    placeholder={label}
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                                />
                            ))}
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            >
                                <option>Pending</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                            <button onClick={() => setShowForm(false)} style={{ padding: "10px 18px", borderRadius: "12px", border: "1px solid #e5e7eb", cursor: "pointer" }}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} id="add-button" style={{ padding: "10px 18px" }}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}