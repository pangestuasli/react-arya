import DashboardCard from "../components/DashboardCard";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
    const data = [
        { icon: <FaShoppingCart />, value: "75", label: "Total Orders" },
        { icon: <FaTruck />, value: "175", label: "Total Delivered" },
        { icon: <FaBan />, value: "40", label: "Total Canceled" },
        { icon: <FaDollarSign />, value: "Rp.128", label: "Total Revenue" },
    ];
    return (
        
        <div id="dashboard-container">
            <div id="dashboard-grid">
                <div id="dashboard-orders">
                    <div id="orders-icon">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info">
                        <span id="orders-count">75</span>
                        <span id="orders-text">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered">
                    <div id="delivered-icon">
                        <FaTruck />
                    </div>
                    <div id="delivered-info">
                        <span id="delivered-count">175</span>
                        <span id="delivered-text">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled">
                    <div id="canceled-icon">
                        <FaBan />
                    </div>
                    <div id="canceled-info">
                        <span id="canceled-count">40</span>
                        <span id="canceled-text">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue">
                    <div id="revenue-icon">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info">
                        <span id="revenue-amount">Rp.128</span>
                        <span id="revenue-text">Total Revenue</span>
                    </div>
                </div>

                <div id="dashboard-customers">
    <div id="customers-icon">
        <FaShoppingCart /> {/* sementara pakai ini dulu */}
    </div>
    <div id="customers-info">
        <span id="customers-count">320</span>
        <span id="customers-text">Total Customers</span>
    </div>
</div>

<div id="dashboard-products">
    <div id="products-icon">
        <FaTruck /> {/* bisa ganti icon nanti */}
    </div>
    <div id="products-info">
        <span id="products-count">58</span>
        <span id="products-text">Total Products</span>
    </div>
</div>
            </div>
        </div>
    );
}
