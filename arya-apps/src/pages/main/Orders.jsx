import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { calculateDiscount, calculatePointsEarned, calculateTier } from "../../lib/tierUtils";
import PageHeader from "../../components/PageHeader";

const statusClass = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
    const { profile, user, refreshProfile } = useAuth();
    const isAdmin = profile?.role === 'admin';
    const [orders, setOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        total_amount: "", status: "pending"
    });

    const fetchOrders = async () => {
        setLoading(true);
        let query = supabase
            .from('orders')
            .select('*, profiles(full_name, email)')
            .order('created_at', { ascending: false });

        // Non-admin users can only see their own orders
        if (!isAdmin) {
            query = query.eq('customer_id', user?.id);
        }

        const { data, error } = await query;
        if (!error && data) setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        if (user) fetchOrders();
    }, [user]);

    const handleSubmit = async () => {
        const totalAmount = Number(form.total_amount);
        const discountPercent = calculateDiscount(profile.tier);
        const discountApplied = discountPercent;
        const finalAmount = totalAmount - (totalAmount * discountPercent / 100);

        const { error } = await supabase.from('orders').insert([{
            customer_id: user.id,
            total_amount: totalAmount,
            discount_applied: discountApplied,
            final_amount: finalAmount,
            status: 'pending',
        }]);

        if (!error) {
            setShowForm(false);
            setForm({ total_amount: "", status: "pending" });
            fetchOrders();
        }
    };

    const handleStatusChange = async (order, newStatus) => {
        // Jangan proses kalau status sudah sama
        if (order.status === newStatus) return;

        // Update order status
        const { error: statusError } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', order.id);

        if (statusError) {
            console.error('Gagal update status order:', statusError.message);
            alert('Gagal update status: ' + statusError.message);
            fetchOrders();
            return;
        }

        // Jika completed, kasih poin dan update tier
        if (newStatus === 'completed' && order.customer_id) {
            // Ambil profile member (pakai maybeSingle supaya tidak error kalau 0 baris)
            const { data: memberProfile, error: profileError } = await supabase
                .from('profiles')
                .select('points')
                .eq('id', order.customer_id)
                .maybeSingle();

            if (profileError) {
                console.error('Gagal ambil profile member:', profileError.message);
            } else if (!memberProfile) {
                console.warn('Profile member tidak ditemukan untuk customer_id:', order.customer_id);
            } else {
                const pointsEarned = calculatePointsEarned(Number(order.final_amount));
                const newPoints = (memberProfile.points || 0) + pointsEarned;
                const newTier = calculateTier(newPoints);

                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ points: newPoints, tier: newTier })
                    .eq('id', order.customer_id);

                if (updateError) {
                    console.error('Gagal update poin/tier:', updateError.message);
                    alert('Order completed tapi gagal update poin: ' + updateError.message);
                } else {
                    console.log(`✓ Poin +${pointsEarned} | Total: ${newPoints} | Tier: ${newTier}`);
                    // Refresh sidebar kalau order milik user yang sedang login
                    if (order.customer_id === user?.id) {
                        refreshProfile();
                    }
                }
            }
        }

        fetchOrders();
    };

    return (
        <div>
            <PageHeader title="Orders" breadcrumb={["Home", "Orders"]}>
                <button id="add-button" onClick={() => setShowForm(true)}>
                    + Add Orders
                </button>
            </PageHeader>

            {/* Discount Info for Members */}
            {!isAdmin && profile && (
                <div style={{ marginTop: "12px", padding: "10px 16px", background: "#ecfdf5", borderRadius: "12px", fontSize: "0.85rem", color: "#065f46" }}>
                    Your tier: <strong style={{ textTransform: 'capitalize' }}>{profile.tier}</strong> — You get <strong>{calculateDiscount(profile.tier)}% discount</strong> on every order!
                </div>
            )}

            {/* Tabel */}
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "16px", overflow: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {loading ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading orders...</div>
                ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "0.78rem", textTransform: "uppercase" }}>
                        <tr>
                            {["Order ID", "Customer", "Status", "Total", "Discount", "Final Amount", "Date", ...(isAdmin ? ["Action"] : [])].map((h) => (
                                <th key={h} style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "14px 20px", fontWeight: 600 }}>{order.id.slice(0, 8)}...</td>
                                <td style={{ padding: "14px 20px" }}>{order.profiles?.full_name || order.profiles?.email || '-'}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass[order.status] || ''}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>Rp {Number(order.total_amount).toLocaleString("id-ID")}</td>
                                <td style={{ padding: "14px 20px" }}>{Number(order.discount_applied)}%</td>
                                <td style={{ padding: "14px 20px", fontWeight: 600 }}>Rp {Number(order.final_amount).toLocaleString("id-ID")}</td>
                                <td style={{ padding: "14px 20px" }}>{new Date(order.created_at).toLocaleDateString()}</td>
                                {isAdmin && (
                                    <td style={{ padding: "14px 20px" }}>
                                        {order.status === 'pending' && (
                                            <div style={{ display: "flex", gap: "6px" }}>
                                                <button
                                                    onClick={() => handleStatusChange(order, 'completed')}
                                                    style={{ padding: "4px 10px", borderRadius: "8px", border: "1px solid #86efac", background: "#dcfce7", cursor: "pointer", fontSize: "0.75rem", color: "#166534" }}
                                                >
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(order, 'cancelled')}
                                                    style={{ padding: "4px 10px", borderRadius: "8px", border: "1px solid #fca5a5", background: "#fee2e2", cursor: "pointer", fontSize: "0.75rem", color: "#dc2626" }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                )}
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
                        <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "16px" }}>Add Order</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <input
                                placeholder="Total Amount"
                                type="number"
                                value={form.total_amount}
                                onChange={(e) => setForm({ ...form, total_amount: e.target.value })}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", fontSize: "0.9rem", outline: "none" }}
                            />
                            {form.total_amount && (
                                <div style={{ padding: "10px 14px", background: "#ecfdf5", borderRadius: "12px", fontSize: "0.85rem", color: "#065f46" }}>
                                    Tier discount: <strong>{calculateDiscount(profile?.tier || 'bronze')}%</strong><br />
                                    Final amount: <strong>Rp {(Number(form.total_amount) * (1 - calculateDiscount(profile?.tier || 'bronze') / 100)).toLocaleString("id-ID")}</strong>
                                </div>
                            )}
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
