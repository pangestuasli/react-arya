import { FaThLarge, FaList, FaHeadphonesAlt, FaBox ,FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
    const { profile, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = profile?.role === 'admin';

    const menuClass = ({ isActive }) => {
        return `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
            isActive 
                ? "text-hijau bg-green-200 font-extrabold" 
                : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div id="sidebar">
            {/* Logo */}
            <div id="sidebar-logo">
                <span id="logo-title">
                    Sedap <b id="logo-dot">.</b>
                </span>
                <span id="logo-subtitle">Modern Admin Dashboard</span>
            </div>

            {/* Profile Info */}
            {profile && (
                <div style={{ padding: "12px 20px", borderBottom: "1px solid #e5e7eb", marginBottom: "8px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#374151" }}>
                        {profile.full_name || profile.email}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                        <span style={{
                            fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "9999px",
                            background: profile.tier === 'platinum' ? '#e5e7eb' : profile.tier === 'gold' ? '#fef3c7' : profile.tier === 'silver' ? '#f3f4f6' : '#fed7aa',
                            color: profile.tier === 'platinum' ? '#374151' : profile.tier === 'gold' ? '#92400e' : profile.tier === 'silver' ? '#6b7280' : '#9a3412',
                            textTransform: 'capitalize'
                        }}>
                            {profile.tier}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                            {profile.points} pts
                        </span>
                        <span style={{
                            fontSize: "0.65rem", fontWeight: 600, padding: "2px 6px", borderRadius: "9999px",
                            background: isAdmin ? '#dbeafe' : '#dcfce7',
                            color: isAdmin ? '#1e40af' : '#166534',
                        }}>
                            {profile.role}
                        </span>
                    </div>
                </div>
            )}

            {/* List Menu */}
            <div id="sidebar-menu">
                <ul id="menu-list">
                    <li>
                        <NavLink id="menu-1" to="/" className={menuClass}>
                            <FaThLarge />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink id="menu-2" to="/orders" className={menuClass}>
                            <FaList />
                            <span>Orders</span>
                        </NavLink>
                    </li>

                    {isAdmin && (
                        <li>
                            <NavLink id="menu-3" to="/customers" className={menuClass}>
                                <FaHeadphonesAlt />
                                <span>Customers</span>
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink id="menu-4" to="/reports" className={menuClass}>
                            <FaChartBar />
                            <span>Reports</span>
                        </NavLink>
                    </li>

                    {isAdmin && (
                        <li>
                            <NavLink id="menu-produk" to="/products" className={menuClass}>
                                <FaBox /> 
                                <span>Products</span>
                            </NavLink>
                        </li>
                    )}

                    {isAdmin && (
                        <li>
                            <NavLink id="menu-fitur-xyz" to="/fitur-xyz" className={menuClass}>
                                <FaBox />
                                <span>Fitur XYZ</span>
                            </NavLink>
                        </li>
                    )}

                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/error-400" className={menuClass}>
                                    <FaExclamationTriangle className="mr-4 text-xl" />
                                    Error 400
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/error-401" className={menuClass}>
                                    <FaExclamationTriangle className="mr-4 text-xl" />
                                    Error 401
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/error-403" className={menuClass}>
                                    <FaExclamationTriangle className="mr-4 text-xl" />
                                    Error 403
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/components" className={menuClass}>
                                    Components
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink id="menu-Note" to="/Note" className={menuClass}>
                            Notes
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer">
                {/* Logout Button */}
                <div style={{ padding: "0 20px", marginBottom: "12px" }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            width: "100%", padding: "10px 16px", borderRadius: "12px",
                            border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer",
                            fontSize: "0.85rem", color: "#ef4444", fontWeight: 600,
                        }}
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>

                <div id="footer-card">
                    <div id="footer-text">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button">
                            <span>Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" src="/img/alucard.png" alt="Footer avatar" />
                </div>
                <span id="footer-brand">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
