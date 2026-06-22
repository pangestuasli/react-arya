import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import PageHeader from "../../components/PageHeader";

const tierClass = {
    platinum: "bg-gray-200 text-gray-800",
    gold: "bg-yellow-100 text-yellow-700",
    silver: "bg-gray-100 text-gray-600",
    bronze: "bg-orange-100 text-orange-700",
};

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        email: "", full_name: "", role: "member", points: 0, tier: "bronze"
    });

    const fetchCustomers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .in('role', ['member', 'guest'])
            .order('created_at', { ascending: false });
        if (!error && data) setCustomers(data);
        setLoading(false);
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleAdd = () => {
        setEditingCustomer(null);
        setForm({ email: "", full_name: "", role: "member", points: 0, tier: "bronze" });
        setShowForm(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setForm({
            email: customer.email,
            full_name: customer.full_name || "",
            role: customer.role,
            points: customer.points || 0,
            tier: customer.tier || "bronze",
        });
        setShowForm(true);
    };

    const handleSubmit = async () => {
        if (editingCustomer) {
            // Update existing customer
            await supabase
                .from('profiles')
                .update({
                    full_name: form.full_name,
                    role: form.role,
                    points: Number(form.points),
                    tier: form.tier,
                })
                .eq('id', editingCustomer.id);
        } else {
            // For new customers, we just insert a profile row (auth user must already exist)
            // In practice, admin might invite users - for now we add a placeholder
            await supabase.from('profiles').insert([{
                email: form.email,
                full_name: form.full_name,
                role: form.role,
                points: Number(form.points),
                tier: form.tier,
            }]);
        }
        setShowForm(false);
        fetchCustomers();
    };

    return (
        <div>
            <PageHeader title="Customers" breadcrumb={["Home", "Customers"]}>
                <button id="add-button" onClick={handleAdd}>
                    + Add Customer
                </button>
            </PageHeader>

            {/* Tabel */}
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "16px", overflow: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {loading ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading customers...</div>
                ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "0.78rem", textTransform: "uppercase" }}>
                        <tr>
                            {["Email", "Name", "Role", "Points", "Tier", "Action"].map((h) => (
                                <th key={h} style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "14px 20px", fontWeight: 600 }}>{c.email}</td>
                                <td style={{ padding: "14px 20px" }}>{c.full_name || '-'}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span style={{
                                        fontSize: "0.75rem", fontWeight: 600, padding: "2px 8px", borderRadius: "9999px",
                                        background: c.role === 'admin' ? '#dbeafe' : '#dcfce7',
                                        color: c.role === 'admin' ? '#1e40af' : '#166534',
                                        textTransform: 'capitalize'
                                    }}>
                                        {c.role}
                                    </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>{c.points}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tierClass[c.tier] || tierClass.bronze}`} style={{ textTransform: 'capitalize' }}>
                                        {c.tier}
                                    </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>
                                    <button
                                        onClick={() => handleEdit(c)}
                                        style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: "0.8rem" }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>

            {/* Modal Form */}
            {showForm && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
                    <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
                        <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "16px" }}>
                            {editingCustomer ? "Edit Customer" : "Add Customer"}
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <input
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                disabled={!!editingCustomer}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            />
                            <input
                                placeholder="Full Name"
                                value={form.full_name}
                                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            />
                            <input
                                placeholder="Points"
                                type="number"
                                value={form.points}
                                onChange={(e) => setForm({ ...form, points: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            />
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            >
                                <option value="member">member</option>
                                <option value="guest">guest</option>
                                <option value="admin">admin</option>
                            </select>
                            <select
                                value={form.tier}
                                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            >
                                <option value="bronze">Bronze</option>
                                <option value="silver">Silver</option>
                                <option value="gold">Gold</option>
                                <option value="platinum">Platinum</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                            <button onClick={() => setShowForm(false)} style={{ padding: "10px 18px", borderRadius: "12px", border: "1px solid #e5e7eb", cursor: "pointer" }}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} id="add-button" style={{ padding: "10px 18px" }}>
                                {editingCustomer ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
