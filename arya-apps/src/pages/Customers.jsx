import { useState } from "react";
import customersData from "../data/customers.json";
import PageHeader from "../components/PageHeader";

const loyaltyClass = {
    Gold: "bg-yellow-100 text-yellow-700",
    Silver: "bg-gray-100 text-gray-600",
    Bronze: "bg-orange-100 text-orange-700",
};

export default function Customers() {
    const [customers, setCustomers] = useState(customersData);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        customerId: "", customerName: "", email: "", phone: "", loyalty: "Bronze"
    });

    const handleSubmit = () => {
        setCustomers([...customers, form]);
        setShowForm(false);
        setForm({ customerId: "", customerName: "", email: "", phone: "", loyalty: "Bronze" });
    };

    return (
        <div>
            <PageHeader title="Customers" breadcrumb={["Home", "Customers"]}>
                <button id="add-button" onClick={() => setShowForm(true)}>
                    + Add Customer
                </button>
            </PageHeader>

            {/* Tabel */}
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "16px", overflow: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "0.78rem", textTransform: "uppercase" }}>
                        <tr>
                            {["Customer ID", "Name", "Email", "Phone", "Loyalty"].map((h) => (
                                <th key={h} style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c, i) => (
                            <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "14px 20px", fontWeight: 600 }}>{c.customerId}</td>
                                <td style={{ padding: "14px 20px" }}>{c.customerName}</td>
                                <td style={{ padding: "14px 20px" }}>{c.email}</td>
                                <td style={{ padding: "14px 20px" }}>{c.phone}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${loyaltyClass[c.loyalty]}`}>
                                        {c.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
                    <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
                        <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "16px" }}>Add Customer</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { key: "customerId", label: "Customer ID" },
                                { key: "customerName", label: "Customer Name" },
                                { key: "email", label: "Email" },
                                { key: "phone", label: "Phone" },
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
                                value={form.loyalty}
                                onChange={(e) => setForm({ ...form, loyalty: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            >
                                <option>Bronze</option>
                                <option>Silver</option>
                                <option>Gold</option>
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