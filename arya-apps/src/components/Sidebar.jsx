import { FaThLarge, FaList, FaHeadphonesAlt, FaBox ,FaChartBar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const menuClass = ({ isActive }) => {
        return `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
            isActive 
                ? "text-hijau bg-green-200 font-extrabold" 
                : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;
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

                    <li>
                        <NavLink id="menu-3" to="/customers" className={menuClass}>
                            <FaHeadphonesAlt />
                            <span>Customers</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink id="menu-4" to="/reports" className={menuClass}>
                            <FaChartBar />
                            <span>Reports</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink id="menu-produk" to="/products" className={menuClass}>
                            <FaBox /> {/* Pastikan FaBox sudah di-import di atas */}
                            <span>Products</span>
                        </NavLink>
                    </li>

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
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer">
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