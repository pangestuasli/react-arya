import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import PageHeader from "../../components/PageHeader";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUsers, FaBox } from "react-icons/fa";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalDelivered: 0,
        totalCanceled: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalProducts: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, deliveredRes, canceledRes, revenueRes, customersRes, productsRes] = await Promise.all([
                    supabase.from('orders').select('*', { count: 'exact', head: true }),
                    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
                    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'cancelled'),
                    supabase.from('orders').select('final_amount').eq('status', 'completed'),
                    supabase.from('profiles').select('*', { count: 'exact', head: true }).in('role', ['member', 'guest']),
                    supabase.from('products').select('*', { count: 'exact', head: true }),
                ]);

                const totalRevenue = (revenueRes.data || []).reduce((sum, o) => sum + Number(o.final_amount || 0), 0);

                setStats({
                    totalOrders: ordersRes.count || 0,
                    totalDelivered: deliveredRes.count || 0,
                    totalCanceled: canceledRes.count || 0,
                    totalRevenue,
                    totalCustomers: customersRes.count || 0,
                    totalProducts: productsRes.count || 0,
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div id="dashboard-container">

            <PageHeader
                title="Dashboard"
                breadcrumb={["Home", "Home Detail", "Home Very Detail"]}
            >
                <button id="add-button">Add Button</button>
            </PageHeader>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading dashboard data...</div>
            ) : (
            <div id="dashboard-grid">
                <div id="dashboard-orders">
                    <div id="orders-icon">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info">
                        <span id="orders-count">{stats.totalOrders}</span>
                        <span id="orders-text">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered">
                    <div id="delivered-icon">
                        <FaTruck />
                    </div>
                    <div id="delivered-info">
                        <span id="delivered-count">{stats.totalDelivered}</span>
                        <span id="delivered-text">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled">
                    <div id="canceled-icon">
                        <FaBan />
                    </div>
                    <div id="canceled-info">
                        <span id="canceled-count">{stats.totalCanceled}</span>
                        <span id="canceled-text">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue">
                    <div id="revenue-icon">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info">
                        <span id="revenue-amount">Rp.{stats.totalRevenue.toLocaleString("id-ID")}</span>
                        <span id="revenue-text">Total Revenue</span>
                    </div>
                </div>

                <div id="dashboard-customers">
                    <div id="customers-icon">
                        <FaUsers />
                    </div>
                    <div id="customers-info">
                        <span id="customers-count">{stats.totalCustomers}</span>
                        <span id="customers-text">Total Customers</span>
                    </div>
                </div>

                <div id="dashboard-products">
                    <div id="products-icon">
                        <FaBox />
                    </div>
                    <div id="products-info">
                        <span id="products-count">{stats.totalProducts}</span>
                        <span id="products-text">Total Products</span>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
